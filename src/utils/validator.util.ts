import type { z } from "zod/v3";

export function formatZodError(error: z.ZodError): string[] {
  return error.issues.map(
    (issue) => `${issue.path.join(".")}: ${issue.message}`
  );
}
