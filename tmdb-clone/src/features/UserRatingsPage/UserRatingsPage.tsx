import React, { Component } from "react";
import './userRatingsPage.css';
import AccountService from './../../services/AccountService';
import AuthenticationService from './../../services/AuthenticationService';
import { RouteComponentProps } from 'react-router-dom';
import { RatingDto } from './../../models/Account/RatingResponseDto';
import ProfileMoviesCard from "../../components/ProfileMoviesCard/ProfileMoviesCard";

type UserRatingsProps = {

}
type UserRatingsState = {
  page: number;
  results: RatingDto[];
}
class UserRatingsPage extends Component<RouteComponentProps<UserRatingsProps>, UserRatingsState> {
  accountService: AccountService;
  authenticationService: AuthenticationService;
  constructor(props: RouteComponentProps<UserRatingsProps>) {
    super(props);
    this.accountService = new AccountService();
    this.authenticationService = new AuthenticationService();
    this.state = {
      page: 1,
      results: [],
    };
  }

  async componentDidMount() {
    await this.updateRating();
  }

  updateRating = async () => {
    let accountId = this.authenticationService.getCurrentAccountDetails();
    if (accountId) {
      let allRatings = await this.accountService.getRatings(accountId.id, this.state.page);
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
          <h3>Your ratings</h3>
          <div className="account-movie-list">
            {this.state.results.map((movie) =>
              <ProfileMoviesCard movie={movie} />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default UserRatingsPage;
