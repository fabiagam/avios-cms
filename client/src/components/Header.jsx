import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="container-fluid container-clearfix">
      <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-inverse">
        <Link className="navbar-brand logox" to={"/home"}>
          Avios
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse pull-left" id="navbarNav">
          <ul className="navbar-nav nav-kit">
            <li className="nav-item active">
              <Link className="nav-link alpha" to={"/"}>
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link alpha" to={"/products"}>
                Shop
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-item" to={"/cart"}>
                View Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/admin"}>
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
