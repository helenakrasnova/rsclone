import React, { Component } from 'react';
import { Link, RouteComponentProps, RouteProps } from 'react-router-dom';
import MovieDetailsService from './../../services/MovieDetailsService';
import { MovieDetailsViewModel } from './../../models/MovieDetails/ViewModels/MovieDetailsViewModel';
import './movieDetails.css';
import defaultMovie from '../../assets/img/glyphicons-basic-38-picture-grey.svg';
import { Icon, Button, Embed, Modal, Popup, Rating } from 'semantic-ui-react';

type MovieDetailsProps = {
  id: string
}
// type MovieDetailsView = {
//   title: string
// }
class MovieDetails extends Component<RouteComponentProps<MovieDetailsProps>, MovieDetailsViewModel> {
  movieDetailsService: MovieDetailsService;
  id: string;
  constructor(props: RouteComponentProps<MovieDetailsProps>) {
    super(props);
    this.id = props.match.params.id;
    this.movieDetailsService = new MovieDetailsService();
    this.state = {
      vote_average: 0
    }
  }

  componentDidMount = async () => {
    this.updatePage(this.id);
  }

  async componentDidUpdate(prevProps: any) {
    if (this.props.match.params.id !== prevProps.match.params.id) {

      await this.updatePage(this.props.match.params.id);
    }
  }

  updatePage = async (id: string) => {
    const movie = await this.movieDetailsService.getMovie(id);
    this.setState(movie);
  }

