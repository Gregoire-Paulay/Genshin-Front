import axios from "axios";
import { useEffect, useState } from "react";
import { ZodError, z } from "zod";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/theme-context";
import HashLoader from "react-spinners/HashLoader";

//Type
import { CharactersListSchema } from "../Schema/CharactersSchema";
type Character = z.infer<typeof CharactersListSchema>;

type Element =
  | "Anémo"
  | "Cryo"
  | "Dendro"
  | "Électro"
  | "Géo"
  | "Hydro"
  | "Pyro";
type Rarity = 4 | 5;

// Fonction
import { sortCharacterAlphabetically } from "../utils/sortFunction";

const Characters = (): JSX.Element => {
  const { theme } = useThemeContext();
  const navigate = useNavigate();

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [charactersData, setCharactersData] = useState<Character | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [elementFilters, setElementFilters] = useState<Element | null>(null);
  const [rarityFilters, setRarityFilters] = useState<Rarity | null>(null);

  const charatersFilters = (character: Character) => {
    let charactersTab = [];
    if (elementFilters && rarityFilters) {
      for (let i = 0; i < character.length; i++) {
        if (
          elementFilters === character[i].element.type &&
          rarityFilters === character[i].star
        ) {
          charactersTab.push(character[i]);
        }
      }
    }

    if (elementFilters && !rarityFilters) {
      for (let i = 0; i < character.length; i++) {
        if (elementFilters === character[i].element.type) {
          charactersTab.push(character[i]);
        }
      }
    }
    if (rarityFilters && !elementFilters) {
      for (let i = 0; i < character.length; i++) {
        if (rarityFilters === character[i].star) {
          charactersTab.push(character[i]);
        }
      }
    }

    // console.log("Fonction SortCharacters", charactersTab);
    return charactersTab;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        // const { data } = await axios.get(
        //   `https://site--genshinapi--m8kkvg9l2hpy.code.run/characters`
        // );
        const { data } = await axios.get(`http://localhost:3000/characters`);
        // console.log(data);

        // On se sert de la fonction pour trier par ordre alphabétique
        sortCharacterAlphabetically(data);

        const allCharactersParsed = CharactersListSchema.parse(data);
        console.log(allCharactersParsed);

        // Tri avec le filtre des éléments
        if (elementFilters || rarityFilters) {
          setIsLoading(true);
          setCharactersData(charatersFilters(allCharactersParsed));
          setIsLoading(false);
          return;
        }

        setCharactersData(allCharactersParsed);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof ZodError) {
          setError(new Error("Erreur de validation Zod"));
        } else {
          setError(new Error("An error occured !!!"));
        }
      }
    };
    fetchData();
  }, [elementFilters, rarityFilters]);
  // console.log("DATA", charactersData);

  if (error)
    return (
      <div className="container">
        <div className="error">Error: {error.message}</div>
      </div>
    );
  if (isLoading)
    return (
      <div className="container">
        <div className="loading">
          <HashLoader size={150} color="#6890f0" />
        </div>
      </div>
    );

  return (
    <div className="container">
      {theme === "night" ? (
        <div className="">
          <h1>Liste des personnages</h1>

          {/* Section Filters */}
          {!showFilters && (
            <div className="showFiltersNight">
              <button
                onClick={() => {
                  setShowFilters(true);
                }}
              >
                Voir Filtres
              </button>
            </div>
          )}

          {showFilters && (
            <div className="allFilters">
              <div className="hideFiltersNight">
                <button
                  onClick={() => {
                    setElementFilters(null);
                    setRarityFilters(null);
                  }}
                >
                  Effacer
                </button>
                <button
                  onClick={() => {
                    setShowFilters(false);
                  }}
                >
                  Masquer
                </button>
              </div>

              <h3>Rareté</h3>
              <div className="filtersNight">
                <div
                  onClick={() => {
                    setRarityFilters(null);
                  }}
                >
                  <p>Tous</p>
                </div>
                <div
                  onClick={() => {
                    setRarityFilters(5);
                  }}
                >
                  5 ✭
                </div>
                <div
                  onClick={() => {
                    setRarityFilters(4);
                  }}
                >
                  4 ⭑
                </div>
              </div>

              <h3>Élément</h3>
              <div className="filtersNight">
                <div
                  onClick={() => {
                    setElementFilters(null);
                  }}
                >
                  <p>Tous</p>
                </div>
                <div
                  onClick={() => {
                    setElementFilters("Anémo");
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/dy2ayuond/image/upload/v1708618455/Genshin/IconAnemo.webp"
                    alt="icon anémo"
                  />
                  <p>Anémo</p>
                </div>
                <div
                  onClick={() => {
                    setElementFilters("Cryo");
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/dy2ayuond/image/upload/v1708618399/Genshin/IconCryo.webp"
                    alt="icon cryo"
                  />
                  <p>Cryo</p>
                </div>
                <div
                  onClick={() => {
                    setElementFilters("Dendro");
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/dy2ayuond/image/upload/v1708618418/Genshin/IconDendro.webp"
                    alt="icon dendro"
                  />
                  <p>Dendro</p>
                </div>
                <div
                  onClick={() => {
                    setElementFilters("Électro");
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/dy2ayuond/image/upload/v1708618437/Genshin/IconElectro.webp"
                    alt="icon électro"
                  />
                  <p>Électro</p>
                </div>
                <div
                  onClick={() => {
                    setElementFilters("Géo");
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/dy2ayuond/image/upload/v1708618493/Genshin/IconGeo.webp"
                    alt="icon géo"
                  />
                  <p>Géo</p>
                </div>
                <div
                  onClick={() => {
                    setElementFilters("Hydro");
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/dy2ayuond/image/upload/v1708618474/Genshin/IconHydro.webp"
                    alt="icon hydro"
                  />
                  <p>Hydro</p>
                </div>
                <div
                  onClick={() => {
                    setElementFilters("Pyro");
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/dy2ayuond/image/upload/v1708618493/Genshin/IconPyro.webp"
                    alt="icon pyro"
                  />
                  <p>Pyro</p>
                </div>
              </div>
            </div>
          )}

          {/* Section Characters List */}
          <div className="characterListNight">
            {charactersData?.map((character) => {
              return (
                <div
                  key={character.id}
                  onClick={() => {
                    navigate("/Characters/Details/" + character.id);
                  }}
                >
                  <img
                    src={character.icon}
                    alt="Icon Personnages"
                    className={character.star === 4 ? "star4BCG" : "star5BCG"}
                  />
                  <img
                    src={character.element.icon}
                    alt="Élément personnages"
                    className="characterElement"
                  />
                  <p>{character.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="characterListDay">
          {charactersData?.map((character) => {
            return (
              <div
                key={character.id}
                className="characterBigButton"
                onClick={() => {
                  navigate("/Characters/Details/" + character.id);
                }}
              >
                <img
                  src={character.icon}
                  alt="Icon Personnages"
                  className={character.star === 4 ? "star4BCG" : "star5BCG"}
                />
                <img
                  src={character.element.icon}
                  alt="Élément personnages"
                  className="characterElement"
                />
                <p className="characterName">{character.name}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Characters;
