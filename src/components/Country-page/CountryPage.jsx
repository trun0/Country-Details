import "./CountryPage.css";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CountryPage(props) {

    const [trigger, setTrigger] = useState(true);
    const [countryDetails, setCountryDetails] = useState([]);
    const [borderCountries, setBorderCountries] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [nativeName, setNativeName] = useState("");

    if (trigger) {
        setTrigger(!trigger);
        setDetails(props.countryName);
    }

    function showBorderCountry(event) {
        console.log(event.target.value);
        setDetails(event.target.value);
    }


    async function setDetails(naam) {
        await axios.get('https://restcountries.com/v3.1/name/'+ naam)
            .then(function (response) {
                // handle success
                //console.log(response.data);

                let ar;
                for(var i = 0; i < response.data.length; i++) {
                    if(response.data[i].name.common === naam) {
                        ar = [response.data[i]];
                        break;
                    }
                }
                //console.log("BB" + ar);
                setCountryDetails(ar);
                let languageArr = Object.values(ar[0].languages);
                for (i = 0; i < languageArr.length - 1; i++) {
                    languageArr[i] = languageArr[i] + ", ";
                }
                setLanguages(languageArr);
                let currencyArr = Object.values(ar[0].currencies);
                for (i = 0; i < currencyArr.length; i++) {
                    currencyArr[i] = currencyArr[i].name;
                }
                for (i = 0; i < currencyArr.length - 1; i++) {
                    currencyArr[i] = currencyArr[i] + ", ";
                }
                setCurrencies(currencyArr);
                let nativeNameArr = Object.values(ar[0].name.nativeName);
                nativeNameArr[0] = nativeNameArr[0].common;
                setNativeName(nativeNameArr[0]);
                let borderArr = Object.values(ar[0].borders);     
                setBorders(borderArr);           
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }


    async function setBorders(borders) {
        let borderArr2=[];
        for (var i = 0; i < borders.length; i++) {
            
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
                console.log(borderArr2);                
        }
        setBorderCountries(borderArr2);
    }



    return (<div>
        {countryDetails.map((item) => {
            return (
                <div key={item.name.official}>
                    <Link to="/"><button className={"btn back-btn " + props.theme + "-button"}> <i className="fas fa-long-arrow-alt-left"></i> Back</button></Link>
                    <div className="row page-content">
                        <div className="boxA">
                            <img className="flag-img" src={item.flags.svg} alt="CountryFlag" />
                        </div>
                        <div className="boxB">
                            <div className="row verbal-details">
                                <h1 className="country-name">{item.name.common}</h1>
                                <div className="boxC">
                                    <p className="country-item"><strong>Native Name: </strong>{nativeName}</p>
                                    <p className="country-item"><strong>Population: </strong>{item.population}</p>
                                    <p className="country-item"><strong>Region: </strong>{item.region}</p>
                                    <p className="country-item"><strong>Sub Region: </strong>{item.subregion}</p>
                                    <p className="country-item"><strong>Capital: </strong>{item.capital}</p>
                                </div>
                                <div className="boxD">
                                    <p className="country-item"><strong>Top Level Domain: </strong>{item.tld}</p>
                                    <p className="country-item"><strong>Currencies: </strong>{currencies.map((currencyElement) => { return (<span key={currencyElement}>{currencyElement}</span>); })}</p>
                                    <p className="country-item"><strong>Languages: </strong>{languages.map((languageElement) => { return (<span key={languageElement}>{languageElement}</span>); })}</p>
                                </div>
                                <span className="border-countries-container">
                                    <strong className="border-countries-text">Border Countries: </strong>
                                    {borderCountries.map((borderElement) => { return (<span key={borderElement}><button className={"btn neighbour-country-btn " + props.theme + "-button"} value={borderElement} onClick={showBorderCountry}>{borderElement}</button></span>); })}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        })
        }
    </div>);
}

export default CountryPage;