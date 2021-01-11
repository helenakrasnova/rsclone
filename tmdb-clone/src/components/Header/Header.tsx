import React from "react";
import './header.css';
import logo from '../../assets/img/logo.svg';
// import { Link } from "react-router-dom";
// import { withRouter } from "react-router";

export default function Header() {

  return (
    <div className="header">
      <div className="header-container">
        <img src={logo} className="header-logo" alt="logo" />
      </div>
      {/* <div className="App-header headerLogin">
        {isAuthenticated ?
          (<>
            <div className="hello">
              Hello, {authService.userName} !
                        </div>
            <button
              className="logout"
              onClick={() => {
                authService.logOut();
                props.history.push('/login');
              }}>
              logOut
                        </button>
          </>)
          : (<Link to="/login">
            <button className="login">login</button>
          </Link>)}
      </div> */}
    </div>
  );
}

