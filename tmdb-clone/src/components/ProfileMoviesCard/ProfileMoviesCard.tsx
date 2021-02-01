import React from 'react';
import { Link } from 'react-router-dom';
import defaultMovie from '../../assets/img/glyphicons-basic-38-picture-grey.svg';
import { posterUrl } from '../../configuration/configuration';
import './profileMoviesCard.css';
import { RatingDto } from '../../models/Account/RatingResponseDto';
import getRatingColor, { fallbackImage } from '../../common/utils';

type ProfileMoviesCardProps = {
  movie: RatingDto;
};

export default function ProfileMoviesCard(props: ProfileMoviesCardProps) {
  const { movie } = props;
  const dateFormatter = new Intl.DateTimeFormat('ru');
  return (
    <Link to={`/movies/${movie.id}`}>
      <div className="profileMovies-container">
        <img
          className="profileMovies-poster"
          src={`${posterUrl}/w185/${movie.poster_path}`}
          onError={(e) => fallbackImage(e, defaultMovie)}
          alt="poster"
        />
        <div className="profileMovies-description">
          <div className="profileMovies-content">
            <div
              className="profileMovies-voting"
              style={{
                borderColor: getRatingColor(movie.vote_average),
              }}
            >
              {`${movie.vote_average * 10}`}
              <span className="percent">%</span>
            </div>
            <div className="profileMovies-title">
              <div className="profileMovies-heading">{movie.title}</div>
              <div className="profileMovies-release">
                {movie.release_date ? dateFormatter.format(new Date(movie.release_date)) : ''}
              </div>
            </div>
          </div>
          <div className="profileMovies-overview">{movie.overview}</div>
          <div className="profileMovies-release">
            {movie.rating ? (
              <>
                <span className="profileMovies-rating">{movie.rating}</span>
                {' '}
                Your rating
              </>
            ) : ''}
          </div>
        </div>
      </div>
    </Link>
  );
}
