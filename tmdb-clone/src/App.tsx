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
import Login from './features/Login';
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <>
      <Router>
        {/* <Header /> */}
        <Switch>
          <Route exact path="/" component={MoviesListPage} />
          <Route exact path="/login" component={Login} />
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
