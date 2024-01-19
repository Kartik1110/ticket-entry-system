import { z } from "zod";

export const ticketSchema = z.object({
  type: z.string(),
  description: z.string(),
  severity: z.string(),
  status: z.string(),
  topic: z.string(),
});
