import axios from "axios";
import { useEffect, useState } from "react";
import { ZodError, z } from "zod";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/theme-context";
import HashLoader from "react-spinners/HashLoader";

//Type
import { allBooksSchema } from "../Schema/BooksSchema";
type Books = z.infer<typeof allBooksSchema>;

const BooksList = (): JSX.Element => {
  const { theme } = useThemeContext();
  const navigate = useNavigate();

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [booksData, setBooksData] = useState<Books | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        // const { data } = await axios.get(`http://localhost:3000/books`);
        const { data } = await axios.get(
          `https://site--genshinapi--m8kkvg9l2hpy.code.run/books`
        );
        // console.log("DATA",data);

        const booksDataParsed = allBooksSchema.parse(data);
        // console.log("PARSED", booksDataParsed);

        setBooksData(booksDataParsed);
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
  }, []);

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
      <div className={theme === "night" ? "allBooksNight" : "allBooksDay"}>
        {booksData?.map((material) => {
          return (
            <div key={material.id}>
              <div className="domainDetails">
                <h2>{material.domain}</h2>
                <img src={material.picture} alt="image domaine" />
                <div>
                  <img src={material.region.icon} alt="icon region" />
                  <p>
                    {material.region.name} - {material.region.location}
                  </p>
                </div>
              </div>

              <div className="bookDetails">
                {material.books.map((book) => {
                  return (
                    <div
                      key={book.name}
                      className={
                        theme === "night"
                          ? "booksDetailsBCGNight"
                          : "booksDetailsBCGDay"
                      }
                    >
                      <div className="bookIcon">
                        <p>{book.name}</p>
                        <div>
                          {book.material.map((bookDetails) => {
                            return (
                              <div key={bookDetails.name}>
                                <img src={bookDetails.icon} alt="icon book" />
                              </div>
                            );
                          })}
                        </div>
                        <p className="bookDay">{book.day}</p>
                      </div>

                      <div
                        className={
                          theme === "night"
                            ? "bookCharactersNight"
                            : "bookCharactersDay"
                        }
                      >
                        {book.character.map((character) => {
                          return (
                            <div
                              key={character.id}
                              onClick={() => {
                                navigate("/Characters/Details/" + character.id);
                              }}
                            >
                              <img src={character.icon} alt="icon personnage" />
                              <p>{character.name}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BooksList;
