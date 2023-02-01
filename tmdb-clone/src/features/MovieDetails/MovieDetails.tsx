import React, { Component } from 'react';
import {
  Icon, Button, Embed, Modal, Popup, Rating, RatingProps,
} from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import MovieDetailsService from '../../services/MovieDetailsService';
import { MovieDetailsViewModel } from '../../models/MovieDetails/ViewModels/MovieDetailsViewModel';
import './movieDetails.css';
import defaultMovie from '../../assets/img/glyphicons-basic-38-picture-grey.svg';
import defaultPerson from '../../assets/img/defaultPerson.svg';
import AccountService from '../../services/AccountService';
import AuthenticationService from '../../services/AuthenticationService';
import { posterUrl } from '../../configuration/configuration';
import Preloader from '../../components/Preloader/Preloader';
import getRatingColor, { fallbackImage, getFullLanguage } from '../../common/utils';
import AccordionCard from '../../components/AccordionCard';
import { getUserImageUrl } from '../../common/helpers';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ColorThief = require('colorthief').default;

type MovieDetailsProps = {
  id: string
};

type MovieDetailsState = {
  model: MovieDetailsViewModel;
  loading: boolean;
  ratedMovie?: RatingViewModel | null;
  watchListMovie?: RatingViewModel | null;
  watchListActive: boolean;
  favoriteActive: boolean;
  favoriteMovie?: RatingViewModel | null;
  filterColor: string;
};

type RatingViewModel = {
  movieId: number;
  rating?: number;
};

class MovieDetails extends Component<RouteComponentProps<MovieDetailsProps>, MovieDetailsState> {
  movieDetailsService: MovieDetailsService;

  accountService: AccountService;

  authenticationService: AuthenticationService;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  colorThief: any;

  id: string;

  constructor(props: RouteComponentProps<MovieDetailsProps>) {
    super(props);
    this.id = props.match.params.id;
    this.movieDetailsService = new MovieDetailsService();
    this.accountService = new AccountService();
    this.authenticationService = new AuthenticationService();
    this.colorThief = new ColorThief();
    this.state = {
      model: {
        vote_average: 0,
      },
      loading: true,
      watchListActive: false,
      favoriteActive: false,
      filterColor: '',
    };
  }

  componentDidMount = async () => {
    await this.updatePage(this.id);
  };

