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
import MovieDetails from './features/MovieDetails/MovieDetails';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PersonPage from './features/PersonPage/PersonPage';
import PopularPeoplePage from './features/PopularPeoplePage';
import UserWatchlistPage from './features/UserWatchlistPage';
import UserRatingsPage from './features/UserRatingsPage';
import UserProfilePage from './features/UserProfilePage/UserProfilePage';


function App() {
  return (
    <>
      <Router basename="/rsclone">
        <Header />
        <Switch>
          <Route exact path="/" component={MoviesListPage} />
          <Route exact path="/movies/:id" component={MovieDetails} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/person/:id" component={PersonPage} />
          <Route exact path="/person/" component={PopularPeoplePage} />
          <Route exact path="/u/:userId/watchlist" component={UserWatchlistPage} />
          <Route exact path="/u/:userId/ratings" component={UserRatingsPage} />
          <Route exact path="/u/:userId/" component={UserProfilePage} />
          {/* <Route path="*" component={NotFound} /> */}
        </Switch>
        <Footer />
      </Router>
      {/* <Error /> */}
      {/* <TestTask/> */}
    </>
  );
}

export default App;
