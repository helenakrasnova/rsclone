import React, { Component } from 'react';
import './popularPeoplePage.css';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PopularPeopleService from '../../services/PopularPeopleService';
import { PopularPeoplePageDto } from '../../models/PopularPeople/PopularPeoplePageResponseDto';
import defaultMovie from '../../assets/img/glyphicons-basic-38-picture-grey.svg';
import { posterUrl } from '../../configuration/configuration';
import Preloader from '../../components/Preloader/Preloader';

type PopularPeoplePageProps = {

};

type PopularPeoplePageState = {
  page: number;
  persons: Array<PopularPeoplePageDto>;
  loading: boolean;
};

class PopularPeoplePage extends Component<PopularPeoplePageProps, PopularPeoplePageState> {
  popularPeopleService: PopularPeopleService;

  constructor(props: PopularPeoplePageProps) {
    super(props);
    this.popularPeopleService = new PopularPeopleService();
    this.state = {
      page: 1,
      persons: [],
      loading: false,
    };
  }

  async componentDidMount() {
    await this.updatePersons();
  }

  updatePersons = async () => {
    this.setState({
      loading: true,
    });
    const searchingPersons = await this.popularPeopleService.findPersons(this.state.page);
    this.setState({
      persons: searchingPersons.results,
      loading: false,
    });
  };

  handleLoadMoreClicked = async () => {
    const nextPage = this.state.page + 1;
    const searchingPersons = await this.popularPeopleService.findPersons(nextPage);
    const allPersons = this.state.persons.concat(searchingPersons.results);
    this.setState({
      page: nextPage,
      persons: allPersons,
    });
  };

  render = () => {
    if (this.state.loading === true) {
      return (<Preloader />);
    }

    return (
      <>
        <h3 className="personPopular-heading">Popular people</h3>
        <div className="personPopular-container">
          {this.state.persons.map((person) => (
            <Link key={person.id} to={`/person/${person.id}`}>
              <div className="personPopular-card">
                <div
                  className="personPopular-image"
                  style={{
                    backgroundImage: person.profile_path
                      ? `url(${posterUrl}/w300${person.profile_path})`
                      : `url(${defaultMovie})`,
                  }}
                />
                <div className="personPopular-inform">
                  <div className="personPopular-name">{person.name}</div>
                  <div className="personPopular-popularFor">
                    <p className="personPopular-popularFor-text">{person.known_for.map((movie) => (movie.title ? movie.title : movie.name)).join(', ')}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <Button
            className="more-people"
            secondary
            fluid
            onClick={this.handleLoadMoreClicked}
          >
            More popular people
          </Button>
        </div>
      </>
    );
  };
}

export default PopularPeoplePage;
