import { useThemeContext } from "../context/theme-context";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Navigate =
  | "character"
  | "weapon"
  | "artifact"
  | "weeklyBoss"
  | "normalBoss"
  | "book";

const Header = (): JSX.Element => {
  const { theme } = useThemeContext();
  const navigate = useNavigate();
  const [headerNavigate, setHeaderNavigate] = useState<Navigate | null>(null);

  return (
    <header>
      <div className="container">
        <div className="headerNav">
          <div>
            <img
              src="https://res.cloudinary.com/dy2ayuond/image/upload/v1718119694/Genshin/Logo.webp"
              alt="logo"
              onClick={() => {
                navigate("/");
                setHeaderNavigate(null);
              }}
            />
          </div>

          <p
            className={
              headerNavigate === "character" ? "headerBottomBorder" : ""
            }
            onClick={() => {
              navigate("/Characters");
              setHeaderNavigate("character");
            }}
          >
            Personnages
          </p>
          {/* <p
            className={headerNavigate === "weapon" ? "headerBottomBorder" : ""}
            onClick={() => {
              navigate("");
              setHeaderNavigate("weapon");
            }}
          >
            Armes
          </p>
          <p
            className={
              headerNavigate === "artifact" ? "headerBottomBorder" : ""
            }
            onClick={() => {
              navigate("");
              setHeaderNavigate("artifact");
            }}
          >
            Artéfacts
          </p> */}
          <p
            className={
              headerNavigate === "weeklyBoss" ? "headerBottomBorder" : ""
            }
            onClick={() => {
              navigate("/WeeklyBoss");
              setHeaderNavigate("weeklyBoss");
            }}
          >
            Boss hebdomadaire
          </p>
          <p
            className={
              headerNavigate === "normalBoss" ? "headerBottomBorder" : ""
            }
            onClick={() => {
              navigate("/NormalBoss");
              setHeaderNavigate("normalBoss");
            }}
          >
            Boss de monde
          </p>
          <p
            className={headerNavigate === "book" ? "headerBottomBorder" : ""}
            onClick={() => {
              navigate("/Books");
              setHeaderNavigate("book");
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
