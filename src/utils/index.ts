import { Response } from "express";
import { BIZ_CODE } from "../constants/business-code";
import { HTTP_STATUS } from "../constants";
import type { ApiResponse } from "../types";

export function success<T>(
  res: Response,
  data: T,
  message = "success",
  bizCode: number = BIZ_CODE.SUCCESS,
  httpCode: number = HTTP_STATUS.OK
) {
  const body: ApiResponse<T> = { code: bizCode, message, data };
  res.status(httpCode).json(body);
}

export function fail(
  res: Response,
  message: string,
  bizCode: number = BIZ_CODE.VALIDATION_ERROR,
  httpCode: number = HTTP_STATUS.BAD_REQUEST
) {
  const body: ApiResponse = { code: bizCode, message };
  res.status(httpCode).json(body);
}
