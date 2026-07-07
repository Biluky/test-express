import { z } from "zod/v3";

export const passwordStrengthSchema = z
  .string()
  .min(8, "密码至少 8 个字符")
  .max(80, "密码不能超过 80 个字符")
  .regex(/[A-Z]/, "密码必须包含至少一个大写字母")
  .regex(/[a-z]/, "密码必须包含至少一个小写字母")
  .regex(/[0-9]/, "密码必须包含至少一个数字")
  .regex(/[^A-Za-z0-9]/, "密码必须包含至少一个特殊字符");
