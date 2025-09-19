

import mongoose from "mongoose";
import logger from "../utils/logger";

export const connectDB = async(mongoUri : string) => {
    try {
        await mongoose.connect(mongoUri);
        logger.info("mongoDB connected");
    } catch (error) {
        logger.error("mongodb connection error", error);
        process.exit(1);
    }
}