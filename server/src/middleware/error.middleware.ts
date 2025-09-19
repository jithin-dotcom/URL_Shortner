

import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/HttpError";

export const errorHandler = (
  err: Error | HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[Error] ${err.message}`);

  const statusCode = err instanceof HttpError ? err.statusCode : 500;
  const message = err instanceof HttpError && statusCode !== 500
    ? err.message
    : "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};
