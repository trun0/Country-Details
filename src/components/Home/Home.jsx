import "./home.css";
import React, {useState } from "react";
import CountryCard from "../Country-card/CountryCard";
import Filter from "../Filter-by-region/Filter-by-region";
import LoadingSpinner from "../PreloadAnimation/LoadingSpinner/LoadingSpinner";
import axios from "axios";


function Home(props) {

    const [cardsArray, setCardsArray] = useState([]);
    const [trigger, setTrigger] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [searchInput, setSearchInput] = useState(""); 

    if (trigger) {
        setTrigger(!trigger);
        getResults('https://restcountries.com/v3.1/all');
    }

    async function handleSearch(event) {
        event.preventDefault();
        if (event.target.value === "") {
            getResults('https://restcountries.com/v3.1/all');

        }
        else {
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

        return (<div>
            {isLoading ? <LoadingSpinner /> :
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
                                showCountryPage={props.showCountryPage}
                                imageSource={item.flags.png}
                                countryName={item.name.common}
                                population={item.population}
                                region={item.region}
                                capital={item.capital}
                            />
                        );
                    })}
                </div>
            </div>}
            </div>);
}

export default Home;
