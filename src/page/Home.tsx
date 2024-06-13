import axios from "axios";
import { useEffect, useState } from "react";
import { ZodError, z } from "zod";
import HashLoader from "react-spinners/HashLoader";

const Home = (): JSX.Element => {
  // const [error, setError] = useState<Error | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(true);

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
      <div className="homeAllInfo">
        <div className="homeInfo">
          <div>
            <h3>Bienvenue sur Teyvat !</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Aspernatur quae aperiam nulla totam a recusandae itaque quos
              tempore perferendis vero praesentium ad, cumque excepturi ipsam
              debitis ab ducimus hic omnis. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Autem consequatur explicabo tenetur
              delectus inventore magnam facilis dolorem officiis aspernatur
              reprehenderit voluptas neque provident et aliquid vel esse, quidem
              blanditiis quos.
            </p>
          </div>
          <div>
            <h3>Weekly Boss</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
              quibusdam. Maiores, dolorem. Odit accusantium tenetur enim,
              recusandae, sapiente explicabo sequi modi reiciendis eius
              consequuntur debitis aut temporibus et, beatae facilis! Ipsam
              autem minima praesentium alias rerum, impedit laudantium atque,
              repellat tempora consequuntur dolor sed dignissimos eligendi culpa
              sit possimus similique at quis saepe hic exercitationem.
              Accusantium deserunt aut aliquid esse. Aperiam tempora inventore
              dicta nulla, nisi deleniti, totam laboriosam incidunt perferendis
              numquam commodi! Corrupti, obcaecati maiores, repudiandae laborum
              quisquam veritatis velit minima illum accusantium excepturi quidem
              officiis cum aut minus?
            </p>
          </div>
        </div>

        <div className="homeInfo2">
          <div>
            <h3>Information des personnages</h3>
            <img
              src="https://res.cloudinary.com/dy2ayuond/image/upload/v1709043661/Genshin/Promo_personnages_Liyue_tdnczd.webp"
              alt=""
            />
          </div>
          <div>
            <h3>Test</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
              quibusdam. Maiores, dolorem. Odit accusantium tenetur enim,
              recusandae, sapiente explicabo sequi modi reiciendis eius
              consequuntur debitis aut temporibus et, beatae facilis! Ipsam
              autem minima praesentium alias rerum, impedit laudantium atque,
              repellat tempora consequuntur dolor sed dignissimos eligendi culpa
              sit possimus similique at quis saepe hic exercitationem.
              Accusantium deserunt aut aliquid esse. Aperiam tempora inventore
              dicta nulla, nisi deleniti, totam laboriosam incidunt perferendis
              numquam commodi! Corrupti, obcaecati maiores, repudiandae laborum
              quisquam veritatis velit minima illum accusantium excepturi quidem
              officiis cum aut minus?
            </p>
          </div>
        </div>

        <div className="homeInfo3">
          <div>
            <h3>test</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              eligendi consequatur animi cum assumenda voluptatum tempore
              doloremque saepe, odit, fuga beatae nam. Cupiditate necessitatibus
              molestiae eum. Quos eos maiores delectus. Lorem, ipsum.
            </p>
          </div>
          <div>
            <h3>test</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              eligendi consequatur animi cum assumenda voluptatum tempore
              doloremque saepe, odit, fuga beatae nam. Cupiditate necessitatibus
              molestiae eum. Quos eos maiores delectus. Lorem, ipsum. Lorem
              ipsum dolor, sit amet consectetur adipisicing elit. Veritatis
              ipsum officiis voluptate suscipit vero a tenetur, asperiores
              officia aperiam, commodi voluptas laboriosam quas impedit ratione,
              fuga accusantium dolorum eius est. Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Nobis, labore? Quis fugiat
              necessitatibus labore hic id. Dolores eveniet illo dolorem
              laboriosam dolorum quo quia sapiente libero, rerum tempora natus
              distinctio!
            </p>
          </div>
          <div>
            <h3>Carte intéractive</h3>
            <p>
              La carte Intéractive du monde de teyvat officielle par HoYoLAB.
              Gardez un oeil sur ce que vous découvrez pendant votre exploration
              d monde pour ne rien râté
            </p>
            <button>Carte intéractive</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
