import { z } from "zod/v3";

export const paginationSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((v) => Number(v) || 1),
  pageSize: z
    .string()
    .optional()
    .transform((v) => Number(v) || 10),
});

export const uuidParamSchema = z.object({
  id: z.string().uuid("ID 格式不正确，应为 UUID"),
});
