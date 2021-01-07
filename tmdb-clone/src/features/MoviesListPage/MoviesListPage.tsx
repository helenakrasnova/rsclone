import React, { Component } from "react";
import DiscoverMoviesService from './../../services/DiscoverMoviesService';
import { MovieDiscoverDto } from './../../models/MovieDiscoverDto';
// import SearchMovies from './SearchMovies';
// import MoviesOrdering from './MoviesOrdering';
import MoviesList from './MoviesList';

type MoviesListPageProps = {

}
type MoviesListPageState = {
  movies: Array<MovieDiscoverDto>;
  total: number;
}
class MoviesListPage extends Component<MoviesListPageProps, MoviesListPageState>{
  discoverMoviesService: DiscoverMoviesService;

  constructor(props: MoviesListPageProps) {
    super(props);
    this.discoverMoviesService = new DiscoverMoviesService();
    this.state = {
      movies: [],
      total: 0,
    };
  }

  async componentDidMount() {
    await this.updateMovies();
  }

  updateMovies = async () => {
    let searchingMovies = await this.discoverMoviesService.findMovies();
    this.setState({
      movies: searchingMovies.results,
      total: searchingMovies.total_results,
    });
  }

  render = () => {
    return (
      <React.Fragment>
        {/* <SearchMovies
          onSearchClicked={this.handleSearchClicked} />
        <MoviesOrdering
          total={this.state.total}
          onSortByChanged={this.handleSortByChanged}
          onSortOrderChanged={this.handleSortOrderChanged} /> */}
        <MoviesList
          movies={this.state.movies} />
      </React.Fragment>
    );
  }
}
export default MoviesListPage;
