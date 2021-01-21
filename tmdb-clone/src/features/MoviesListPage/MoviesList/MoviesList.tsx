import React from "react";
import { Grid } from 'semantic-ui-react';
import './moviesList.css';
import { MovieDiscoverDto } from './../../../models/MovieDiscoverDto';

import MoviesCard from "../MoviesCard/MoviesCard";

type MoviesListProps = {
  movies: Array<MovieDiscoverDto>
}

export default function MoviesList(props: MoviesListProps) {
  return (
    <div className="moviesList">
      <div className="allMovies">
        <Grid columns={4} doubling mobile={1} tablet={2} computer={12}>
          {props.movies.map((movie) => (
            <Grid.Column  key={movie.id}>
              <MoviesCard  movie={movie}/>
            </Grid.Column>
          ))}
        </Grid>

      </div>
    </div>
  );
}
