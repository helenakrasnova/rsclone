import React, { Component } from 'react';
import { Link, RouteComponentProps, RouteProps } from 'react-router-dom';
import MovieDetailsService from './../../services/MovieDetailsService';
import { MovieDetailsViewModel } from './../../models/MovieDetails/ViewModels/MovieDetailsViewModel';
import './movieDetails.css';
import defaultMovie from '../../assets/img/glyphicons-basic-38-picture-grey.svg';
import { Icon, Button, Embed, Modal, Popup, Rating, RatingProps } from 'semantic-ui-react';
import AccountService from './../../services/AccountService';
import AuthenticationService from '../../services/AuthenticationService';
import { posterUrl } from './../../configuration/configuration';
import Preloader from './../../components/Preloader/Preloader';

type MovieDetailsProps = {
  id: string
}
type MovieDetailsState = {
  model: MovieDetailsViewModel;
  loading: boolean;
}
class MovieDetails extends Component<RouteComponentProps<MovieDetailsProps>, MovieDetailsState> {
  movieDetailsService: MovieDetailsService;
  accountService: AccountService;
  authenticationService: AuthenticationService;
  id: string;
  constructor(props: RouteComponentProps<MovieDetailsProps>) {
    super(props);
    this.id = props.match.params.id;
    this.movieDetailsService = new MovieDetailsService();
    this.accountService = new AccountService();
    this.authenticationService = new AuthenticationService();
    this.state = {
      model: {
        vote_average: 0,
      },
      loading: false,
    }
  }

  componentDidMount = async () => {
    await this.updatePage(this.id);
  }

