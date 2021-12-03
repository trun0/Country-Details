import "./Header.css";
import React from "react";


function Header(props) {

    return (
        <nav className={"navbar " + props.theme + "-nav"} >
            <div className="container-fluid header-container">
                <span className="navbar-brand navbar-text"><h2><strong>Where in the world?</strong></h2></span>

                <div className="toggler" onClick={props.handleToggle}>
                    {(props.theme === "dark") ? <i className="fas fa-moon"></i>: <i className="far fa-moon"></i> }
                  <span className="theme-toggler"> Dark Mode</span>
                </div>
            </div>
        </nav>
    );
}

export default Header;