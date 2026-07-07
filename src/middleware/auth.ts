import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { BIZ_CODE } from "../constants/business-code";
import { HTTP_STATUS } from "../constants";
import { fail } from "../utils";
import type { JwtPayload, AuthRequest } from "../types";

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    fail(res, "Missing or invalid token", BIZ_CODE.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
    return;
  }

  try {
    const token = header.slice(7);
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch {
    fail(res, "Invalid or expired token", BIZ_CODE.TOKEN_EXPIRED, HTTP_STATUS.UNAUTHORIZED);
  }
}
