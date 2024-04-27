import { z } from "zod";

export const CharactersListSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    star: z.number(),
    icon: z.string().url(),
    element: z.object({ type: z.string(), icon: z.string().url() }),
  })
);

export const CharacterDetailsSchema = z.object({
  id: z.string(),
  name: z.string(),
  release_date: z.string(),
  star: z.number(),
  title: z.string(),
  other_title: z.array(z.object({ name: z.string() })),
  real_name: z.string().optional(),
  description: z.string(),
  art: z.string().url(),
  icon: z.string().url(),
  wish: z.string().url().optional(),
  archon: z.string().url().optional(),
  element: z.object({ type: z.string(), icon: z.string().url() }),
  weapon: z.object({ type: z.string(), icon: z.string().url() }),
  birthday: z.string(),
  dish: z.object({ name: z.string(), icon: z.string() }).optional(),
  namecard: z.object({ name: z.string(), icon: z.string() }).optional(),
  affiliation: z.array(z.object({ name: z.string() })).optional(),
  region: z.array(
    z.object({ name: z.string(), icon: z.string().url().optional() })
  ),
  ascension_materials: z.object({
    mora: z.object({
      name: z.string(),
      picture: z.string().url(),
      number: z.number(),
      id: z.string(),
    }),
    stone: z.array(
      z.object({
        name: z.string(),
        picture: z.string().url(),
        number: z.number(),
        id: z.string(),
      })
    ),
    bossLoot: z
      .object({
        name: z.string(),
        picture: z.string().url(),
        number: z.number(),
        id: z.string(),
      })
      .optional(),
    material: z.object({
      name: z.string(),
      picture: z.string().url(),
      number: z.number(),
      id: z.string(),
    }),
    mobLoot: z.array(
      z.object({
        name: z.string(),
        picture: z.string().url(),
        number: z.number(),
        id: z.string(),
      })
    ),
  }),
  talents: z.array(
    z.object({
      name: z.string(),
      icon: z.string().url(),
      type: z.string(),
      description: z.array(
        z.object({
          name: z.string().optional(),
          text: z.string().optional(),
          effect: z.array(z.object({ text: z.string() })).optional(),
        })
      ),
      note: z.string().optional(),
    })
  ),
  talent_upgrade: z
    .object({
      mora: z.object({
        name: z.string(),
        picture: z.string().url(),
        number: z.number(),
        id: z.string(),
      }),
      mobLoot: z.array(
        z.object({
          name: z.string(),
          picture: z.string().url(),
          number: z.number(),
          id: z.string(),
        })
      ),
      books: z.array(
        z.object({
          name: z.string(),
          picture: z.string().url(),
          number: z.number(),
          id: z.string(),
        })
      ),
      bossLoot: z.object({
        name: z.string(),
        picture: z.string().url(),
        number: z.number(),
        id: z.string(),
      }),
      crown: z.object({
        name: z.string(),
        picture: z.string().url(),
        number: z.number(),
        id: z.string(),
      }),
    })
    .or(
      z.object({
        normal_attack: z.object({
          mora: z.object({
            name: z.string(),
            picture: z.string().url(),
            number: z.number(),
            id: z.string(),
          }),
          mobLoot: z.array(
            z.object({
              name: z.string(),
              picture: z.string().url(),
              number: z.number(),
              id: z.string(),
            })
          ),
          books: z.array(
            z.object({
              name: z.string(),
              picture: z.string().url(),
              number: z.number(),
              id: z.string(),
            })
          ),
          bossLoot: z.object({
            name: z.string(),
            picture: z.string().url(),
            number: z.number(),
            id: z.string(),
          }),
          crown: z.object({
            name: z.string(),
            picture: z.string().url(),
            number: z.number(),
            id: z.string(),
          }),
        }),
        elemental_burst_skill: z.object({
          mora: z.object({
            name: z.string(),
            picture: z.string().url(),
            number: z.number(),
            id: z.string(),
          }),
          mobLoot: z.array(
            z.object({
              name: z.string(),
              picture: z.string().url(),
              number: z.number(),
              id: z.string(),
            })
          ),
          books: z.array(
            z.object({
              name: z.string(),
              picture: z.string().url(),
              number: z.number(),
              id: z.string(),
            })
          ),
          bossLoot: z.object({
            name: z.string(),
            picture: z.string().url(),
            number: z.number(),
            id: z.string(),
          }),
          crown: z.object({
            name: z.string(),
            picture: z.string().url(),
            number: z.number(),
            id: z.string(),
          }),
        }),
      })
    ),
  constellation: z.object({
    name: z.string(),
    icon: z.string().url(),
    icon2: z.string().url().optional(),
  }),
  constellation_upgrade: z.array(
    z.object({
      name: z.string(),
      level: z.number().or(z.string()),
      description: z.object({
        text: z.string(),
        effect: z.array(z.object({ text: z.string() })).optional(),
        note: z.string().optional(),
      }),
      icon: z.string(),
    })
  ),
});
