import "./home.css";
import React, { useEffect, useState } from "react";
import CountryCard from "../Country-card/CountryCard";
import Filter from "../Filter-by-region/Filter-by-region";
import LoadingSpinner from "../PreloadAnimation/LoadingSpinner/LoadingSpinner";
import axios from "axios";

function Home(props) {
  const [cardsArray, setCardsArray] = useState([]); // countries filtered by regions or all countries
  const [countriesToDisplay, setCountriesToDisplay] = useState([]); //countries filtered by using search box
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getResults("https://restcountries.com/v3.1/all");
  }, []);

  async function handleSearch(event) {
    setCountriesToDisplay(
      cardsArray.filter((ele) => {
        return ele.name.common
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      })
    );
  }

  async function handleFilter(event) {
    if (event.target.value === "") {
      getResults("https://restcountries.com/v3.1/all");
    } else {
      getResults("https://restcountries.com/v3.1/region/" + event.target.value);
    }
  }

  async function getResults(url) {
    await axios
      .get(url)
      .then(function (response) {
        // handle success
        // console.log(response);
        setCardsArray(response.data);
        setCountriesToDisplay(response.data);
        setSearchInput("");
        setIsLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setIsLoading(false);
      })
      .then(function () {
        // always executed
      });
  }

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="home">
          <div className="search-filter">
            <div className="search-bar">
              <i className="fas fa-search input-icon-search"></i>
              <input
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  handleSearch(e);
                }}
                className={"form-control search " + props.theme + "-search"}
                type="text"
                placeholder="Search for a country..."
                value={searchInput}
              ></input>
            </div>
            <Filter theme={props.theme} handleFilter={handleFilter} />
          </div>

          <div className="flex-container">
            {countriesToDisplay.length === 0 ? (
              <center>
                <h4>Country Not Found</h4>
                <p>
                  We apologize for the inconvenience, but the country you are
                  searching for is either not available in the selected region
                  or does not exist in our current database. Please double-check
                  the region selection and ensure that you have entered the
                  correct country name.
                </p>
              </center>
            ) : (
              countriesToDisplay.map((item) => {
                return (
                  <CountryCard
                    key={item.name.official}
                    theme={props.theme}
                    imageSource={item.flags.png}
                    countryName={item.name.common}
                    population={item.population}
                    region={item.region}
                    capital={item.capital}
                  />
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
