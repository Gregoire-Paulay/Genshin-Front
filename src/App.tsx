import "./App.css";
import { useThemeContext } from "./context/theme-context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Theme from "./components/Theme";
import Footer from "./components/Footer";
import Header from "./components/Header";

// Pages
import Home from "./page/Home";
import Characters from "./page/Characters";
import CharactersDetails from "./page/CharacterDetails";
import WeeklyBoss from "./page/WeeklyBoss";
import WeeklyBossDetails from "./page/WeeklyBossDetails";
import NormalBoss from "./page/NormalBoss";
import NormalBossDetails from "./page/NormalBossDetails";

function App() {
  const { theme } = useThemeContext();

  return (
    <Router>
      <div className={theme}>
        <Header />
        <Theme />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Characters" element={<Characters />}></Route>
          <Route
            path="/Characters/Details/:id"
            element={<CharactersDetails />}
          ></Route>
          <Route path="/WeeklyBoss" element={<WeeklyBoss />}></Route>
          <Route
            path="/WeeklyBoss/Details/:id"
            element={<WeeklyBossDetails />}
          ></Route>
          <Route path="/NormalBoss" element={<NormalBoss />}></Route>
          <Route
            path="/NormalBoss/Details/:id"
            element={<NormalBossDetails />}
          ></Route>
          <Route></Route>
          <Route></Route>
          <Route></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
