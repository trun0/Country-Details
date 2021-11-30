import React from "react";
import "./filter.css";

function Filter(props) {
    return (
        <div className="filter-bar">
            <select onChange={(e)=>{props.handleFilter(e)}} className={"form-select filter " + props.theme + "-filter"} name="" id="">
                <option value="">Filter by region</option>
                <option value="africa">Africa</option>
                <option value="americas">Americas</option>
                <option value="asia">Asia</option>
                <option value="europe">Europe</option>
                <option value="oceania">Oceania</option>
            </select>
        </div>
    );
}

export default Filter;