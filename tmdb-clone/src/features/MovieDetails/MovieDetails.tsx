import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import MovieDetailsService from './../../services/MovieDetailsService';
import { MovieDetailsViewModel } from './../../models/MovieDetails/ViewModels/MovieDetailsViewModel';
type MovieDetailsProps = {
  id: string
}
// type MovieDetailsView = {
//   title: string
// }
class MovieDetails extends Component<MovieDetailsProps, MovieDetailsViewModel> {
  movieDetailsService: MovieDetailsService;
  id: string;
  constructor({ match }: RouteComponentProps<MovieDetailsProps>) {
    super(match.params);

    this.id = match.params.id;
    this.movieDetailsService = new MovieDetailsService();
    this.state = {

    }
  }
  componentDidMount = async () => {
    let film = await this.movieDetailsService.getMovie(this.id);
    this.setState(film);

  }
  render = () => {
    return (
      <React.Fragment>
        {this.state.title}
      </React.Fragment>
    )
  }
}
export default MovieDetails;
