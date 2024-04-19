import { z } from "zod";

export const normalBossListSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    icon: z.string().url(),
  })
);

export const normalBossSchema = z.object({
  id: z.string(),
  name: z.string(),
  name2: z.string().optional(),
  art: z.string().url(),
  icon: z.string().url(),
  uniqueRewards: z
    .object({
      name: z.string(),
      icon: z.string().url(),
      worldLevel: z.number(),
      character: z.array(
        z.object({
          name: z.string(),
          icon: z.string().url(),
          id: z.string(),
        })
      ),
    })
    .or(
      z.array(
        z.object({
          name: z.string(),
          icon: z.string().url(),
          worldLevel: z.number(),
          character: z.array(
            z.object({
              name: z.string(),
              icon: z.string().url(),
              id: z.string(),
            })
          ),
        })
      )
    ),
  rewards: z.array(
    z.object({
      name: z.string(),
      icon: z.string().url(),
      worldLevel: z.number(),
      id: z.string(),
    })
  ),
});
