

import { IUser } from "../../model/user/IUserModel";


export interface IAuthService{
    register(name: string, email: string, password: string): Promise<{ user: Partial<IUser>; accessToken: string; refreshToken: string}>;
    login(email: string, password: string): Promise<{ user: Partial<IUser>; accessToken: string; refreshToken: string}>;
    me(userId: string): Promise<Partial<IUser> | null>;
    refreshToken(refreshToken: string): Promise<{accessToken: string, refreshToken: string}>;
    logout(refreshToken: string): Promise<{message: string}>;
}