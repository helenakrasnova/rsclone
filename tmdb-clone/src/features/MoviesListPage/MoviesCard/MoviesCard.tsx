import React, { Component } from 'react';
import { posterUrl } from '../../../configuration/configuration';
import defaultMovie from '../../../assets/img/glyphicons-basic-38-picture-grey.svg';
import { MovieDiscoverDto } from './../../../models/MovieDiscoverDto';
import './moviesCard.css';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
type MoviesCardProps = {
  movie: MovieDiscoverDto
}
export default function MoviesCard(props: MoviesCardProps) {
  const { movie } = props;
  const formatter = new Intl.DateTimeFormat("ru");
  return (
    <>
      <Link to={`/movies/${movie.id}`}>
        <div className="film-container" key={movie.id}>
          <img
            className='film-image'
            src={`${posterUrl}/w300/${movie.poster_path}`}
            onError={(e: any) => {
              if (e.target.src !== defaultMovie) {
                e.target.src = defaultMovie;
              }
            }}
            alt="movieImage" />
          <div className='film-voting' style={{
            borderColor:
              movie.vote_average >= 7 ? '#21d07a' :
                movie.vote_average >= 4 ? '#d2d531' :
                  movie.vote_average > 0 ? '#cb215b' : '#666666'
          }}>
            {movie.vote_average !== 0 ?
              <>
                {movie.vote_average * 10}
                <span className="percent">%</span>
              </> :
              'NR'}
          </div>
          <div className="film-heading">
            <div className="film-heading-title">{movie.title}</div>
            <div className="film-release">
              {formatter.format(new Date(movie.release_date))}
            </div>
          </div>

        </div>
      </Link >
    </>
  )
}