  getPosterUrl = (url: string): string | null => {
    if (!url) {
      return null;
    } else if (!url.includes('http')) {
      return `https://www.themoviedb.org/t/p/w154${url}`;
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
    return `https://www.themoviedb.org/t/p/w185${url}`;
  }

  render = () => {
    return (
      <>
        <div
          className="movie-bg"
          style={{ background: this.state.backdrop_path?
             `url(https://www.themoviedb.org/t/p/original${this.state.backdrop_path})`:
             'grey' }}>
          <div className="movie-bg__filter">
            <div className="movie_poster__column">
              <img
                src={`https://www.themoviedb.org/t/p/w342${this.state.poster_path}`}
                alt="movie poster"
                className="movie-poster"
                onError={(e: any) => {
                  if (e.target.src !== defaultMovie) {
                    e.target.src = defaultMovie;
                  }
                }} />
            </div>
            <div className="movie_inform__column">
              <h2 className='movie-title'>{this.state.title}
                <span className="movie-year">{this.state.release_date ? ` (${this.state.release_date?.substr(0, 4)})` : ''}</span>
                <div className="facts">
                  <span className="release-date">{this.state.release_date} <Icon color='red' name='circle outline' size='small' /></span>
                  <span>
                    {this.state.genres?.map((genre) => <span key={genre.id}> {genre.name} <Icon color='red' name='circle outline' size='small' />  </span>)}</span>
                  <span>
                    {this.state.runtime ? `${this.state.runtime} min` : ''}
                  </span>
                </div>
              </h2>

              <div className="actions">
                <div className="movie_inform-vote">
                  <div className="user-score">
                    <div className="movie_inform-voting" style={{
                      borderColor:
                        this.state.vote_average >= 7 ? '#21d07a' :
                          this.state.vote_average >= 4 ? '#d2d531' :
                            this.state.vote_average > 0 ? '#cb215b' : '#666666'
                    }}>{this.state.vote_average !== 0 ? `${this.state.vote_average * 10}%` : 'NR'}
                      {/* <span className="percent">%</span> */}
                    </div>
                    <span>User <br /> Score</span>
                  </div>
                  {/* <Button color='red' circular icon='heart' /> */}
                  <Icon name='heart' color='red' link size='large' className='movie_inform-like' />
                  <Icon name="bookmark" link color='red' size='large' className='movie_inform-mark' />
                  <Popup
                    // flowing
                    // hoverable
                    on='click'
                    position='bottom center'
                    pinned
                    trigger={
                      <Icon
                      name="star"
                      link
                      color='yellow'
                      size='large'
                      className='movie_inform-star'
                       />
                    }>
                    <Popup.Content>
                      <Rating icon='star' defaultRating={0} maxRating={10} />
                    </Popup.Content>
                  </Popup>
                  {this.state.videos?.results[0] ?
                    <Modal
                      closeIcon={true}
                      trigger={
                        <Button compact={true} color='youtube'>
                          <Icon name='youtube play' />
                            Play trailer
                      </Button>}>
                      <Modal.Content>
                        <Embed
                          key={this.state.videos?.results[0].id}
                          id={this.state.videos?.results[0].key}
                          placeholder={`https://www.themoviedb.org/t/p/original${this.state.backdrop_path}`}
                          source='youtube' />
                      </Modal.Content>
                    </Modal> : ''
                  }

                </div>
              </div>

              <div className="header_info">
                <h3 className="tagline">{this.state.tagline}</h3>
                <h3>  Overview</h3>
                <div className="overview"> {this.state.overview}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="movie-content__wrapper">
          <div className="white__column">

            <h3>Top Billed Cast</h3>
            <section className="movieActors">
              {this.state.cast?.map((person) => (
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
            {(this.state.reviews?.results && this.state.reviews?.results.length > 0) ? <section>
              <div className="reviews-container">
                {this.state.reviews?.results?.map((review) => (
                  <div key={review.id}>
                    <div
                      className="review-user__avatar"
                      style={{
                        backgroundImage: review.author_details.avatar_path ?
                          `url(${this.getUserImageUrl(review.author_details.avatar_path)})` :
                          `url(${defaultMovie})`
                        // `url(https://www.themoviedb.org/t/p/w185${review.author_details.avatar_path})` ||
                        // `url(${review.author_details.avatar_path?.slice(1)})` ||
                        // `url(${defaultMovie})`
                      }}></div>
                    <div>A review by <strong>{review.author_details.username}</strong></div>
                    <div>Written by <strong>{review.author_details.username}</strong> on {review.created_at}</div>
                    {review.content}
                  </div>))}
              </div>
            </section> : `We don't have any reviews for this movie`}

            <h3>Media</h3>
            {(this.state.videos?.results && this.state.videos?.results.length > 0) ? <section className="trailers">
              <Embed
                id={this.state.videos?.results[0].key}
                key={this.state.videos?.results[0].id}
                placeholder={`https://www.themoviedb.org/t/p/original${this.state.backdrop_path}`}
                source='youtube' />
            </section> : `We don't have any trailers for this movie`}

            <h3>Recommendations</h3>
            {(this.state.recommendations && this.state.recommendations?.length > 0) ?
              <section className="movieRecommendations">
                {this.state.recommendations?.map((recommendation) => (
                  <div className="recommendation" key={recommendation.id}>
                    <Link to={`/movies/${recommendation.id}`}>
                      <div
                        className='recommendation-inform'
                        style={{
                          backgroundImage: recommendation.poster_path ?
                            `url(https://www.themoviedb.org/t/p/w342${recommendation.poster_path})` :
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
                {this.state.status}
              </p>
              <p>
                <strong>Original Language </strong><br />
                {this.state.original_language}
              </p>
              <p>
                <strong>Budget </strong><br />
                {this.state.budget !== 0 ? '$' + this.state.budget : '-'}
              </p>
              <p>
                <strong>Revenue </strong><br />
                {this.state.revenue !== 0 ? '$' + this.state.revenue : '-'}
              </p>
              <p>
                <strong>Keywords </strong><br />
                {this.state?.keywords?.keywords.map((keyword) =>
                  <Button compact size='mini'>
                    {keyword.name}
                  </Button>)}
              </p>
            </section>
          </div>
        </div>
      </>
    )
  }
}
export default MovieDetails;
