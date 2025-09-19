

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { connectDB } from "./config/db";
import logger from "./utils/logger";
import requestLogger from "./middleware/request.middleware";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);


const PORT = process.env.PORT || 6000;
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



