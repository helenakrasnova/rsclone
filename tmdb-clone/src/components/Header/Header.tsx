import React, { Component } from 'react';
import './header.css';
import logo from '../../assets/img/logo.svg';
import { Link } from "react-router-dom";
// import { withRouter } from "react-router";
import { Icon, Search } from 'semantic-ui-react';
import SearchService from './../../services/SearchService';
import { SearchResponseDto } from '../../models/SearchResponseDto';

type HeaderProps = {

}
type HeaderState = {
  isSearchOn: boolean;
  searchingValue: string;
  results: SearchResponseDto | null;
}

class Header extends Component<HeaderProps, HeaderState> {
  searchService: SearchService;
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      isSearchOn: false,
      searchingValue: '',
      results: null,
    }
    this.searchService = new SearchService();
  }


  async componentDidMount() {
    await this.updateSearchResults();
  }

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

  render = () => {
    return (
      <>
        <div className="header" >
          <div className="header-container">
            <img src={logo} className="header-logo" alt="logo" />
            <Link to="/">Movies</Link>
            <Link to="/person">People</Link>
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
          {/* <div className="App-header headerLogin">
        {isAuthenticated ?
          (<>
            <div className="hello">
              Hello, {authService.userName} !
                        </div>
            <button
              className="logout"
              onClick={() => {
                authService.logOut();
                props.history.push('/login');
              }}>
              logOut
                        </button>
          </>)
          : (<Link to="/login">
            <button className="login">login</button>
          </Link>)}
      </div> */}
        </div>
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
      </>
    );
  }

}
export default Header;
