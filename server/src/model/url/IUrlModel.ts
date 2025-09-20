

import mongoose, { Document } from "mongoose";

export interface IUrl extends Document{
    owner: mongoose.Types.ObjectId;
    originalUrl: string;
    shortCode: string;
    visits: number;
    expiresAt?: Date|null;
    createdAt: Date;
}