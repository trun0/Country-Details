import React from "react";
import "./countryCard.css";

function CountryCard(props) {
    return (
        <div>
            <div className={"card " + props.theme + "-card"}>
                <img src={props.imageSource} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title"><strong>Card title</strong></h5>
                    <p className="card-text">
                        <li><strong>Population:</strong> 1234567</li>
                        <li><strong>Region:</strong> Americaas</li>
                        <li><strong>Capital:</strong> Lithuaqnia</li>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CountryCard;