import "./app.css";
import React, {useState} from "react";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";

function App() { 

  let [theme, setTheme] = useState("light");

    function handleToggle() {
        if(theme === "light") {
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
    <Header handleToggle={handleToggle} theme={theme}/>
    <Home theme={theme} />
    {/* <CountryPage theme={theme} /> */}
    </div>
  );
}

export default App;
