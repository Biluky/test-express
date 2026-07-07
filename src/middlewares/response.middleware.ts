import type { Request, Response, NextFunction } from "express";
import { success, fail } from "../utils";

declare global {
  namespace Express {
    interface Response {
      success<T>(data: T, message?: string, bizCode?: number, httpCode?: number): void;
      fail(message: string, bizCode?: number, httpCode?: number): void;
    }
  }
}

export function responseMiddleware(_req: Request, res: Response, next: NextFunction) {
  res.success = function <T>(data: T, message?: string, bizCode?: number, httpCode?: number) {
    success(this as unknown as Response, data, message, bizCode, httpCode);
  };
  res.fail = function (message: string, bizCode?: number, httpCode?: number) {
    fail(this as unknown as Response, message, bizCode, httpCode);
  };
  next();
}
