import { z } from "zod/v3";

export const passwordSchema = z.string().min(6, "密码至少 6 个字符").max(255);

export const emailSchema = z
  .string()
  .email("邮箱格式不正确")
  .optional()
  .or(z.literal(""));

export const phoneSchema = z
  .string()
  .regex(/^\d{11}$/, "手机号必须为 11 位数字")
  .optional()
  .or(z.literal(""));

export const genderSchema = z
  .union([z.literal(0), z.literal(1), z.literal(2)])
  .optional();

export const statusSchema = z.union([z.literal(0), z.literal(1)]).optional();
