import logo from "./logo.svg";
import "./App.css";
import Navbar from "./component/Navbar";
import Search from "./component/Search";
import Pokedex from "./component/Pokedex";
import { useState, useRef } from "react";

function App() {
  const [changeLanguage, setChangeLanguage] = useState(false);
  const [changeBright, setChangeBright] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    if (e.target) {
      setInputValue(e.target.value);
    }
  };

  function toggleLanguage() {
    setChangeLanguage(!changeLanguage);
  }

  function toggleBright() {
    setChangeBright(!changeBright);
  }

  return (
    <div className={changeBright ? "blackBackground" : "whiteBackground"}>
      <Navbar
        changeBright={changeBright}
        toggleLanguage={toggleLanguage}
        toggleBright={toggleBright}
        changeLanguage={changeLanguage}
      />
      <main className="main">
        <Search
          inputValue={inputValue}
          handleChange={handleChange}
          changeBright={changeBright}
        />
        <Pokedex
          inputValue={inputValue}
          changeLanguage={changeLanguage}
          changeBright={changeBright}
        />
      </main>
    </div>
  );
}

export default App;
