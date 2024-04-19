import axios from "axios";
import { useEffect, useState } from "react";
import { ZodError, z } from "zod";
import HashLoader from "react-spinners/HashLoader";

const Home = (): JSX.Element => {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // if (error)
  //   return (
  //     <div className="container">
  //       <div className="error">Error: {error.message}</div>
  //     </div>
  //   );
  // if (isLoading)
  //   return (
  //     <div className="container">
  //       <div className="loading">
  //         <HashLoader size={150} color="#6890f0" />
  //       </div>
  //     </div>
  //   );

  return (
    <div className="container">
      <p>Page Home</p>
    </div>
  );
};

export default Home;
