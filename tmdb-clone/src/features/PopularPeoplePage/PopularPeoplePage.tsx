import React, { Component } from 'react';
import './popularPeoplePage.css';
import PopularPeopleService from './../../services/PopularPeopleService';
import { Grid, Button } from 'semantic-ui-react';
import { PopularPeoplePageDto } from './../../models/PopularPeople/PopularPeoplePageResponseDto';
import { Link } from 'react-router-dom';
import defaultMovie from './../../assets/img/glyphicons-basic-38-picture-grey.svg'
import { posterUrl } from './../../configuration/configuration';
import Preloader from './../../components/Preloader/Preloader';
type PopularPeoplePageProps = {

}
type PopularPeoplePageState = {
  page: number;
  persons: Array<PopularPeoplePageDto>;
  total: number;
  loading: boolean;
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
      loading: false,
    }
  }

  async componentDidMount() {
    await this.updatePersons();
  }

  updatePersons = async () => {
    this.setState({
      loading: true,
    });
    let searchingPersons = await this.popularPeopleService.findPersons(this.state.page);
    this.setState({
      persons: searchingPersons.results,
      loading: false,
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
    if (this.state.loading === true) {
      return (<Preloader />)
    }
    else {
      return (
        <React.Fragment>
          <h3 className="personPopular-heading">Popular people</h3>
          <div className="personPopular-container">
            {this.state.persons.map((person) => (
              <Link to={`/person/${person.id}`}>
                <div key={person.id} className="personPopular-card">
                  <div
                    className="personPopular-image"
                    style={{
                      backgroundImage: person.profile_path ?
                        `url(${posterUrl}/w300${person.profile_path})` :
                        `url(${defaultMovie})`
                    }}
                  ></div>
                  <div className="personPopular-inform">
                    <div className="personPopular-name">{person.name}</div>
                    <div className="personPopular-popularFor">
                      <p className="personPopular-popularFor-text">{person.known_for.map((movie) => (movie.title ? movie.title : movie.name)).join(', ')}</p></div>
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
      );
    }
  }
}
export default PopularPeoplePage;
