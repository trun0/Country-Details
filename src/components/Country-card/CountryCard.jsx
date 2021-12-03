import React from "react";
import "./countryCard.css";
import { Link } from "react-router-dom";

function CountryCard(props) {
    return (
        <div >
            <Link to="/detail" style={(props.theme==="dark") ? {color: "white", textDecoration:"none"} : {color: "black", textDecoration:"none" }} ><div className={"card " + props.theme + "-card"} onClick={e=>{props.showCountryPage(props.countryName)}}>
                <img src={props.imageSource} className="card-img-top country-png-image" alt="..." />
                <div className="card-body">
                    <h5 className="card-title"><strong> {props.countryName}</strong></h5>
                    <p className="card-text">
                        <li><strong>Population:</strong> {props.population}</li>
                        <li><strong>Region:</strong> {props.region}</li>
                        <li><strong>Capital:</strong> {props.capital}</li>
                    </p>
                </div>
            </div>
            </Link>
        </div>
    );
}

export default CountryCard;