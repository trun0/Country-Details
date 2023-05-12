import "./CountryPage.css";
import LoadingText from "../PreloadAnimation/LoadingText/LoadingText";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function CountryPage(props) {

    const [country, setCountry] = useState({});
    const [borderCountries, setBorderCountries] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [nativeName, setNativeName] = useState("");
    const [isLoading, setIsLoading] = useState(true);


    const params = useParams();
    useEffect(() => {
        setIsLoading(true);
        const countryName = params.cname;
        // console.log(countryName);
        axios.get('https://restcountries.com/v3.1/name/' + countryName)
            .then(function (response) {
                // handle success
                // console.log(response.data);
                let countryObject = response.data.find((ele) => ele.name.common.toLowerCase() === countryName.toLowerCase());
                setCountry(countryObject);
                const languageArr = Object.values(countryObject.languages);
                setLanguages(languageArr);
                let currencyArr = Object.values(countryObject.currencies);
                for (let i = 0; i < currencyArr.length; i++) {
                    currencyArr[i] = currencyArr[i].name;
                }
                setCurrencies(currencyArr);
                let nativeNameArr = Object.values(countryObject.name.nativeName);
                nativeNameArr[0] = nativeNameArr[0].common;
                setNativeName(nativeNameArr[0]);
                let borderArr = countryObject.borders ? Object.values(countryObject.borders) : [];
                setBorders(borderArr);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, [params]);


    async function setBorders(borders) {
        let borderArr2 = [];
        for (let i = 0; i < borders.length; i++) {

            await axios.get('https://restcountries.com/v3.1/alpha/' + borders[i])
                .then(function (resp) {
                    // handle success
                    //console.log(resp.data[0]);
                    borderArr2.push(resp.data[0].name.common);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
            //console.log(borderArr2);
        }
        setBorderCountries(borderArr2);
        setIsLoading(false);
    }



    return (<div>
        {country && Object.keys(country).length === 0 && Object.getPrototypeOf(country) === Object.prototype ? <></>: 
                <div key={country.name.official}>
                    <Link to="/"><button className={"btn back-btn " + props.theme + "-button"}> <i className="fas fa-long-arrow-alt-left"></i> Back</button></Link>
                    <div className="page-content">
                        <div className="boxA">
                            <img className="flag-img" src={country.flags.svg} alt="CountryFlag" />
                        </div>
                        <div className="boxB">
                            <div className="row verbal-details">
                                <h1 className="country-name">{country.name.common}</h1>
                                <div className="boxC">
                                    <p className="country-item"><strong>Native Name: </strong>{nativeName}</p>
                                    <p className="country-item"><strong>Population: </strong>{country.population}</p>
                                    <p className="country-item"><strong>Region: </strong>{country.region}</p>
                                    <p className="country-item"><strong>Sub Region: </strong>{country.subregion}</p>
                                    <p className="country-item"><strong>Capital: </strong>{country.capital}</p>
                                </div>
                                <div className="boxD">
                                    <p className="country-item"><strong>Top Level Domain: </strong>{country.tld.join(', ')}</p>
                                    <p className="country-item"><strong>Currencies: </strong>{currencies.join(', ')}</p>
                                    <p className="country-item"><strong>Languages: </strong>{languages.join(', ')}</p>
                                </div>
                                <span className="border-countries-container">
                                    <strong className="border-countries-text">Border Countries: </strong>
                                    {(isLoading) ? <LoadingText />
                                    : borderCountries.length === 0 ? <>None</> : borderCountries.map((borderElement) => { return (<Link to={"/" + borderElement} key={borderElement}><button className={"btn neighbour-country-btn " + props.theme + "-button"} value={borderElement}>{borderElement}</button></Link>) })
                                    }
                                </span>
                            </div>
                        </div> 
                    </div>
                </div>
        }
    </div>);
}

export default CountryPage;