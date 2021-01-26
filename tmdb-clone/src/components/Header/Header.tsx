import React, { Component, ReactElement } from 'react';
import './header.css';
import logo from '../../assets/img/logo.svg';
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
// import { withRouter } from "react-router";
import { Button, Icon, Popup, Search, SearchProps, SearchResultData } from 'semantic-ui-react';
import SearchService from './../../services/SearchService';
import { SearchResult } from '../../models/SearchResponseDto';
import AuthenticationService from './../../services/AuthenticationService';
import AccountService from './../../services/AccountService';
import { posterUrl } from './../../configuration/configuration';
import defaultMovie from './../../assets/img/glyphicons-basic-38-picture-grey.svg';

type HeaderProps = {

}

type HeaderState = {
  isSearchOn: boolean;
  searchState: SearchState;
}

type SearchResultModel = {
  title: string;
  description: string;
  image: string;
  id: number;
  category?: string;
}

type SearchCategoryModel = {
  name: string;
  results: Array<SearchResultModel>;
}

type SearchModel = {
  movies: SearchCategoryModel;
  persons: SearchCategoryModel;
}

type SearchState = {
  loading: boolean;
  results?: SearchModel;
  value?: string;
}

const initialState: HeaderState = {
  isSearchOn: false,
  searchState: {
    loading: false,
    results: {
      movies: {
        name: 'movies',
        results: [],
      },
      persons: {
        name: 'persons',
        results: [],
      }
    },
    value: '',
  },
}

class Header extends Component<RouteComponentProps<HeaderProps>, HeaderState> {
  searchService: SearchService;
  authenticationService: AuthenticationService;
  accountService: AccountService;
  constructor(props: RouteComponentProps<HeaderProps>) {
    super(props);
    this.state = initialState;
    this.authenticationService = new AuthenticationService();
    this.accountService = new AccountService();
    this.searchService = new SearchService();
  }

  handleSearchClicked = () => {
    this.setState({
      isSearchOn: !this.state.isSearchOn,
    });
  }

  handleClearSearchClick = () => {
    this.setState({
      searchState: {
        value: '',
        loading: false,
      }
    });
  }

  handleSearchChange = async (event: React.MouseEvent<HTMLElement>, data: SearchProps) => {
    this.setState({
      searchState: {
        loading: true,
        value: data.value,
      }
    });
    if (data.value) {
      const searchResult = await this.searchService.findSearchResults(data.value);
      const moviesResult: SearchResultModel[] = searchResult.results.filter((item) => item.media_type === 'movie').map((item: SearchResult) => {
        let model: SearchResultModel = {
          description: item.overview,
          title: item.title,
          image: item.poster_path ? `${posterUrl}/w92${item.poster_path}` : defaultMovie,
          id: item.id,
          category: 'movies'
        }
        return model;
      });
      const personsResult: SearchResultModel[] = searchResult.results.filter((item) => item.media_type === 'person').map((item: SearchResult) => {
        let model: SearchResultModel = {
          description: item.known_for_department,
          title: item.name,
          image: item.profile_path ? `${posterUrl}/w185${item.profile_path}` : defaultMovie,
          id: item.id,
          category: 'person'
        }
        return model;
      });
      this.setState({
        searchState: {
          loading: false,
          results: {
            movies: {
              name: 'movies',
              results: moviesResult,
            },
            persons: {
              name: 'persons',
              results: personsResult,
            }
          },
          value: data.value,
        },
      });
    }
  }

  handleLogoutClicked = () => {
    this.authenticationService.logOut();
    this.props.history.push('/login');
  }

  handleRatingsClicked = () => {
    const json = localStorage.getItem('accountDetailsKey');
    if (json) {
      const accountDetailsValue = JSON.parse(json);
      const page = 1;
      this.accountService.getRatings(accountDetailsValue.id, page);
      this.props.history.push(`/u/${accountDetailsValue.username}/ratings`);
    }
  }

