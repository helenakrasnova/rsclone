import React, { Component } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import {
  Table, Icon, Image, Modal,
} from 'semantic-ui-react';
import PersonPageService from '../../services/PersonPageService';
import './personPage.css';
import { PersonDetailsViewModel } from '../../models/PersonDetails/ViewModels/PersonDetailsViewModel';
import defaultMovie from '../../assets/img/glyphicons-basic-38-picture-grey.svg';
import { posterUrl } from '../../configuration/configuration';
import Preloader from '../../components/Preloader/Preloader';

type PersonPageProps = {
  id: string;
};

type PersonPageState = {
  model: PersonDetailsViewModel;
  loading: boolean;
  imageCount: number;
};

class PersonPage extends Component<RouteComponentProps<PersonPageProps>, PersonPageState> {
  personPageService: PersonPageService;

  id: string;

  constructor(props: RouteComponentProps<PersonPageProps>) {
    super(props);
    this.id = props.match.params.id;
    this.personPageService = new PersonPageService();
    this.state = {
      model: {},
      imageCount: 0,
      loading: false,
    };
  }

  componentDidMount = async () => {
    await this.updatePage(this.id);
  };

  async componentDidUpdate(prevProps: RouteComponentProps<PersonPageProps>) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      await this.updatePage(this.props.match.params.id);
    }
  }

  updatePage = async (id: string) => {
    this.setState({
      loading: true,
    });
    const person = await this.personPageService.getPerson(id);
    this.setState({
      model: person,
      loading: false,
    });
  };

  onNextImageClicked = (): void => {
    if (this.state.model.images?.profiles === undefined || this.state.imageCount === undefined) {
      return;
    }
    const nextPage = this.state.imageCount + 1;
    if (this.state.imageCount === this.state.model.images?.profiles.length - 1) {
      this.setState({
        imageCount: 0,
      });
    } else {
      this.setState({
        imageCount: nextPage,
      });
    }
  };

  onPrevImageClicked = (): void => {
    if (this.state.model.images?.profiles === undefined || this.state.imageCount === undefined) {
      return;
    }
    if (this.state.imageCount === 0) {
      this.setState({
        imageCount: this.state.model.images?.profiles.length - 1,
      });
    } else {
      const prevPage = this.state.imageCount - 1;
      this.setState({
        imageCount: prevPage,
      });
    }
  };

  getAge = (): number | null => {
    if (this.state.model.birthday && this.state.model.deathday) {
      return new Date(this.state.model.deathday).getFullYear()
        - new Date(this.state.model.birthday).getFullYear();
    } if (this.state.model.birthday && !this.state.model.deathday) {
      return new Date().getFullYear() - new Date(this.state.model.birthday).getFullYear();
    }
    return null;
  };

  render = () => {
    if (this.state.loading === true) {
      return (<Preloader />);
    }

    return (
      <div className="personInform-container">
        <div className="personInform-firstColumn">
          <Modal
            size="mini"
            closeIcon
            style={{ textAlign: 'center' }}
            trigger={(
              <section
                className="personInform-poster"
                style={{
                  backgroundImage: this.state.model.profile_path
                    ? `url(${posterUrl}/w342${this.state.model.profile_path})`
                    : `url(${defaultMovie})`,
                }}
              />
            )}
          >
            <Modal.Header>
              <Icon onClick={this.onPrevImageClicked} link name="arrow left" />
              {this.state.model.name}
              <Icon onClick={this.onNextImageClicked} link name="arrow right" />
            </Modal.Header>
            <Modal.Content image>
              <Image
                size="medium"
                centered
                src={`${posterUrl}/w300${this.state.model.images?.profiles[this.state.imageCount
                  ? this.state.imageCount : 0]?.file_path}`}
              />
            </Modal.Content>
          </Modal>

          <h3>Personal Info</h3>
          <section className="posterInform-facts">
            <div>
              <h4>Known For</h4>
              <div>{this.state.model.known_for_department}</div>
              <h4>Gender</h4>
              <div>{this.state.model.gender === 2 ? 'Male' : 'Female'}</div>
              <h4>Birthday</h4>
              <div>
                {this.state.model.birthday}
                {' '}
                (
                {this.getAge() ? `${this.getAge()} years old` : ''}
                )
              </div>
              <h4>Place of Birth</h4>
              <div>{this.state.model.place_of_birth}</div>
              {this.state.model.deathday ? <h4>Deathday</h4> : ''}
              {this.state.model.deathday ? (
                <div>
                  {this.state.model.deathday}
                  {' '}
                  (
                  {this.getAge() ? `${this.getAge()} years old` : ''}
                  )
                </div>
              ) : ''}
            </div>
            <div>
              <h4>Also Known As</h4>
              {this.state.model.also_known_as?.map(
                (item) => (<div key={item}>{item}</div>),
              )}
            </div>
          </section>
        </div>
        <div className="personInform-secondColumn">
          <section className="personInform-title">
            <h1 className="personInform-name">
              {this.state.model.name}
              <a href={`https://www.imdb.com/name/${this.state.model.imdb_id}`}>
                <Icon name="imdb" link size="small" />
              </a>
            </h1>
          </section>
          <section className="personInform-biography">
            <h3>Biography</h3>
            <div className="personInform-biographyText">{this.state.model.biography}</div>
          </section>

          <h3>Known For</h3>
          {(this.state.model.credits?.knownFor && this.state.model.credits?.knownFor.length > 0)
            ? (
              <section className="personInform-knownFor">
                {this.state.model.credits?.knownFor.map((movie) => (
                  <div className="knownFor-card" key={movie.id}>
                    <Link to={`/movies/${movie.id}`}>
                      <div
                        className="knownFor-image-container"
                        style={{
                          backgroundImage: movie.poster_path
                            ? `url(${posterUrl}/w154${movie.poster_path})`
                            : `url(${defaultMovie})`,
                        }}
                      />
                      <div className="knownFor-name">{movie.title}</div>
                      <div className="knownFor-character">{movie.vote_average > 0 ? `${movie.vote_average * 10}%` : 'NR'}</div>
                    </Link>
                  </div>
                ))}
              </section>
            ) : 'We don\'t have any recommendations for this movie'}

          <section className="personInform-credits">
            <h3>{this.state.model.known_for_department}</h3>
            <Table className="personInform-table">
              <Table.Body>
                {this.state.model.credits?.cast.map((item) => (
                  <Table.Row key={item.id}>
                    <Table.Cell width={1}>
                      <Link to={`/movies/${item.id}`}>
                        <span className="personInform-table">
                          {item.release_date !== '3000-1-1' ? item.release_date?.slice(0, 4) : '—'}
                        </span>
                      </Link>
                    </Table.Cell>
                    <Table.Cell width={1}>
                      <Link to={`/movies/${item.id}`}>
                        <span className="personInform-table">
                          {item.vote_average !== 0 ? `${item.vote_average * 10}%` : '—'}
                        </span>
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/movies/${item.id}`}>
                        <span className="personInform-table">
                          <b>{item.title}</b>
                          <span className="personInform-character">{item.character ? ` as ${item.character}` : ''}</span>
                        </span>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </section>
        </div>
      </div>
    );
  };
}

export default PersonPage;
