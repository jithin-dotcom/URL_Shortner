


import { IUser } from "../../model/user/IUserModel";
import { IAuthService } from "./IAuthServices";
import { IUserRepository } from "../../repository/user/IUserRepository";
import { saveRefreshToken, validateRefreshToken, deleteRefreshToken } from "../../utils/redisTokenSave";
import { generateAccessToken, generateRefreshToken } from "../../utils/tokens";
import { HttpError } from "../../utils/HttpError";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export class AuthService implements IAuthService {
    constructor( private _userRepo: IUserRepository){};

    async register(name: string, email: string, password: string): Promise<{ user: Partial<IUser>; accessToken: string; refreshToken: string}> {
        try {
            if(!name || !email || !password){
                // throw new Error("Required fields missing");
                throw new HttpError("Email already exists, please use another email", 409);
            }
            const existing = await this._userRepo.findByEmail(email);
            if(existing){
                throw new Error("Email already Exists, Please usee another Email");
            }
 
            const passwordHash = await bcrypt.hash(password, 12);
            const user = await this._userRepo.create({name, email, passwordHash});

            const accessToken = generateAccessToken((user._id as mongoose.Types.ObjectId).toString());
            const refreshToken = generateRefreshToken((user._id as mongoose.Types.ObjectId).toString());

            const refreshExp = parseInt(process.env.JWT_REFRESH_EXPIRES || "7") * 24 * 60 * 60;
            await saveRefreshToken((user._id as mongoose.Types.ObjectId).toString(), refreshToken, refreshExp);

            return {
                user: {id: user._id, name: user.name, email: user.email },
                accessToken,
                refreshToken,
            }

        } catch (error) {
            throw error;
        }
    }

    async login(email: string, password: string): Promise<{ user: Partial<IUser>; accessToken: string; refreshToken: string}> {
        try {
            if(!email || !password){
                // throw new Error("Email or Password missing");
                throw new HttpError("Email or password missing", 400);
            }
            const user = await this._userRepo.findByEmail(email);
            if(!user){
                // throw new Error("Invalid credentials");
                throw new HttpError("Invalid credentials", 401);
            }
            const ok = await bcrypt.compare(password, user.passwordHash);
            if(!ok){
                // throw new Error("Invalid credentials");
                throw new HttpError("Invalid credentials", 401);
            }

            const accessToken = generateAccessToken((user._id as mongoose.Types.ObjectId).toString());
            const refreshToken = generateRefreshToken((user._id as mongoose.Types.ObjectId).toString());

            const refreshExp = parseInt(process.env.JWT_REFRESH_EXPIRES || "7") * 24 * 60 * 60;
            await saveRefreshToken((user._id as mongoose.Types.ObjectId).toString(), refreshToken, refreshExp);
            return {
                user:{id: user._id, name: user.name, email: user.email},
                accessToken,
                refreshToken,
            }

        } catch (error) {
            throw error;
        }   
    }

    async refreshToken(oldRefreshToken: string): Promise<{accessToken: string, refreshToken: string}> {
        try {
      
            const decoded = jwt.verify(
             oldRefreshToken,
             process.env.JWT_REFRESH_SECRET || "refresh_secret"
            ) as { id: string };

            const userId = decoded.id;

            const isValid = await validateRefreshToken(userId, oldRefreshToken);
            if (!isValid) throw new Error("Invalid refresh token");

            const accessToken = generateAccessToken(userId);
            const newRefreshToken = generateRefreshToken(userId);
            const refreshExp = parseInt(process.env.JWT_REFRESH_EXPIRES || "7") * 24 * 60 * 60;
            await saveRefreshToken(userId, newRefreshToken, refreshExp);

            return { accessToken, refreshToken: newRefreshToken };
        } catch (err) {
            throw new HttpError("Invalid or expired refresh token", 403);
        }
    }


    async logout(refreshToken: string): Promise<{message: string}> {
        try {
            const decoded = jwt.verify(
                refreshToken, 
                process.env.JWT_REFRESH_SECRET || "refresh_secret"
            ) as {id: string};
            await deleteRefreshToken(decoded.id);
            return {message: "Logged out"};
        } catch (error) {
            throw new HttpError("Invalid refresh token", 403);
        }
    }

    async me(userId: string): Promise<Partial<IUser> | null> {
        try {
            const user = await this._userRepo.findById(userId);
            if(!user){
                throw new HttpError("User not found", 404);
            }
            return { id: user._id, name: user.name, email: user.email };
        } catch (error) {
            throw error;
            
        } 
    }

}

