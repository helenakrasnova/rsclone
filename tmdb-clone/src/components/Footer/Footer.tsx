import React from "react";
import './footer.css';
import logoFooter from '../../assets/img/logo-footer.svg';
// import { Link } from "react-router-dom";
// import { withRouter } from "react-router";

export default function Footer() {

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content join">
          <img src={logoFooter} className="footer-logo" alt="footer logo" />
          <a className="logged_in" href="/u/helena.trump">Hi helena.trump!</a>
        </div>
        <div className="footer-content">
          <h3 className="footer-heading">The Basics</h3>
          <ul className="footer-list">
            <li><a href="https://www.themoviedb.org/about">About TMDb</a></li>
            <li><a href="https://www.themoviedb.org/about/staying-in-touch">Contact Us</a></li>
            <li><a href="https://www.themoviedb.org/talk">Support Forums</a></li>
            <li><a href="https://www.themoviedb.org/documentation/api">API</a></li>
            <li><a href="https://status.themoviedb.org/">System Status</a></li>
          </ul>
        </div>
        <div className="footer-content">
          <h3 className="footer-heading">GET INVOLVED</h3>
          <ul className="footer-list">
            <li><a href="https://www.themoviedb.org/bible">Contribution Bible</a></li>
            <li><a href="https://www.themoviedb.org/apps">3rd Party Applications</a></li>
            <li><a href="https://www.themoviedb.org/movie/new">Add New Movie</a></li>
            <li><a href="https://www.themoviedb.org/tv/new">Add New TV Show</a></li>
          </ul>
        </div>
        <div className="footer-content">
          <h3 className="footer-heading">COMMUNITY</h3>
          <ul className="footer-list">
            <li><a href="https://www.themoviedb.org/documentation/community/guidelines">Guidelines</a></li>
            <li><a href="https://www.themoviedb.org/discuss">Discussions</a></li>
            <li><a href="https://www.themoviedb.org/leaderboard">Leaderboard</a></li>
            <li><a href="https://twitter.com/themoviedb">Twitter</a></li>
          </ul>
        </div>
        <div className="footer-content">
          <h3 className="footer-heading">LEGAL</h3>
          <ul className="footer-list">
            <li><a href="https://www.themoviedb.org/terms-of-use">Terms of Use</a></li>
            <li><a href="https://www.themoviedb.org/documentation/api/terms-of-use">API Terms of Use</a></li>
            <li><a href="https://www.themoviedb.org/privacy-policy">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

