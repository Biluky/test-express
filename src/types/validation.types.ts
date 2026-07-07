import type { z } from "zod/v3";

export interface ValidationSchemas {
  body?: z.ZodType;
  query?: z.ZodType;
  params?: z.ZodType;
}

export interface PaginationQuery {
  page: number;
  pageSize: number;
}
