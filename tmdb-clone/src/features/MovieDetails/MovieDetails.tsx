import React, { Component } from 'react';
import { Link, RouteChildrenProps, RouteComponentProps, RouteProps } from 'react-router-dom';
import MovieDetailsService from './../../services/MovieDetailsService';
import { MovieDetailsViewModel } from './../../models/MovieDetails/ViewModels/MovieDetailsViewModel';
import './movieDetails.css';
import defaultMovie from '../../assets/img/glyphicons-basic-38-picture-grey.svg';
import { Icon, Button, Embed } from 'semantic-ui-react';

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

  render = () => {
    return (
      <>
        <div
          className="movie-bg"
          style={{ backgroundImage: `url(https://www.themoviedb.org/t/p/original${this.state.backdrop_path})` }}>
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
                <span className="movie-year"> ({this.state.release_date?.substr(0, 4)})</span>
                <div className="facts">
                  <span className="release-date">{this.state.release_date}</span>
                  <span>{this.state.genres?.map((genre) => <span key={genre.id}> <Icon name='circle outline' size='small' /> {genre.name}  </span>)}</span>
                  <span> <Icon name='circle outline' size='small' /> {this.state.runtime}min</span>
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
                    }}>{this.state.vote_average * 10}
                      <span className="percent">%</span>
                    </div>
                    <span>User <br /> Score</span>
                  </div>
                  {/* <Button color='red' circular icon='heart' /> */}
                  <Icon name='heart' color='red' link size='large' className='movie_inform-like' />
                  <Icon name="bookmark" link color='red' size='large' className='movie_inform-mark' />
                  <Icon name="star" link color='red' size='large' className='movie_inform-star' />
                  <Button compact={true} color='youtube'>
                    <Icon name='youtube play' />
                  Play trailer
                  </Button>
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
                    <div className="review-user__avatar" style={{ backgroundImage: `url(https://www.themoviedb.org/t/p/w185${review.author_details.avatar_path})` }}></div>
                    <div>A review by <strong>{review.author_details.username}</strong></div>
                    <div>Written by <strong>{review.author_details.username}</strong> on {review.created_at}</div>
                    {review.content}
                  </div>))}
              </div>
            </section> : `We don't have any reviews for this movie`}

            <h3>Media</h3>
            {(this.state.videos?.results && this.state.videos?.results.length > 0) ? <section className="trailers">
              <Embed
                key={this.state.videos?.results[0].id}
                id={this.state.videos?.results[0].key}
                source='youtube' />
            </section> : `We don't have any trailers for this movie`}
            <h3>Recommendations</h3>
            <section className="movieRecommendations">
              {this.state.recommendations?.map((recommendation) => (
                <div className="recommendation" key={recommendation.id}>
                  <Link to={`/movies/${recommendation.id}`}>
                    <div
                      className='recommendation-inform'
                      style={{ backgroundImage: `url(https://www.themoviedb.org/t/p/w342${recommendation.poster_path})` }}>
                    </div>
                    <div className="movieInform-name">{recommendation.title}</div>
                    <div className="movieInform-character" >{recommendation.vote_average * 10}%</div>
                  </Link>
                </div>))}
            </section>
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
               ${this.state.budget}
              </p>
              <p>
                <strong>Revenue </strong><br />
                ${this.state.revenue}
              </p>
              <p>
                <strong>Keywords </strong><br />
              </p>
            </section>
          </div>
        </div>









      </>
    )
  }
}
export default MovieDetails;
