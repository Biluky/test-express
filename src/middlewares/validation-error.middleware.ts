import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod/v3";
import { BIZ_CODE } from "../constants/business-code";
import { HTTP_STATUS } from "../constants";

export function validationErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ZodError) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      code: BIZ_CODE.VALIDATION_ERROR,
      message: "Validation failed",
    });
    return;
  }
  next(err);
}
