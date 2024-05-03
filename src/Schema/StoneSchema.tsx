import { z } from "zod";

export const stoneDetailsSchema = z.object({
  id: z.string(),
  name: z.string(),
  element: z.string().optional(),
  icon: z.string().url().optional(),
  stone: z.array(
    z.object({ name: z.string(), icon: z.string().url(), quality: z.number() })
  ),
  character: z.array(
    z.object({ name: z.string(), icon: z.string().url(), id: z.string() })
  ),
  weeklyBoss: z
    .array(
      z.object({ name: z.string(), icon: z.string().url(), id: z.string() })
    )
    .optional(),
  normalBoss: z
    .array(
      z.object({ name: z.string(), icon: z.string().url(), id: z.string() })
    )
    .optional(),
  obtainment: z.array(z.object({ text: z.string() })),
  description: z.array(z.object({ text: z.string() })),
});
