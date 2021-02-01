import React, { Component } from 'react';
import './userRatingsPage.css';
import { RouteComponentProps } from 'react-router-dom';
import AccountService from '../../services/AccountService';
import AuthenticationService from '../../services/AuthenticationService';
import { RatingDto } from '../../models/Account/RatingResponseDto';
import ProfileMoviesCard from '../../components/ProfileMoviesCard/ProfileMoviesCard';
import Preloader from '../../components/Preloader/Preloader';

type UserRatingsProps = {

};

type UserRatingsState = {
  results: RatingDto[];
  loading: boolean,
};

class UserRatingsPage extends Component<RouteComponentProps<UserRatingsProps>, UserRatingsState> {
  accountService: AccountService;

  authenticationService: AuthenticationService;

  constructor(props: RouteComponentProps<UserRatingsProps>) {
    super(props);
    this.accountService = new AccountService();
    this.authenticationService = new AuthenticationService();
    this.state = {
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
    });
    const accountId = this.authenticationService.getCurrentAccountDetails();
    if (accountId) {
      const allRatings = await this.accountService.getRatings(accountId.id);
      this.setState({
        results: allRatings,
      });
    } else {
      this.props.history.push('/login');
    }
    this.setState({
      loading: false,
    });
  };

  render = () => {
    if (this.state.loading === true) {
      return (<Preloader />);
    }
    return (
      <div className="account-wrapper">
        <h3>Your ratings</h3>
        <div className="account-movie-list">
          {this.state.results.map((movie) => <ProfileMoviesCard movie={movie} key={movie.id} />)}
        </div>
      </div>
    );
  };
}

export default UserRatingsPage;
