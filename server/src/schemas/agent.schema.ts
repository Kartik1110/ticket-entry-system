import { z } from "zod";

export const agentSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  description: z.string(),
  active: z.boolean().optional().default(true),
});
