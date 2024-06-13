import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer>
      <div className="container">
        <div>
          <div className="footerDescription">
            <p>Teyvat.com n'est pas affilié ou approuvé par miHoyo.</p>
            <p>
              Teyvat.com met à disposition des informations pour le jeu Genshin
              Impact sur PC, Playstation 4 et l'application mobile sur IOS et
              Android.
            </p>
          </div>

          <div className="footerAllLinks">
            <div>
              <p>Lien de la communauté</p>
              <div>
                <div className="footerLink">
                  <i className="fa-brands fa-reddit"></i>
                  <a href=" https://www.reddit.com/r/Genshin_Impact/">Reddit</a>
                </div>

                <div className="footerLink">
                  <img
                    src="https://res.cloudinary.com/dy2ayuond/image/upload/v1708618455/Genshin/IconAnemo.webp"
                    alt="icon anémo"
                  />
                  <a href=" https://genshin.hoyoverse.com/fr">Site Officiel</a>
                </div>

                <div className="footerLink">
                  <i className="fa-brands fa-twitter"></i>
                  <a href="https://x.com/genshinimpactfr">Twitter officiel</a>
                </div>
              </div>
            </div>
            <div>
              <p>Autres Liens</p>
              <div>
                <div className="footerLink">
                  <p
                    onClick={() => {
                      navigate("/Contacts");
                    }}
                  >
                    Contact
                  </p>
                </div>
                <div className="footerLink">
                  <p
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Modalités
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footerMe">
          © Copyright 2024 - {""}
          <a href="https://my-portfolio-gp.netlify.app/">Grégoire Paulay</a> -
          Made with
          <a href="https://fr.legacy.reactjs.org/"> React</a> and{" "}
          <a href="https://www.typescriptlang.org/">Typescript</a> - Data from{" "}
          <a href="https://github.com/Gregoire-Paulay/Genshin-API">
            {" "}
            Genshin API
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
