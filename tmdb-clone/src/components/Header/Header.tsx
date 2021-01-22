import React, { Component } from 'react';
import './header.css';
import logo from '../../assets/img/logo.svg';
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
// import { withRouter } from "react-router";
import { Button, Icon, Popup, Search } from 'semantic-ui-react';
import SearchService from './../../services/SearchService';
import { SearchResponseDto } from '../../models/SearchResponseDto';
import AuthenticationService from './../../services/AuthenticationService';
import AccountService from './../../services/AccountService';

type HeaderProps = {

}
type HeaderState = {
  isSearchOn: boolean;
  searchingValue: string;
  results: SearchResponseDto | null;
}

class Header extends Component<RouteComponentProps<HeaderProps>, HeaderState> {
  searchService: SearchService;
  authenticationService: AuthenticationService;
  accountService: AccountService;
  constructor(props: RouteComponentProps<HeaderProps>) {
    super(props);
    this.state = {
      isSearchOn: false,
      searchingValue: '',
      results: null,
    }
    this.authenticationService = new AuthenticationService();
    this.accountService = new AccountService();
    this.searchService = new SearchService();
  }

  // async componentDidMount() {
  //   await this.updateSearchResults();
  // }

  updateSearchResults = async () => {
    let searchingResults = await this.searchService.findSearchResults(this.state.searchingValue);
    this.setState({
      results: searchingResults,
    });
  }

  handleSearchClicked = () => {
    this.setState({
      isSearchOn: !this.state.isSearchOn,
    });
  }

  handleClearSearchClick = () => {
    this.setState({
      searchingValue: '',
    });
  }

  handleSearchChange = () => {

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

  getInitials = () => {
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

  render = () => {
    return (
      <>
        <div className="header" >
          <div className="header-container">
            <nav className="navigation">
              <img src={logo} className="header-logo" alt="logo" />
              <Link to="/"><span className="navigation-link">Movies</span></Link>
              <Link to="/person"><span className="navigation-link">People</span></Link>
            </nav>
            <div className="nav-account">
              {this.authenticationService.isAuthenticated() ?
                <Popup
                  on='click'
                  position='bottom center'
                  pinned
                  style={{ backgroundColor: '#e0e1e2', }}
                  trigger={
                  <button className="header-userIcon">{this.getInitials()?.toUpperCase()}</button>
                  }>
                  <Popup.Content>
                    <Button fluid link icon='user outline'
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
        <div>

          {/* {this.authenticationService.isAuthenticated() ?
            (<div>
              <span className="hello">
                Hello,  !</span>
              <Button onClick={() => {
                this.authenticationService.logOut();
                this.props.history.push('/login');
              }}>logOut</Button>
            </div>)
            : (<Link to="/login">
              <button className="login">login</button>
            </Link>)} */}

          {this.state.isSearchOn ?
            <Search
              input={{ fluid: true }}
              icon={
                <Icon
                  name='close'
                  link
                  onClick={this.handleClearSearchClick}
                />}
              fluid={true}
              // onResultSelect={(e, data) =>
              //   dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
              // }
              onSearchChange={this.handleSearchChange}
            // results={results}
            // value={value}
            /> : ''}

        </div>
      </>
    );
  }

}
export default withRouter(Header);
