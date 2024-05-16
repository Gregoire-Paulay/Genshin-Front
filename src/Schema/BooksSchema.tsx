import { z } from "zod";

export const allBooksSchema = z.array(
  z.object({
    id: z.string(),
    domain: z.string(),
    picture: z.string().url(),
    region: z.object({
      name: z.string(),
      icon: z.string().url(),
      location: z.string(),
    }),
    books: z.array(
      z.object({
        name: z.string(),
        material: z.array(
          z.object({
            name: z.string(),
            icon: z.string().url(),
            quality: z.number(),
          })
        ),
        day: z.string(),
        character: z.array(
          z.object({
            name: z.string(),
            icon: z.string().url(),
            id: z.string(),
          })
        ),
      })
    ),
  })
);

export const allBooksDetailsSchema = z.object({
  id: z.string(),
  domain: z.string(),
  picture: z.string().url(),
  region: z.object({
    name: z.string(),
    icon: z.string().url(),
    location: z.string(),
  }),
  books: z.array(
    z.object({
      name: z.string(),
      material: z.array(
        z.object({
          name: z.string(),
          icon: z.string().url(),
          quality: z.number(),
        })
      ),
      day: z.string(),
      character: z.array(
        z.object({
          name: z.string(),
          icon: z.string().url(),
          id: z.string(),
        })
      ),
    })
  ),
});
