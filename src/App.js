import "./app.css";
import React, { useEffect, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./components/Home/Home";
import CountryPage from "./components/Country-page/CountryPage";
import Header from "./components/Header/Header";

function App() {

  let [theme, setTheme] = useState("light");
  const [countryName, setCountryName] = useState("");


  useEffect(() => {
    let path  = window.location.pathname;
    path = path.substring(1, path.length);
    path = decodeURIComponent(path);
    setCountryName(path);
  }, []);
  

  function showCountryPage(e) {
    console.log(e);
    setCountryName(e);
  }

  function handleToggle() {
    if (theme === "light") {
      theme = "dark";
      document.body.style.backgroundColor = "#202C36";
      document.body.style.color = "white";
    }
    else {
      theme = "light";
      document.body.style.backgroundColor = "#F9F9F9";
      document.body.style.color = "#111517";
    }
    setTheme(theme);
  }

  return (
    <div>
      <Header handleToggle={handleToggle} theme={theme} />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home theme={theme} showCountryPage={showCountryPage} />} />
          <Route path={encodeURIComponent(countryName)} element={<CountryPage
            theme={theme}
            countryName={countryName}
            showCountryPage={showCountryPage}
          />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
