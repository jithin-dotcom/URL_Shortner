

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";
import logger from "./utils/logger";
import requestLogger from "./middleware/request.middleware";
import { errorHandler } from "./middleware/error.middleware";
import AuthRouter from "../src/routes/auth.routes";
// import UrlRouter from "../src/routes/url.routes";
import { apiRouter, redirectRouter } from "./routes/url.routes";




const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true
}));
app.use(express.json());
app.use(requestLogger);
app.use("/api", AuthRouter);
// app.use("/api", UrlRouter);
app.use("/api", apiRouter); 
app.use("/", redirectRouter); 

app.use(errorHandler);
const PORT = process.env.PORT || 5500;
const MONGO_URI = process.env.MONGO_URI || "";


(async () => {
   try {
      await connectDB(MONGO_URI);

       app.listen(PORT, () => {
          logger.info(` Server running on port ${PORT}`);
       });
   } catch (error) {
       logger.error(`Failed to start server: ${error}`);
   }
})();



