import { z } from "zod";

export const allWeaponsSchema = z.array(
  z.object({
    id: z.string(),
    star: z.number(),
    name: z.string(),
    icon: z.string().url().optional(),
    icon_ascended: z.string().url().optional(),
    type: z.object({
      name: z.string(),
      icon: z.string().url(),
    }),
    release_date: z.string(),
    obtain: z.string(),
    atk: z.string(),
    stat_secondaire: z
      .object({ type: z.string(), stat: z.string() })
      .optional(),
    description: z.string(),
    effect: z
      .array(
        z.object({
          title: z.string().optional(),
          text: z.string(),
          level: z
            .object({
              r1: z.string(),
              r2: z.string(),
              r3: z.string(),
              r4: z.string(),
              r5: z.string(),
            })
            .optional(),
        })
      )
      .optional(),
    ascension: z.object({
      mora: z.object({
        name: z.string(),
        icon: z.string().url(),
        number: z.string(),
      }),
      mobLoot: z.array(
        z.object({
          name: z.string(),
          picture: z.string().url(),
          number: z.number(),
        })
      ),
      material: z.array(
        z.object({
          name: z.string(),
          picture: z.string().url(),
          number: z.number(),
          id: z.string(),
        })
      ),
    }),
  })
);
