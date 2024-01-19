import { z } from "zod";

export const ticketSchema = z.object({
  topic: z.string(),
  type: z.string(),
  description: z.string(),
  severity: z.enum(["LOW", "MEDIUM", "HIGH"]),
  status: z.enum(["NEW", "ASSIGNED", "RESOLVED"]),
});
