import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { logger } from "../utils/logger";

export const ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(`[${req.method}] ${req.url} - ${err.message}`);
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: err.issues,
    });
  }
  if (err instanceof PrismaClientKnownRequestError) {
    return res.status(404).json({ success: false, error: err.message });
  }

  res
    .status(500)
    .json({ success: false, error: err.message || "Something went wrong" });
};
