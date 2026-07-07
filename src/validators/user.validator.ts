import { z } from "zod/v3";
import { passwordSchema, emailSchema, phoneSchema, genderSchema, statusSchema } from "./base.validator";

export const createUserSchema = z.object({
  username: z.string().min(1, "用户名不能为空").max(50),
  password: passwordSchema,
  email: emailSchema,
  phone: phoneSchema,
  realName: z.string().max(50, "真实姓名不能超过 50 个字符").optional().or(z.literal("")),
  avatar: z.string().max(500, "头像地址不能超过 500 个字符").optional().or(z.literal("")),
  gender: genderSchema,
  status: statusSchema,
  homePage: z.string().max(255, "主页地址不能超过 255 个字符").optional().or(z.literal("")),
});

export const updateUserSchema = z.object({
  email: emailSchema,
  phone: phoneSchema,
  realName: z.string().max(50, "真实姓名不能超过 50 个字符").optional().or(z.literal("")),
  avatar: z.string().max(500, "头像地址不能超过 500 个字符").optional().or(z.literal("")),
  gender: genderSchema,
  status: statusSchema,
  homePage: z.string().max(255, "主页地址不能超过 255 个字符").optional().or(z.literal("")),
});

export const resetPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "两次输入的密码不一致",
    path: ["confirmPassword"],
  });