  async componentDidUpdate(prevProps: any) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      await this.updatePage(this.props.match.params.id);
    }
  }

  updatePage = async (id: string) => {
    this.setState({
      loading: true,
    });
    const movie = await this.movieDetailsService.getMovie(id);
    this.setState({
      model: movie,
      loading: false,
    });
  }

  getPosterUrl = (url: string): string | null => {
    if (!url) {
      return null;
    } else if (!url.includes('http')) {
      return `${posterUrl}/w154${url}`;
    }
    return url;
  }

  getUserImageUrl = (url: string): string | null => {
    if (!url) {
      return null;
    } else if (url.includes('tmdb')) {
      return url;
    } else if (url.includes('gravatar')) {
      return url.slice(1);
    }
    return `${posterUrl}/w185${url}`;
  }

  handleRatingMovieClicked = (event: React.MouseEvent<HTMLDivElement>, data: RatingProps) => {
    if (data.rating) {
      this.accountService.rateMovie(this.id, data.rating as number);
    }
  }

  handleToWatchListClicked = () => {
    const accountId = this.authenticationService.getCurrentAccountDetails()?.id;
    if (accountId) {
      // this.accountService.addOrRemoveToWatchList(accountId, this.id, !markAsAdd);
    }
  }

  render = () => {
    const dateFormatter = new Intl.DateTimeFormat("ru");
    const moneyFormatter = new Intl.NumberFormat("en", {
      maximumSignificantDigits: 3
    });
    if (this.state.loading === true) {
      return (<Preloader />)
    }
    else {
      return (
        <div className="movieDetails-container">
          <div className="movie-bg"
            style={{
              background: this.state.model.backdrop_path ?
                `url(${posterUrl}/original${this.state.model.backdrop_path})` : 'grey'
            }}>
            <div className="movie-bg__filter">
              <div className="movie_poster__column">
                <img src={`${posterUrl}/w342${this.state.model.poster_path}`}
                  alt="movie poster"
                  className="movie-poster"
                  onError={(e: any) => {
                    if (e.target.src !== defaultMovie) {
                      e.target.src = defaultMovie;
                    }
                  }} />
              </div>
              <div className="movie_inform__column">
                <h2 className='movie-title'>{this.state.model.title}
                  <span className="movie-year">{this.state.model.release_date ? ` (${this.state.model.release_date?.substr(0, 4)})` : ''}</span>
                  <div className="facts">
                    <span className="release-date">
                      {this.state.model.release_date ? dateFormatter.format(new Date(this.state.model.release_date)) : ''}
                    </span>
                    <span>
                      {this.state.model.genres?.map((genre) => <span key={genre.id}>
                        <Icon color='red' name='circle outline' size='small' />
                        {genre.name}
                      </span>)}
                    </span>
                    <span>
                      <Icon color='red' name='circle outline' size='small' />
                      {this.state.model.runtime ? `${this.state.model.runtime} min` : ''}
                    </span>
                  </div>
                </h2>

                <div className="actions">
                  <div className="movie_inform-vote">
                    <div className="user-score">
                      <div className="movie_inform-voting" style={{
                        borderColor:
                          this.state.model.vote_average >= 7 ? '#21d07a' :
                            this.state.model.vote_average >= 4 ? '#d2d531' :
                              this.state.model.vote_average > 0 ? '#cb215b' : '#666666'
                      }}>{this.state.model.vote_average !== 0 ? `${this.state.model.vote_average * 10}%` : 'NR'}
                      </div>
                      <span>User <br /> Score</span>
                    </div>
                    <div className="movie_inform-buttons">
                      <Button
                        color='red'
                        circular
                        icon='heart'
                        // onClick={}
                        size='large'
                        className='movie_inform-like' />
                      <Button
                        color='blue'
                        circular
                        icon='bookmark'
                        onClick={this.handleToWatchListClicked}
                        size='large'
                        className='movie_inform-mark' />
                      <Popup
                        on='click'
                        position='bottom center'
                        pinned
                        trigger={
                          <Button
                            color='yellow'
                            circular
                            icon='star'
                            onClick={this.handleToWatchListClicked}
                            size='large'
                            className='movie_inform-star' />
                        }>
                        <Popup.Content>
                          {AuthenticationService.isAuthenticated() ?
                            <Rating
                              onRate={this.handleRatingMovieClicked}
                              icon='star'
                              defaultRating={0}
                              maxRating={10} /> : 'Login to rate this movie'}
                        </Popup.Content>
                      </Popup>
                    </div>
                    {this.state.model.videos?.results[0] ?
                      <Modal
                        closeIcon={true}
                        trigger={
                          <Button className="movie_inform-youtube" compact={true} color='youtube'>
                            <Icon name='youtube play' />
                            Play trailer
                        </Button>
                        }>
                        <Modal.Content>
                          <Embed
                            key={this.state.model.videos?.results[0].id}
                            id={this.state.model.videos?.results[0].key}
                            placeholder={`${posterUrl}/original${this.state.model.backdrop_path}`}
                            source='youtube' />
                        </Modal.Content>
                      </Modal> : ''}
                  </div>
                </div>

                <div className="header_info">
                  <h3 className="tagline">{this.state.model.tagline}</h3>
                  <h3>  Overview</h3>
                  <div className="overview"> {this.state.model.overview}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="movie-content__wrapper">
            <div className="white__column">

              <h3>Top Billed Cast</h3>
              <section className="movieActors">
                {this.state.model.cast?.map((person) => (
                  <div className="person-card" key={person.id}>
                    <Link to={`/person/${person.id}`}>
                      <div
                        className='person-image-container'
                        style={{
                          backgroundImage: `url(${this.getPosterUrl(person.profile_path) ?
                            this.getPosterUrl(person.profile_path) :
                            defaultMovie})`
                        }}>
                      </div>
                      <div className="movieInform-name">{person.name}</div>
                      <div className="movieInform-character">{person.character}</div>
                    </Link>
                  </div>))}
              </section>

              <h3>Social</h3>
              {(this.state.model.reviews?.results && this.state.model.reviews?.results.length > 0) ? <section>
                <div className="reviews-container">
                  {this.state.model.reviews?.results?.map((review) => (
                    <div className="review-user" key={review.id}>
                      <div className="reviews-column-first">
                        <img alt="avatar"
                          className="review-user__avatar"
                          src={review.author_details.avatar_path ?
                            `${this.getUserImageUrl(review.author_details.avatar_path)}` :
                            `${defaultMovie}`} />
                      </div>
                      <div className="reviews-column-second">
                        <div className="reviews-heading">
                          <h3>A review by {review.author_details.username}</h3>
                          <h5>Written by {review.author_details.username} on
                      <> {review.created_at ? dateFormatter.format(new Date(review.created_at)) : '-'}</>
                          </h5>
                        </div>
                        {review.content}
                      </div>
                    </div>))}
                </div>
              </section> : `We don't have any reviews for this movie`}

              <h3>Media</h3>
              {(this.state.model.videos?.results && this.state.model.videos?.results.length > 0) ? <section className="trailers">
                <Embed
                  id={this.state.model.videos?.results[0].key}
                  key={this.state.model.videos?.results[0].id}
                  placeholder={`${posterUrl}/original${this.state.model.backdrop_path}`}
                  source='youtube' />
              </section> : `We don't have any trailers for this movie`}

              <h3>Recommendations</h3>
              {(this.state.model.recommendations && this.state.model.recommendations?.length > 0) ?
                <section className="movieRecommendations">
                  {this.state.model.recommendations?.map((recommendation) => (
                    <div className="recommendation" key={recommendation.id}>
                      <Link to={`/movies/${recommendation.id}`}>
                        <div
                          className='recommendation-inform'
                          style={{
                            backgroundImage: recommendation.poster_path ?
                              `url(${posterUrl}/w342${recommendation.poster_path})` :
                              `url(${defaultMovie})`
                          }}>
                        </div>
                        <div className="movieInform-name">{recommendation.title}</div>
                        <div className="movieInform-character" >{recommendation.vote_average * 10}%</div>
                      </Link>
                    </div>))}
                </section> : `We don't have any recommendations for this movie`}
            </div>
            <div className="grey__column">
              <section className="split-column">
                <p>
                  <strong>Status </strong><br />
                  {this.state.model.status}
                </p>
                <p>
                  <strong>Original Language </strong><br />
                  {this.state.model.original_language}
                </p>
                <p>
                  <strong>Budget </strong><br />
                  {this.state.model.budget ? '$' + moneyFormatter.format(this.state.model.budget) : '-'}
                </p>
                <p>
                  <strong>Revenue </strong><br />
                  {this.state.model.revenue ? '$' + moneyFormatter.format(this.state.model.revenue) : '-'}
                </p>
                <p>
                  <strong>Keywords </strong><br />
                  <div className="movieDetails-keywords">
                    {this.state?.model.keywords?.keywords.map((keyword) =>
                      <Button compact size='mini'>
                        {keyword.name}
                      </Button>)}
                  </div>
                </p>
              </section>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default MovieDetails;
