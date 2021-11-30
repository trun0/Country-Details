import "./home.css";
import React, { useState } from "react";
import CountryCard from "../Country-card/CountryCard";
import Filter from "../Filter-by-region/Filter-by-region";
import CountryPage from "../Country-page/CountryPage";
import axios from "axios";


function Home(props) {

    const [cardsArray, setCardsArray] = useState([]);
    const [trigger, setTrigger] = useState(true);
    const [countryPageBool, setCountryPageBool] = useState(false);
    const [countryName, setCountryName] = useState("");
    const [searchInput, setSearchInput] = useState("");


    if (trigger) {
        setTrigger(!trigger);
        getResults('https://restcountries.com/v3.1/all');
    }

    function showCountryPage(e) {
        console.log(e);
        setCountryPageBool(true);
        setCountryName(e);
    }

    function gotohome() {
        setCountryPageBool(false);
        // getResults('https://restcountries.com/v3.1/all');
    }

    async function handleSearch(event) {
        if (event.target.value === "") {
            getResults('https://restcountries.com/v3.1/all');

        }
        else if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click{
            getResults('https://restcountries.com/v3.1/name/' + event.target.value);
        }

    }

    async function handleFilter(event) {
        console.log(event.target.value);
        if (event.target.value === "") {
            getResults('https://restcountries.com/v3.1/all');
        }
        else {
            getResults('https://restcountries.com/v3.1/region/' + event.target.value);
        }
    }

    async function getResults(url) {
        await axios.get(url)
            .then(function (response) {
                // handle success
                console.log(response);
                setCardsArray(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    if (countryPageBool) {
        return (
            <CountryPage
                theme={props.theme}
                countryName={countryName}
                gotohome={gotohome}
            />
        );
    }
    else {
        return (
            <div className="home">
                <div className="search-filter">
                    <div className="search-bar">
                        <i className="fas fa-search input-icon-search"></i>
                        <input onKeyUp={e => { handleSearch(e) }} onChange={e => { setSearchInput(e.target.value) }} className={"form-control search " + props.theme + "-search"} type="text" placeholder="Search for a country..." value={searchInput}></input>
                    </div>
                    <Filter theme={props.theme} handleFilter={handleFilter} />
                </div>


                <div className="flex-container">
                    {cardsArray.map((item) => {
                        return (
                            <CountryCard
                                key={item.name.official}
                                theme={props.theme}
                                showCountryPage={showCountryPage}
                                imageSource={item.flags.png}
                                countryName={item.name.common}
                                population={item.population}
                                region={item.region}
                                capital={item.capital}
                            />
                        );
                    })}
                </div>
            </div>);
    }
}

export default Home;
