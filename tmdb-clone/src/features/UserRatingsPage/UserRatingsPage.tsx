import React, { Component } from "react";
import './userRatingsPage.css';
import AccountService from './../../services/AccountService';
import AuthenticationService from './../../services/AuthenticationService';
import { RouteComponentProps } from 'react-router-dom';
import { RatingDto } from './../../models/Account/RatingResponseDto';
import ProfileMoviesCard from "../../components/ProfileMoviesCard/ProfileMoviesCard";
import Preloader from './../../components/Preloader/Preloader';

type UserRatingsProps = {

}
type UserRatingsState = {
  page: number;
  results: RatingDto[];
  loading: boolean,
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
      loading: false,
    };
  }

  async componentDidMount() {
    await this.updateRating();
  }

  updateRating = async () => {
    this.setState({
      loading: true,
    })
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
    this.setState({
      loading: false,
    })
  }

  render = () => {
    if (this.state.loading === true) {
      return (<Preloader />)
    } else {
      return (
        <div className="account-wrapper">
          <h3>Your ratings</h3>
          <div className="account-movie-list">
            {this.state.results.map((movie) =>
              <ProfileMoviesCard movie={movie} />
            )}
          </div>
        </div>
      );
    }
  }
}

export default UserRatingsPage;
