import React from "react";
import { Link } from "react-router-dom";
import "bulma/css/bulma.css";

function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/events" className="navbar-item">
            <img
              src="https://www.mines.edu/wp-content/uploads/assets/mines-logo-150-years.png"
              alt="Mines Graduation Events"
            />
          </Link>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link to="/events" className="button is-light">
                  View Events
                </Link>
                <Link to="/events/new" className="button is-light">
                  New Event
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
