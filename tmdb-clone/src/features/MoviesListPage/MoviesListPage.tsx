import React, { Component } from "react";
import DiscoverMoviesService from './../../services/DiscoverMoviesService';
import { MovieDiscoverDto } from './../../models/MovieDiscoverDto';
// import SearchMovies from './SearchMovies';
// import MoviesOrdering from './MoviesOrdering';
import MoviesList from './MoviesList/MoviesList';
import MoviesOrdering from './MoviesOrdering/MoviesOrdering';
import SearchMovies, { SearchMoviesState } from './SearchMovies/SearchMovies';
import { Button, Grid } from 'semantic-ui-react';
import './moviesListPage.css';

type MoviesListPageProps = {

}
type MoviesListPageState = {
  movies: Array<MovieDiscoverDto>;
  total: number;
  filter: SearchMoviesState;
  orderBy: string;
  page: number;
}
class MoviesListPage extends Component<MoviesListPageProps, MoviesListPageState>{
  discoverMoviesService: DiscoverMoviesService;
  constructor(props: MoviesListPageProps) {
    super(props);
    this.discoverMoviesService = new DiscoverMoviesService();
    this.state = {
      movies: [],
      total: 0,
      filter: {
        activeIndex: 0,
        isAllReleases: true,
        releaseTypes: new Set([1, 2, 3, 4, 5, 6]),
        isAllCountries: true,
        releaseCountry: null,
        certification: new Set([]),
        selectedLanguage: null,
        voteAverageMin: 0,
        voteAverageMax: 10,
        voteCountMin: 0,
        movieDurationMin: 0,
        movieDurationMax: 400,
        releaseDateFrom: '',
        releaseDateTo: '',
        genres: new Set([]),
      },
      orderBy: 'popularity.desc',
      page: 1,
    };
  }

  async componentDidMount() {
    await this.updateMovies(this.state.filter);
  }

  updateMovies = async (filter: SearchMoviesState) => {
    let searchingMovies = await this.discoverMoviesService.findMovies(this.state.filter, this.state.orderBy, this.state.page);
    this.setState({
      movies: searchingMovies.results,
      total: searchingMovies.total_results,
      filter: filter,
      page: 1,
    });
  }

  handleSearchClicked = async (filter: SearchMoviesState) => {
    await this.updateMovies(filter);
  }

  handleOrderChanged = (value: string) => {
    this.setState({
      orderBy: value,
    });
  }

  handleLoadMoreClicked = async () => {
    const nextPage = this.state.page + 1;
    const searchingMovies = await this.discoverMoviesService.findMovies(this.state.filter, this.state.orderBy, nextPage);
    const allMovies = this.state.movies.concat(searchingMovies.results);
    this.setState({
      page: nextPage,
      movies: allMovies,
      total: searchingMovies.total_results,
    });
  }

  render = () => {
    return (
      <>
        <div className="container">
          <Grid columns={2}>
            <Grid.Column width={4}>
              <MoviesOrdering
                onOrderChanged={this.handleOrderChanged}
                selectedValue={this.state.orderBy}
              // onSortByChanged={this.handleSortByChanged}
              // onSortOrderChanged={this.handleSortOrderChanged}
              />
              <SearchMovies
                onSearchClicked={this.handleSearchClicked}
                initialFilter={this.state.filter}
              />
            </Grid.Column>
            <Grid.Column width={12}>
              <MoviesList
                movies={this.state.movies} />
              <Button
                className='load-more'
                secondary
                fluid
                onClick={this.handleLoadMoreClicked}
              >Load more</Button>
            </Grid.Column>

          </Grid>
        </div>
      </>
    );
  }
}
export default MoviesListPage;
