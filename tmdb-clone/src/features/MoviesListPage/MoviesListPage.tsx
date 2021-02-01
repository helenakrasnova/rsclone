import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import DiscoverMoviesService from '../../services/DiscoverMoviesService';
import { MovieDiscoverDto } from '../../models/MovieDiscoverDto';
import MoviesList from './MoviesList/MoviesList';
import MoviesOrdering from './MoviesOrdering/MoviesOrdering';
import SearchMovies, { SearchMoviesState } from './SearchMovies/SearchMovies';
import './moviesListPage.css';
import Preloader from '../../components/Preloader/Preloader';

type MoviesListPageProps = {

};
type MoviesListPageState = {
  movies: Array<MovieDiscoverDto>;
  filter: SearchMoviesState;
  orderBy: string;
  page: number;
  loading: boolean;
};
class MoviesListPage extends Component<MoviesListPageProps, MoviesListPageState> {
  discoverMoviesService: DiscoverMoviesService;

  constructor(props: MoviesListPageProps) {
    super(props);
    this.discoverMoviesService = new DiscoverMoviesService();
    this.state = {
      movies: [],
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
      loading: false,
    };
  }

  async componentDidMount() {
    await this.updateMovies(this.state.filter);
  }

  updateMovies = async (filter: SearchMoviesState) => {
    this.setState({
      loading: true,
    });
    const searchingMovies = await this.discoverMoviesService.findMovies(
      filter,
      this.state.orderBy,
      this.state.page,
    );
    this.setState({
      movies: searchingMovies.results,
      filter,
      page: 1,
      loading: false,
    });
  };

  handleSearchClicked = async (filter: SearchMoviesState) => {
    await this.updateMovies(filter);
  };

  handleOrderChanged = (value: string): void => {
    this.setState({
      orderBy: value,
    });
  };

  handleLoadMoreClicked = async () => {
    const nextPage = this.state.page + 1;
    const searchingMovies = await this.discoverMoviesService.findMovies(
      this.state.filter,
      this.state.orderBy,
      nextPage,
    );
    const allMovies = this.state.movies.concat(searchingMovies.results);
    this.setState({
      page: nextPage,
      movies: allMovies,
    });
  };

  render = () => {
    if (this.state.loading === true) {
      return (<Preloader />);
    }

    return (
      <div className="container">

        <div className="moviesList-toggle">
          <MoviesOrdering
            onOrderChanged={this.handleOrderChanged}
            selectedValue={this.state.orderBy}
          />
          <SearchMovies
            onSearchClicked={this.handleSearchClicked}
            initialFilter={this.state.filter}
          />
        </div>
        {this.state.movies.length > 0
          ? (
            <div className="moviesList-list">
              <MoviesList
                movies={this.state.movies}
              />
              <Button
                className="load-more"
                secondary
                fluid
                onClick={this.handleLoadMoreClicked}
              >
                Load more
              </Button>
            </div>
          ) : 'Sorry! Not found...'}
      </div>
    );
  };
}

export default MoviesListPage;
