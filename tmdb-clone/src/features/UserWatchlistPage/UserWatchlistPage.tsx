import React, { Component } from "react";
import './userWatchlistPage.css';
import AccountService from './../../services/AccountService';
import AuthenticationService from './../../services/AuthenticationService';
import { RouteComponentProps } from 'react-router-dom';
import { RatingDto } from './../../models/Account/RatingResponseDto';
import ProfileMoviesCard from "../../components/ProfileMoviesCard/ProfileMoviesCard";

type UserWatchlistProps = {

}

type UserWatchlistState = {
  page: number;
  results: RatingDto[];
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
    };
  }

  async componentDidMount() {
    await this.updateWatchlist();
  }

  updateWatchlist = async () => {
    let accountId = this.authenticationService.getCurrentAccountDetails();
    if (accountId) {
      let allRatings = await this.accountService.getWatchList(accountId.id, this.state.page);
      this.setState({
        page: allRatings.page,
        results: allRatings.results,
      });
    }
    else {
      this.props.history.push('/login');
    }
  }

  render = () => {
    return (
      <>
        <div className="account-wrapper">
          <h3>Your watchlist</h3>
          {this.state.results.map((movie) =>
            <ProfileMoviesCard
              movie={movie} />
          )}
        </div>

      </>
    );
  }
}

export default UserWatchlistPage;
