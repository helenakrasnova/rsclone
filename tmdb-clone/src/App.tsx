import React from 'react';
import logo from './logo.svg';
import './App.css';
import MoviesListPage from './features/MoviesListPage';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        {/* <Header /> */}
        <Switch>
          <Route exact path="/" component={MoviesListPage} />
          {/* <Route path="*" component={NotFound} /> */}
        </Switch>
      </Router>
      {/* <Footer /> */}
      {/* <Error /> */}
      {/* <TestTask/> */}
    </>
  );
}

export default App;
