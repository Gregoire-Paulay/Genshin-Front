// import { useThemeContext } from "../context/theme-context";
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
  // const { theme } = useThemeContext();
  const navigate = useNavigate();
  const [headerNavigate, setHeaderNavigate] = useState<Navigate | null>(null);

  return (
    <header>
      <div className="container">
        <nav className="headerNav">
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

          <div>
            <ul
              className={
                headerNavigate === "character" ? "headerBottomBorder" : ""
              }
              onClick={() => {
                navigate("/Characters");
                setHeaderNavigate("character");
              }}
            >
              Personnages
            </ul>
            <ul
              className={
                headerNavigate === "weapon" ? "headerBottomBorder" : ""
              }
              onClick={() => {
                navigate("/Weapons");
                setHeaderNavigate("weapon");
              }}
            >
              Armes
            </ul>

            <ul
              className={
                headerNavigate === "artifact" ? "headerBottomBorder" : ""
              }
              onClick={() => {
                navigate("/Artifacts");
                setHeaderNavigate("artifact");
              }}
            >
              Artéfacts
            </ul>

            <ul
              className={
                headerNavigate === "weeklyBoss" ? "headerBottomBorder" : ""
              }
              onClick={() => {
                navigate("/WeeklyBoss");
                setHeaderNavigate("weeklyBoss");
              }}
            >
              Boss hebdomadaire
            </ul>

            <ul
              className={
                headerNavigate === "normalBoss" ? "headerBottomBorder" : ""
              }
              onClick={() => {
                navigate("/NormalBoss");
                setHeaderNavigate("normalBoss");
              }}
            >
              Boss de monde
            </ul>
            {/* 
            <ul
              className={headerNavigate === "book" ? "headerBottomBorder" : ""}
              onClick={() => {
                navigate("/Books");
                setHeaderNavigate("book");
              }}
            >
              Matériaux d'aptitudes
            </ul> */}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
