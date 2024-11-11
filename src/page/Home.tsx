import { useNavigate } from "react-router-dom";

const Home = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="homeAllInfo">
        <div className="homeInfo">
          <div>
            <h3>Bienvenue sur Teyvat !</h3>
            <p>
              L'objectif de teyvat est de donner accès facilement à des
              informations sur Genshin Impact tels que les artéfacts, les
              constellations des personnage les loss hebdomadaires, etc ...
            </p>
            <p>
              Le site est en ligne depuis Novembre 2024 et utilise les données
              de ma propre <a href="https://genshinapi-gp.netlify.app">API</a>.
            </p>
            <p>
              Pour le moment aucun nouvel outil n'est activement en
              développement.
            </p>
          </div>
          <div>
            <img
              onClick={() => {
                navigate("/WeeklyBoss");
              }}
              src="https://res.cloudinary.com/dy2ayuond/image/upload/v1708704253/Genshin/Boss/Stormterror2.webp"
              alt=""
            />
          </div>
        </div>

        <div className="homeInfo2">
          <div>
            <img
              onClick={() => {
                navigate("/Characters");
              }}
              src="https://res.cloudinary.com/dy2ayuond/image/upload/v1731344865/Genshin/Home.webp"
              alt=""
            />
          </div>
        </div>

        <div className="homeInfo3">
          <div>
            <h3>Site officiel</h3>

            <a href="https://genshin.hoyoverse.com/fr">
              <img
                src="https://res.cloudinary.com/dy2ayuond/image/upload/v1730471880/Genshin/Artwork.webp"
                alt=""
              />
            </a>
          </div>

          <div>
            <h3>Carte intéractive</h3>
            <a href="https://act.hoyolab.com/ys/app/interactive-map/index.html?lang=fr-fr#/map/2?shown_types=">
              <img
                src="https://res.cloudinary.com/dy2ayuond/image/upload/v1730473124/Genshin/Mondstadt_j7l43h.webp"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
