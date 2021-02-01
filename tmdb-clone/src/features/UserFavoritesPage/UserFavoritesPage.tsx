import React, { Component } from 'react';
import './userFavoritesPage.css';
import { RouteComponentProps } from 'react-router-dom';
import AccountService from '../../services/AccountService';
import AuthenticationService from '../../services/AuthenticationService';
import { RatingDto } from '../../models/Account/RatingResponseDto';
import ProfileMoviesCard from '../../components/ProfileMoviesCard/ProfileMoviesCard';
import Preloader from '../../components/Preloader/Preloader';

type UserFavoritesProps = {

};

type UserFavoritesState = {
  results: RatingDto[];
  loading: boolean;
};

class UserFavoritesPage extends Component<
RouteComponentProps<UserFavoritesProps>,
UserFavoritesState> {
  accountService: AccountService;

  authenticationService: AuthenticationService;

  constructor(props: RouteComponentProps<UserFavoritesProps>) {
    super(props);
    this.accountService = new AccountService();
    this.authenticationService = new AuthenticationService();
    this.state = {
      results: [],
      loading: false,
    };
  }

  async componentDidMount() {
    await this.updateFavorites();
  }

  updateFavorites = async () => {
    this.setState({
      loading: true,
    });
    const accountId = this.authenticationService.getCurrentAccountDetails();
    if (accountId) {
      const allRatings = await this.accountService.getFavorites(accountId.id);
      this.setState({
        results: allRatings,
        loading: false,
      });
    } else {
      this.props.history.push('/login');
    }
  };

  render = () => {
    if (this.state.loading === true) {
      return (<Preloader />);
    }
    return (
      <div className="account-wrapper">
        <h3>Your favorites</h3>
        <div className="account-movie-list">
          {this.state.results.map((movie) => (
            <ProfileMoviesCard
              movie={movie}
              key={movie.id}
            />
          ))}
        </div>
      </div>
    );
  };
}

export default UserFavoritesPage;
