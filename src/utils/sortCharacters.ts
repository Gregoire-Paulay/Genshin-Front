import { z } from "zod";

//Type
import { CharactersListSchema } from "../Schema/CharactersSchema";
type Character = z.infer<typeof CharactersListSchema>;

export const sortCharacterAlphabetically = (character: Character) => {
  character.sort((a, b) => a.name.localeCompare(b.name));
  // console.log("SORT", character);
};
