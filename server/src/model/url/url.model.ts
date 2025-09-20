

import mongoose, { Schema } from "mongoose";
import { IUrl } from "./IUrlModel";

const UrlSchema = new Schema<IUrl>({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    originalUrl: {
        type: String,
        required: true,
    },
    shortCode: {
        type: String,
        required: true,
    },
    visits: {
        type: Number,
        default: 0,
    },
    expiresAt: {
        type: Date,
        default: null,
    }
},
{timestamps: true},
)


export const UrlModel = mongoose.model("Url", UrlSchema);