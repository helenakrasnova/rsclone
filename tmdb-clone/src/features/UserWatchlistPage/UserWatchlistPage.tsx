import React, { Component } from "react";
import './userWatchlistPage.css';
import AccountService from './../../services/AccountService';
import AuthenticationService from './../../services/AuthenticationService';
import { RouteComponentProps } from 'react-router-dom';
import { RatingDto } from './../../models/Account/RatingResponseDto';
import ProfileMoviesCard from "../../components/ProfileMoviesCard/ProfileMoviesCard";
import Preloader from './../../components/Preloader/Preloader';

type UserWatchlistProps = {

}

type UserWatchlistState = {
  page: number;
  results: RatingDto[];
  loading: boolean;
}

class UserWatchlistPage extends Component<RouteComponentProps<UserWatchlistProps>, UserWatchlistState> {
  accountService: AccountService;
  authenticationService: AuthenticationService;
  constructor(props: RouteComponentProps<UserWatchlistProps>) {
    super(props);
    this.accountService = new AccountService();
    this.authenticationService = new AuthenticationService();
    this.state = {
      page: 1,
      results: [],
      loading: false,
    };
  }

  async componentDidMount() {
    await this.updateWatchlist();
  }

  updateWatchlist = async () => {
    this.setState({
      loading: true,
    })
    let accountId = this.authenticationService.getCurrentAccountDetails();
    if (accountId) {
      let allRatings = await this.accountService.getWatchList(accountId.id, this.state.page);
      this.setState({
        page: allRatings.page,
        results: allRatings.results,
        loading: false,
      });
    }
    else {
      this.props.history.push('/login');
    }
  }

  render = () => {
    if (this.state.loading === true) {
      return (<Preloader />)
    } else {
      return (
          <div className="account-wrapper">
            <h3>Your watchlist</h3>
            <div className="account-movie-list">
              {this.state.results.map((movie) =>
                <ProfileMoviesCard
                  movie={movie} />
              )}
            </div>
          </div>
      );
    }
  }
}

export default UserWatchlistPage;
