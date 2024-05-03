import { useThemeContext } from "../context/theme-context";
import { useNavigate } from "react-router-dom";

const Header = (): JSX.Element => {
  const { theme } = useThemeContext();
  const navigate = useNavigate();

  return (
    <header className={theme}>
      <div className="container">
        <div className="headerNav">
          <img
            src="https://res.cloudinary.com/dy2ayuond/image/upload/v1709995008/Genshin/GenshinImpactLogo.jpg"
            alt=""
            onClick={() => {
              navigate("/");
            }}
          />
          <p
            onClick={() => {
              navigate("/Characters");
            }}
          >
            Personnages
          </p>
          <p
            onClick={() => {
              navigate("/WeeklyBoss");
            }}
          >
            Boss hebdomadaire
          </p>
          <p
            onClick={() => {
              navigate("/NormalBoss");
            }}
          >
            Boss de monde
          </p>
          <p
            onClick={() => {
              navigate("/NormalBoss");
            }}
          >
            Matériaux d'aptitudes
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
