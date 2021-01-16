import React, { Component } from 'react';
import './popularPeoplePage.css';
import PopularPeopleService from './../../services/PopularPeopleService';

import { Grid, Button } from 'semantic-ui-react';


import { PopularPeoplePageDto } from './../../models/PopularPeople/PopularPeoplePageResponseDto';
import { Link } from 'react-router-dom';
type PopularPeoplePageProps = {

}
type PopularPeoplePageState = {
  page: number;
  persons: Array<PopularPeoplePageDto>;
  total: number;
}
class PopularPeoplePage extends Component<PopularPeoplePageProps, PopularPeoplePageState> {
  popularPeopleService: PopularPeopleService;
  constructor(props: PopularPeoplePageProps) {
    super(props);
    this.popularPeopleService = new PopularPeopleService();
    this.state = {
      page: 1,
      persons: [],
      total: 0,
    }
  }

  async componentDidMount() {
    await this.updatePersons();
  }

  updatePersons = async () => {
    let searchingPersons = await this.popularPeopleService.findPersons(this.state.page);
    this.setState({
      persons: searchingPersons.results,
    });
  }

  handleLoadMoreClicked = async () => {
    const nextPage = this.state.page + 1;
    const searchingPersons = await this.popularPeopleService.findPersons(nextPage);
    const allPersons = this.state.persons.concat(searchingPersons.results);
    this.setState({
      page: nextPage,
      persons: allPersons,
      total: searchingPersons.total_results
    });
  }

  render = () => {
    return (
      <React.Fragment>
        <h3 className="personPopular-heading">Popular people</h3>
        <div className="personPopular-container">
            {this.state.persons.map((person) => (
              <Link to={`/person/${person.id}`}>
                <div key={person.id} className="personPopular-card">
                  <div
                    className="personPopular-image"
                    style={{ backgroundImage: `url(https://www.themoviedb.org/t/p/w300${person.profile_path})` }}
                  ></div>
                  <div className="personPopular-inform">
                    <div className="personPopular-name">{person.name}</div>
                    <div className="personPopular-popularFor">{person.known_for.map((movie) => (<span>{movie.title}</span>))}</div>
                  </div>
                </div>
              </Link>
            ))}
            <Button
              className='more-people'
              secondary
              fluid
              onClick={this.handleLoadMoreClicked}
            >More popular people</Button>
        </div>
      </React.Fragment>
    )
  }
}
export default PopularPeoplePage;
