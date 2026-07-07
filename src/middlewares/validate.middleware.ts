import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod/v3";
import type { ValidationSchemas } from "../types/validation.types";
import { formatZodError } from "../utils/validator.util";
import { BIZ_CODE } from "../constants/business-code";
import { HTTP_STATUS } from "../constants";
import { fail } from "../utils";

export function validate(schemas: ValidationSchemas) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }
      if (schemas.query) {
        req.query = schemas.query.parse(req.query);
      }
      if (schemas.params) {
        req.params = schemas.params.parse(req.params);
      }
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = formatZodError(err);
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          code: BIZ_CODE.VALIDATION_ERROR,
          message: "Validation failed",
          errors,
        });
        return;
      }
      next(err);
    }
  };
}
