import React from "react";
import { Grid } from 'semantic-ui-react';
import './moviesList.css';
import { MovieDiscoverDto } from './../../../models/MovieDiscoverDto';
import { posterUrl } from '../../../configuration/configuration';
import defaultMovie from '../../../assets/img/glyphicons-basic-38-picture-grey.svg';

type MoviesListProps = {
  movies: Array<MovieDiscoverDto>
}

export default function MoviesList(props: MoviesListProps) {
  return (
    <div className="moviesList">
      <div className="allMovies">
        <Grid columns={4} container>
          {props.movies.map((movie) => (
            <Grid.Column>
              <div className="film-container" key={movie.id}>
                <img
                  src={`${posterUrl}/w185/${movie.poster_path}`}
                  onError={(e: any) => {
                    if (e.target.src !== defaultMovie) {
                        e.target.src = defaultMovie;
                    }
                }}
                  alt="movieImage" />
                {movie.title}
              </div>
            </Grid.Column>
          ))}
        </Grid>

      </div>
    </div>
  );
}
