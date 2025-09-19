

import { IUserRepository } from "./IUserRepository";
import { IUser } from "../../model/user/IUserModel";
import { UserModel } from "../../model/user/user.model";

export class UserRepository implements IUserRepository{
    
    async create(user: Partial<IUser>): Promise<IUser>{
        return await UserModel.create(user);
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await UserModel.findOne({email}).exec();
    }

    async findById(id: string): Promise<IUser | null> {
        return await UserModel.findById(id).exec();
    }
}