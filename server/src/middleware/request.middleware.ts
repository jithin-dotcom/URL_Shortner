

import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const { method, originalUrl, body, query, params } = req;

  logger.info(`HTTP ${method} ${originalUrl} - Params: ${JSON.stringify(params)}, Query: ${JSON.stringify(query)}, Body: ${JSON.stringify(body)}`);
  
  next();
};

export default requestLogger;