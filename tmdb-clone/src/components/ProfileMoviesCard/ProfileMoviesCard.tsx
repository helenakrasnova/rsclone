import React, { Component } from 'react';
import defaultMovie from './../../assets/img/glyphicons-basic-38-picture-grey.svg';
import { posterUrl } from './../../configuration/configuration';
import './profileMoviesCard.css';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { RatingDto } from './../../models/Account/RatingResponseDto';

type ProfileMoviesCardProps = {
  movie: RatingDto;
}

export default function ProfileMoviesCard(props: ProfileMoviesCardProps) {
  const { movie } = props;
  return (
    <>
      {/* <Icon name='heart' color='red' size='large' link className='movieCard-like' />
      <Icon name="bookmark" color='red' size='large' link className='movieCard-watchList' /> */}
      <Link to={`/movies/${movie.id}`}>
        <div className="profileMovies-container" key={movie.id}>
          <img
            className='profileMovies-poster'
            src={`${posterUrl}/w185/${movie.poster_path}`}
            onError={(e: any) => {
              if (e.target.src !== defaultMovie) {
                e.target.src = defaultMovie;
              }
            }}
            alt="poster" />
          <div className="profileMovies-description">
            <div className='profileMovies-content'>
              <div className='profileMovies-voting' style={{
                borderColor:
                  movie.vote_average >= 7 ? '#21d07a' :
                    movie.vote_average >= 4 ? '#d2d531' :
                      movie.vote_average > 0 ? '#cb215b' : '#666666'
              }}>{`${movie.vote_average * 10}`}
                <span className="percent">%</span>
              </div>
              <div className="profileMovies-title">
                <div className="profileMovies-heading">{movie.title}</div>
                <div className="profileMovies-release">{movie.release_date}</div>
              </div>
            </div>
            <div className="profileMovies-overview">
              {movie.overview}
            </div>
            <div className="profileMovies-release">
              {movie.rating ? <><span className="profileMovies-rating">{movie.rating}</span> Your rating</> : ''}
            </div>
          </div>
        </div>
      </Link >
    </>
  )
}
