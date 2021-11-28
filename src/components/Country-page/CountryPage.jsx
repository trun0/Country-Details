import "./CountryPage.css";
import react from "react";
import mount from "../Country-card/mountains.jpg";
import s from "./sd.svg";

function CountryPage(props) {
    return (
        <div>
            <button className={"btn back-btn " + props.theme + "-button"}> <i class="fas fa-long-arrow-alt-left"></i> Back</button>
            <div class="row page-content">
                <div className="boxA">
                    <img className="flag-img" src={s} alt="CountryFlag" />
                </div>
                <div className="boxB">
                    <div className="row verbal-details">
                        <h1 className="country-name">Country Name</h1>
                        <div className="boxC">
                            <p className="country-item"><strong>Native Name</strong></p>
                            <p className="country-item"><strong>Population</strong></p>
                            <p className="country-item"><strong>Region</strong></p>
                            <p className="country-item"><strong>Sub Region</strong></p>
                            <p className="country-item"><strong>Capital</strong></p>
                        </div>
                        <div className="boxD">
                            <p className="country-item"><strong>Top Level Domain</strong></p>
                            <p className="country-item"><strong>Currencies</strong></p>
                            <p className="country-item"><strong>Languages</strong></p>
                        </div>
                        <span className="border-countries-container">
                            <strong className="border-countries-text">Border Countries: </strong> 
                            <button className={"btn neighbour-country-btn " + props.theme + "-button"}>qwertt</button>
                            <button className={"btn neighbour-country-btn " + props.theme + "-button"}>asdfg</button>
                            <button className={"btn neighbour-country-btn " + props.theme + "-button"}>jkjlgmxcvv</button>
                            </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CountryPage;