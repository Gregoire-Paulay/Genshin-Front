import { useThemeContext } from "../context/theme-context";
import { useState } from "react";
import Cookies from "js-cookie";

type ThemeButton = "sun" | "moon";

const Theme = (): JSX.Element => {
  const { theme, setTheme } = useThemeContext();
  const [themeButton, setThemeButton] = useState<ThemeButton>(
    Cookies.get("mode") ? "sun" : "moon"
  );

  return (
    <div>
      {/* <button
        className={themeButton}
        onClick={() => {
          if (theme === "night") {
            Cookies.remove("mode");
            setTheme("light");
            setThemeButton("moon");
          } else {
            const mode = "night";
            Cookies.set("mode", mode, { expires: 15 });
            setTheme("night");
            setThemeButton("sun");
          }
        }}
      >
        {themeButton === "sun" ? (
          <i className="fa-solid fa-sun"></i>
        ) : (
          <i className="fa-solid fa-moon"></i>
        )}
      </button> */}
      <nav className="navTheme">
        <ul>
          <li className="deroulant">
            <a href="#">
              {themeButton === "sun" ? (
                <i className="fa-solid fa-sun"></i>
              ) : (
                <i className="fa-solid fa-moon"></i>
              )}
              &ensp;
            </a>
            <ul className="sous">
              <li
                onClick={() => {
                  const mode = "night";
                  Cookies.set("mode", mode, { expires: 15 });
                  setTheme("night");
                  setThemeButton("sun");
                }}
              >
                <a href="#">Mode nuit</a>
              </li>
              <li
                onClick={() => {
                  if (theme === "night") {
                    Cookies.remove("mode");
                    setTheme("light");
                    setThemeButton("moon");
                  }
                }}
              >
                <a href="#">Mode Jour</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Theme;
