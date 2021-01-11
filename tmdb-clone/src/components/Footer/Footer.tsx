import React from "react";
import './footer.css';
import logoFooter from '../../assets/img/logo-footer.svg';
// import { Link } from "react-router-dom";
// import { withRouter } from "react-router";

export default function Footer() {

  return (
    <div className="footer">
      <div className="footer-container">
        <img src={logoFooter} className="footer-logo" alt="footer logo" />
      </div>

    </div>
  );
}

