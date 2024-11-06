import { z } from "zod";

//Type
import { CharactersListSchema } from "../Schema/CharactersSchema";
type Character = z.infer<typeof CharactersListSchema>;

import { normalBossListSchema } from "../Schema/NormalBossSchema";
type Boss = z.infer<typeof normalBossListSchema>;

import { allWeaponsSchema } from "../Schema/WeaponsSchema";
type Weapons = z.infer<typeof allWeaponsSchema>;

import { ArtifactsSchema } from "../Schema/artifacts";
type Artifacts = z.infer<typeof ArtifactsSchema>;

// Fonction SORT
export const sortCharacterAlphabetically = (character: Character) => {
  character.sort((a, b) => a.name.localeCompare(b.name));
  // console.log("SORT", character);
};

export const sortBossAlphabetically = (boss: Boss) => {
  boss.sort((a, b) => a.name.localeCompare(b.name));
};

export const sortWeaponsAlphabetically = (weapon: Weapons) => {
  weapon.sort((a, b) => a.name.localeCompare(b.name));
};

export const sortArtifactsAlphabetycally = (artifact: Artifacts) => {
  artifact.sort((a, b) => a.set_name.localeCompare(b.set_name));
};
