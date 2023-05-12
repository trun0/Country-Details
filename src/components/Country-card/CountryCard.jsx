import React from "react";
import "./countryCard.css";
import { Link } from "react-router-dom";

function CountryCard(props) {

    return (
        <div >
            <Link to={"/" + props.countryName} style={(props.theme==="dark") ? {color: "white", textDecoration:"none"} : {color: "black", textDecoration:"none" }} >
                <div className={"card " + props.theme + "-card"}>
                    <img src={props.imageSource} className="card-img-top country-png-image" alt="..." />
                    <div className="card-body">
                        <p className="card-title"><strong> {props.countryName}</strong></p>
                        <ul className="card-text">
                            <li><strong>Population:</strong> {props.population}</li>
                            <li><strong>Region:</strong> {props.region}</li>
                            <li><strong>Capital:</strong> {props.capital}</li>
                        </ul>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default CountryCard;