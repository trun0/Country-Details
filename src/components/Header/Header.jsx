import "./Header.css";
import React from "react";


function Header(props) {

    return (
        <nav className={"navbar " + props.theme + "-nav"} >
            <div className="container-fluid header-container">
                <h1 className="navbar-brand navbar-text"><strong>Where in the world?</strong></h1>

                <div className="toggler" onClick={props.handleToggle}>
                    {(props.theme === "dark") ? <i className="fas fa-moon"></i>: <i className="far fa-moon"></i> }
                  <span className="theme-toggler"> Dark Mode</span>
                </div>
            </div>
        </nav>
    );
}

export default Header;