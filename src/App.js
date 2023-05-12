import "./app.css";
import React, { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./components/Home/Home";
import CountryPage from "./components/Country-page/CountryPage";
import Header from "./components/Header/Header";

function App() {

  const [theme, setTheme] = useState("light");  

  function handleToggle() {
    if (theme === "light") {
      setTheme("dark");
      document.body.style.backgroundColor = "#202C36";
      document.body.style.color = "white";
    }
    else {
      setTheme("light");
      document.body.style.backgroundColor = "#F9F9F9";
      document.body.style.color = "#111517";
    }
  }

  return (
    <div>
      <Header handleToggle={handleToggle} theme={theme} />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home theme={theme} />} />
          <Route path="/:cname"  element={<CountryPage
            theme={theme}
          />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
