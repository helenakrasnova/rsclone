import React, { Component } from "react";
import DiscoverMoviesService from './../../services/DiscoverMoviesService';
import { MovieDiscoverDto } from './../../models/MovieDiscoverDto';
// import SearchMovies from './SearchMovies';
// import MoviesOrdering from './MoviesOrdering';
import MoviesList from './MoviesList/MoviesList';
import MoviesOrdering from './MoviesOrdering/MoviesOrdering';
import SearchMovies from './SearchMovies/SearchMovies';
import { Container, Grid } from 'semantic-ui-react';


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
        <Container>
        <Grid columns={2}>
          <Grid.Column width={4}>
            <MoviesOrdering
            // total={this.state.total}
            // onSortByChanged={this.handleSortByChanged}
            // onSortOrderChanged={this.handleSortOrderChanged}
            />
            <SearchMovies
            //  onSearchClicked={this.handleSearchClicked}
            />
          </Grid.Column>
          <Grid.Column width={12}>
            <MoviesList
              movies={this.state.movies} />
          </Grid.Column>
        </Grid>
        </Container>
      </React.Fragment>
    );
  }
}
export default MoviesListPage;