  async componentDidUpdate(prevProps: RouteComponentProps<MovieDetailsProps>) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      await this.updatePage(this.props.match.params.id);
    }
  }

  private async getMyMovieRating(movie: MovieDetailsViewModel) {
    const account = this.authenticationService.getCurrentAccountDetails();
    let ratedMovie: RatingViewModel | null = null;
    if (AuthenticationService.isAuthenticated() && account) {
      const ratingResponse = await this.accountService.getRatings(account.id);
      const foundMovie = ratingResponse.find((item) => item.id === movie.id);
      if (foundMovie) {
        ratedMovie = {
          movieId: foundMovie.id,
          rating: foundMovie.rating,
        };
      }
    }
    return ratedMovie;
  }

  private async setMyMovieWatchList(movie: MovieDetailsViewModel) {
    const account = this.authenticationService.getCurrentAccountDetails();
    if (AuthenticationService.isAuthenticated() && account) {
      const watchListResponse = await this.accountService.getWatchList(account.id);
      const foundMovie = watchListResponse.find((item) => item.id === movie.id);
      if (foundMovie) {
        this.setState({
          watchListActive: true,
        });
      }
    }
  }

  private async setMyMovieFavorite(movie: MovieDetailsViewModel) {
    const account = this.authenticationService.getCurrentAccountDetails();
    if (AuthenticationService.isAuthenticated() && account) {
      const favoriteResponse = await this.accountService.getFavorites(account.id);
      const foundMovie = favoriteResponse.find((item) => item.id === movie.id);
      if (foundMovie) {
        this.setState({
          favoriteActive: true,
        });
      }
    }
  }

  private handleToFavoriteClicked = () => {
    const favoriteActive = !this.state.favoriteActive;
    this.setState({
      favoriteActive,
    });
    const accountId = this.authenticationService.getCurrentAccountDetails()?.id;
    if (accountId) {
      this.accountService.addOrRemoveToFavorites(accountId, +this.id, favoriteActive);
    }
  };

  private handleToWatchListClicked = () => {
    const watchListActive = !this.state.watchListActive;
    this.setState({
      watchListActive,
    });
    const accountId = this.authenticationService.getCurrentAccountDetails()?.id;
    if (accountId) {
      this.accountService.addOrRemoveToWatchList(accountId, +this.id, watchListActive);
    }
  };

  private handleRatingMovieClicked = (event: React.MouseEvent<HTMLDivElement>,
    data: RatingProps) => {
    if (data.rating) {
      this.accountService.rateMovie(this.id, data.rating as number);
    }
  };

  private updatePage = async (id: string) => {
    this.setState({
      loading: true,
    });
    const movie = await this.movieDetailsService.getMovie(id);
    await this.setMyMovieWatchList(movie);
    await this.setMyMovieFavorite(movie);
    const ratedMovie: RatingViewModel | null = await this.getMyMovieRating(movie);

    this.setState({
      ratedMovie,
      model: movie,
      loading: false,
    });

    if (movie.poster_path) {
      this.getPrimaryColor(`${posterUrl}/w342${movie.poster_path}`, (color: number[]) => {
        this.setState({
          filterColor: color.join(','),
        });
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/ban-types
  private getPrimaryColor = (imageUrl: string, callback: Function): void => {
    const img = document.getElementsByClassName('movie-poster')[0] as HTMLImageElement;
    img?.addEventListener('load', () => {
      const result = this.colorThief.getColor(img);
      callback(result);
    });
    img.src = imageUrl;
    img.crossOrigin = 'Anonymous';
  };

  private getPopupContent = (active: boolean): string => {
    let result = '';
    if (!AuthenticationService.isAuthenticated()) {
      result = 'Login to add this movie to your list';
    } else if (active) {
      result = 'Successfully added';
    } else {
      result = 'Successfully removed';
    }
    return result;
  };

  private getTextColor = (rgbNumbers: string): string => {
    const rgbArray = rgbNumbers.split(',');
    if (rgbArray) {
      if (+rgbArray[0] > 180 || +rgbArray[1] > 180 || +rgbArray[2] > 180) {
        return '#000';
      }
    }
    return '#fff';
  };

  render = () => {
    const dateFormatter = new Intl.DateTimeFormat('ru');
    const moneyFormatter = new Intl.NumberFormat('en', {
      maximumSignificantDigits: 3,
    });

    if (this.state.loading === true) {
      return (<Preloader />);
    }

    return (
      <div className="movieDetails-container">
        <div
          className="movie-bg"
          style={{
            background: this.state.model.backdrop_path
              ? `url(${posterUrl}/original${this.state.model.backdrop_path})` : 'grey',
          }}
        >
          <div
            className="movie-bg__filter"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(${this.state.filterColor}, 1.00),
                rgba(${this.state.filterColor},0.84) 100%`,
              color: this.getTextColor(this.state.filterColor),
            }}
          >
            <div className="movie_poster__column">
              <img
                src={`${posterUrl}/w342${this.state.model.poster_path}`}
                alt="movie poster"
                className="movie-poster"
                onError={(e) => fallbackImage(e, defaultMovie)}
              />
            </div>
            <div className="movie_inform__column">
              <h2 className="movie-title">
                {this.state.model.title}
                <span className="movie-year">{this.state.model.release_date ? ` (${this.state.model.release_date?.substr(0, 4)})` : ''}</span>
                <a href={`https://www.imdb.com/title/${this.state.model.imdb_id}`}>
                  <Icon name="imdb" link size="small" />
                </a>
                <div className="facts">
                  <span className="release-date">
                    {this.state.model.release_date && `${dateFormatter.format(new Date(this.state.model.release_date))} `}
                  </span>
                  <span>
                    {this.state.model.genres?.map((genre) => (
                      <span key={genre.id}>
                        <Icon color="red" name="circle outline" size="small" />
                        {` ${genre.name} `}
                      </span>
                    ))}
                  </span>
                  <span>
                    <Icon color="red" name="circle outline" size="small" />
                    {this.state.model.runtime ? `${this.state.model.runtime} min` : ''}
                  </span>
                </div>
              </h2>

              <div className="actions">
                <div className="movie_inform-vote">
                  <div className="user-score">
                    <div
                      className="movie_inform-voting"
                      style={{
                        borderColor: getRatingColor(this.state.model.vote_average),
                      }}
                    >
                      {this.state.model.vote_average ? `${Math.round(this.state.model.vote_average * 10)}%` : 'NR'}
                    </div>
                    <span>
                      User
                      <br />
                      {' Score'}
                    </span>
                  </div>
                  <div className="movie_inform-buttons">
                    <Popup
                      on="click"
                      position="bottom center"
                      pinned
                      trigger={(
                        <Button
                          color="red"
                          circular
                          icon={this.state.favoriteActive && AuthenticationService.isAuthenticated() ? 'heart' : 'heart outline'}
                          toggle={!!AuthenticationService.isAuthenticated()}
                          active={!!this.state.favoriteActive}
                          onClick={this.handleToFavoriteClicked}
                          size="large"
                          className="movie_inform-like"
                        />
                      )}
                    >
                      <Popup.Content>
                        {this.getPopupContent(this.state.favoriteActive)}
                      </Popup.Content>
                    </Popup>
                    <Popup
                      on="click"
                      position="bottom center"
                      pinned
                      trigger={(
                        <Button
                          toggle={!!AuthenticationService.isAuthenticated()}
                          active={!!this.state.watchListActive}
                          color="blue"
                          circular
                          icon={this.state.watchListActive && AuthenticationService.isAuthenticated() ? 'bookmark' : 'bookmark outline'}
                          onClick={this.handleToWatchListClicked}
                          size="large"
                          className="movie_inform-mark"
                        />
                      )}
                    >
                      <Popup.Content>
                        {this.getPopupContent(this.state.watchListActive)}
                      </Popup.Content>
                    </Popup>

                    <Popup
                      on="click"
                      position="bottom center"
                      pinned
                      trigger={(
                        <Button
                          color="yellow"
                          circular
                          icon="star"
                          size="large"
                          className="movie_inform-star"
                        />
                      )}
                    >
                      <Popup.Content>
                        {AuthenticationService.isAuthenticated()
                          ? (
                            <Rating
                              onRate={this.handleRatingMovieClicked}
                              icon="star"
                              defaultRating={this.state.ratedMovie?.rating}
                              maxRating={10}
                            />
                          ) : 'Login to rate this movie'}
                      </Popup.Content>
                    </Popup>
                  </div>
                  {this.state.model.videos?.results[0]
                    && (
                      <Modal
                        closeIcon
                        trigger={(
                          <Button className="movie_inform-youtube" compact color="youtube">
                            <Icon name="youtube play" />
                            Play trailer
                          </Button>
                        )}
                      >
                        <Modal.Content>
                          <Embed
                            key={this.state.model.videos?.results[0].id}
                            id={this.state.model.videos?.results[0].key}
                            placeholder={`${posterUrl}/original${this.state.model.backdrop_path}`}
                            source="youtube"
                          />
                        </Modal.Content>
                      </Modal>
                    )}
                </div>
              </div>
              <div className="header_info">
                <h3 className="tagline">{this.state.model.tagline}</h3>
                <h3>Overview</h3>
                <div className="overview">
                  {this.state.model.overview}
                </div>
              </div>
              {/* {this.state.model.crew?
              .filter((item) => item.job?.toLowerCase().includes('director'))?.map((person) => (
                <>
                  {person.name}
                  -
                  {person.job}
                </>
              ))} */}
            </div>
          </div>
        </div>
        <div className="movie-content__wrapper">
          <div className="white__column">
            <h3>Top Billed Cast</h3>
            {(this.state.model.cast && this.state.model.cast.length > 0)
              ? (
                <section className="movieActors">
                  {this.state.model.cast?.map((person) => (
                    <AccordionCard
                      id={person.id}
                      name={person.name}
                      character={person.character}
                      profile_path={person.profile_path}
                    />
                  ))}
                </section>
              )
              : 'We do not have any cast added to this movie. You can help by adding some!'}
            <h3>Movie Crew</h3>
            {(this.state.model.crew && this.state.model.crew.length > 0)
              ? (
                <section className="movieActors">
                  {this.state.model.crew?.map((person) => (
                    <AccordionCard
                      id={`${person.id}${person.job}`}
                      name={person.name}
                      profile_path={person.profile_path}
                      job={person.job}
                    />
                  ))}
                </section>
              )
              : 'We do not have any crew added to this movie. You can help by adding some!'}
            <h3>Social</h3>
            {(this.state.model.reviews?.results && this.state.model.reviews?.results.length > 0)
              ? (
                <section>
                  <div className="reviews-container">
                    {this.state.model.reviews?.results?.map((review) => (
                      <div className="review-user" key={review.id}>
                        <div className="reviews-column-first">
                          <img
                            alt="avatar"
                            className="review-user__avatar"
                            src={review.author_details.avatar_path
                              ? `${getUserImageUrl(review.author_details.avatar_path)}`
                              : `${defaultPerson}`}
                          />
                        </div>
                        <div className="reviews-column-second">
                          <div className="reviews-heading">
                            <h3>
                              {`A review by ${review.author_details.username}`}
                            </h3>
                            <h5>
                              {`Written by ${review.author_details.username} on `}
                              {review.created_at ? dateFormatter.format(new Date(review.created_at)) : '-'}
                            </h5>
                          </div>
                          {review.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : 'We don\'t have any reviews for this movie'}
            <h3>Media</h3>
            {(this.state.model.videos?.results && this.state.model.videos?.results.length > 0) ? (
              <section className="trailers">
                <Embed
                  id={this.state.model.videos?.results[0].key}
                  key={this.state.model.videos?.results[0].id}
                  placeholder={`${posterUrl}/original${this.state.model.backdrop_path}`}
                  source="youtube"
                />
              </section>
            ) : 'We don\'t have any trailers for this movie'}

            <h3>Recommendations</h3>
            {(this.state.model.recommendations && this.state.model.recommendations?.length > 0)
              ? (
                <section className="movieRecommendations">
                  {this.state.model.recommendations?.map((recommendation) => (
                    <AccordionCard
                      id={recommendation.id}
                      poster_path={recommendation.poster_path}
                      title={recommendation.title}
                      vote_average={recommendation.vote_average}
                      key={recommendation.id}
                    />
                  ))}
                </section>
              ) : 'We don\'t have any recommendations for this movie'}
          </div>
          <div className="grey__column">
            <section className="split-column">
              <p>
                <b>Status </b>
                <br />
                {this.state.model.status}
              </p>
              <p>
                <b>Original Language </b>
                <br />
                {this.state.model.original_language ? getFullLanguage(this.state.model.original_language) : '-'}
              </p>
              <p>
                <b>Budget </b>
                <br />
                {this.state.model.budget ? `$${moneyFormatter.format(this.state.model.budget)}` : '-'}
              </p>
              <p>
                <b>Revenue </b>
                <br />
                {this.state.model.revenue ? `$${moneyFormatter.format(this.state.model.revenue)}` : '-'}
              </p>
              <p>
                <b>Keywords </b>
                <br />
                <span className="movieDetails-keywords">
                  {this.state?.model.keywords?.keywords.map((keyword) => (
                    <Button compact size="mini" key={keyword.id}>
                      {keyword.name}
                    </Button>
                  ))}
                </span>
              </p>
            </section>
          </div>
        </div>
      </div>
    );
  };
}

export default MovieDetails;