  handleWatchlistClicked = () => {
    const json = localStorage.getItem('accountDetailsKey');
    if (json) {
      const accountDetailsValue = JSON.parse(json);
      const page = 1;
      this.accountService.getWatchList(accountDetailsValue.id, page);
      this.props.history.push(`/u/${accountDetailsValue.username}/watchlist`);
    }
  }

  handleViewProfileClicked = () => {
    const json = localStorage.getItem('accountDetailsKey');
    if (json) {
      const accountDetailsValue = JSON.parse(json);
      this.props.history.push(`/u/${accountDetailsValue.username}`);
    }
  }

  getInitials = (): string | undefined => {
    const json = localStorage.getItem('accountDetailsKey');
    if (json) {
      const accountDetailsValue = JSON.parse(json);
      let name = accountDetailsValue.name;
      if (!name) {
        let username = accountDetailsValue.username;
        return `${username[0]}`;
      }
      let nameArray = name.join(' ');
      if (nameArray.length === 2) {
        return `${nameArray[0][0]}${nameArray[1][0]}`
      } else {
        return `${nameArray[0][0]}`;
      }
    }
  }

  handleSearchResultClicked = (event: React.MouseEvent<HTMLDivElement>, data: SearchResultData) => {
    this.setState(initialState);
    this.props.history.push(`/${data.result.category}/${data.result.id}`);
  }

  render = () => {
    return (
      <>
        <div className="header-component" >
          <div className="header-container">
            <nav className="navigation">
              <img src={logo} className="header-logo" alt="logo" />
              <Link to="/"><span className="navigation-link">Movies</span></Link>
              <Link to="/person"><span className="navigation-link">People</span></Link>
            </nav>
            <div className="nav-account">
              {AuthenticationService.isAuthenticated() ?
                <Popup
                  on='click'
                  position='bottom center'
                  pinned
                  style={{ backgroundColor: '#e0e1e2', }}
                  trigger={
                    <button className="header-userIcon">{this.getInitials()?.toUpperCase()}</button>
                  }>
                  <Popup.Content>
                    <Button fluid link disabled icon='user outline'
                      onClick={this.handleViewProfileClicked}> View profile</Button>
                  </Popup.Content>
                  <Popup.Content>
                    <Button fluid link icon='user outline'
                      onClick={this.handleRatingsClicked}> Ratings</Button>
                  </Popup.Content>
                  <Popup.Content>
                    <Button fluid link icon='user outline'
                      onClick={this.handleWatchlistClicked}> Watchlist</Button>
                  </Popup.Content>
                  <Popup.Content>
                    <Button fluid link disabled icon='user outline' > Favorite</Button>
                  </Popup.Content>
                  <Popup.Content>
                    <Button fluid link icon='user outline' color='blue'
                      onClick={this.handleLogoutClicked} >
                      LogOut
                      </Button>
                  </Popup.Content>
                </Popup>
                :
                <Link to="/login">
                  <div className="navigation-link">Login</div>
                </Link>}
              <div
                onClick={this.handleSearchClicked}
                className="header-search__button">
                <Icon
                  link
                  size='large'
                  color='blue'
                  name={this.state.isSearchOn ? 'close' : 'search'} />
              </div>
            </div>
          </div>
        </div>
        <div >
          {this.state.isSearchOn ?
            <Search
              category
              input={{ fluid: true }}
              value={this.state.searchState.value}
              icon={
                <Icon
                  name='close'
                  link
                  onClick={this.handleClearSearchClick}
                />}
              fluid={true}
              size='big'
              onResultSelect={this.handleSearchResultClicked}
              onSearchChange={this.handleSearchChange}
              results={this.state.searchState.results}
              loading={this.state.searchState.loading}
              showNoResults
            /> : ''}
        </div>
      </>
    );
  }

}
export default withRouter(Header);
