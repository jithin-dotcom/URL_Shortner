
import mongoose,{ Schema } from "mongoose";
import { IUser } from "./IUserModel";


const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    
},
{timestamps: true}
)

export const UserModel = mongoose.model<IUser>("User", UserSchema);