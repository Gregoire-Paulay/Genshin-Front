import { z } from "zod";

export const ArtifactsSchema = z.array(
  z.object({
    id: z.string(),
    star: z.number(),
    set_name: z.string(),
    source: z.array(
      z.object({ name: z.string(), picture: z.string().url().optional() })
    ),
    set_details: z.array(
      z.object({
        name: z.string(),
        icon: z.string().url(),
        main_stats: z.array(z.object({ name: z.string(), number: z.string() })),
        secondary_stats: z.array(
          z.object({ name: z.string(), number: z.string() })
        ),
        description: z.string(),
      })
    ),
    bonus: z.array(
      z.object({
        name: z.string(),
        description: z.string(),
      })
    ),
  })
);
