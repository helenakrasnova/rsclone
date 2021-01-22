import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import PersonPageService from '../../services/PersonPageService';
import './personPage.css'
import { PersonDetailsViewModel } from './../../models/PersonDetails/ViewModels/PersonDetailsViewModel';
import { Link } from 'react-router-dom';
import defaultMovie from './../../assets/img/glyphicons-basic-38-picture-grey.svg';
import { Table, Icon, Button, Header, Image, Modal } from 'semantic-ui-react';

type PersonPageProps = {
  id: string
}
// type MovieDetailsView = {
//   title: string
// }
class PersonPage extends Component<RouteComponentProps<PersonPageProps>, PersonDetailsViewModel> {
  personPageService: PersonPageService;
  id: string;
  constructor(props: RouteComponentProps<PersonPageProps>) {
    super(props);
    this.id = props.match.params.id;
    this.personPageService = new PersonPageService();
    this.state = {
      imageCount: 0,
    }
  }

  componentDidMount = async () => {
    const person = await this.personPageService.getPerson(this.id);
    this.setState(person);
  }

  onNextImageClicked = () => {
    if (this.state.images?.profiles === undefined || this.state.imageCount === undefined) {
      return 0;
    }
    const nextPage = this.state.imageCount + 1;
    if (this.state.imageCount === this.state.images?.profiles.length - 1) {
      this.setState({
        imageCount: 0,
      });
    } else {
      this.setState({
        imageCount: nextPage,
      });
    }
  }

  onPrevImageClicked = () => {
    if (this.state.images?.profiles === undefined || this.state.imageCount === undefined) {
      return 0;
    }
    if (this.state.imageCount === 0) {
      this.setState({
        imageCount: this.state.images?.profiles.length - 1,
      });
    } else {
      const prevPage = this.state.imageCount - 1;
      this.setState({
        imageCount: prevPage,
      });
    }
  }

  getAge = (): number | null => {
    if (this.state.birthday && this.state.deathday) {
      return new Date(this.state.deathday).getFullYear() - new Date(this.state.birthday).getFullYear();
    } else if (this.state.birthday && !this.state.deathday) {
      return new Date().getFullYear() - new Date(this.state.birthday).getFullYear();
    }
    return null;
  }

  render = () => {
    return (
      <>
        <div className="personInform-container">
          <div className="personInform-firstColumn">
            <Modal
              size="mini"
              closeIcon={true}
              style={{
                textAlign: 'center'
              }}
              trigger={
                <section
                  style={{
                    backgroundImage: this.state.profile_path ?
                      `url(https://www.themoviedb.org/t/p/w342${this.state.profile_path})` :
                      `url(${defaultMovie})`
                  }}
                  className="personInform-poster">
                </section>}>
              <Modal.Header >
                <Icon
                  onClick={this.onPrevImageClicked}
                  link
                  name='arrow left'
                />
                {this.state.name}
                <Icon
                  onClick={this.onNextImageClicked}
                  link
                  name='arrow right' />
              </Modal.Header>
              <Modal.Content image>
                <Image
                  size='medium'
                  centered
                  src={
                    `https://www.themoviedb.org/t/p/w300${this.state.images?.profiles[this.state.imageCount ?
                      this.state.imageCount :
                      0]?.file_path}`}
                />
              </Modal.Content>
            </Modal>

            <h3>Personal Info</h3>
            <section className="posterInform-facts">
              <h4>Known For</h4>
              <div>{this.state.known_for_department}</div>
              <h4>Gender</h4>
              <div>{this.state.gender === 2 ? 'Male' : 'Female'}</div>
              <h4>Birthday</h4>
              <div>{this.state.birthday} ({this.getAge() ? `${this.getAge()} years old` : ''})</div>
              <h4>Place of Birth</h4>
              <div>{this.state.place_of_birth}</div>
              {this.state.deathday ? <h4>Deathday</h4> : ''}
              {this.state.deathday ? <div>{this.state.deathday} ({this.getAge() ? `${this.getAge()} years old` : ''})</div> : ''}
              <h4>Also Known As</h4>
              {this.state.also_known_as?.map((item, index) => (<div key={index}>{item}</div>))}
            </section>
          </div>
          <div className="personInform-secondColumn">
            <section className="personInform-title">
              <h1 className='personInform-name'>
                {this.state.name}
                <a href={`https://www.imdb.com/name/${this.state.imdb_id}`}>
                  <Icon name='imdb' link size="small" />
                </a>
              </h1>
            </section>
            <section className="personInform-biography">
              <h3>Biography</h3>
              <div className="personInform-biographyText">{this.state.biography}</div>
            </section>

            <h3>Known For</h3>


            {(this.state.credits?.knownFor && this.state.credits?.knownFor.length > 0) ?
              <section className="personInform-knownFor">
                {this.state.credits?.knownFor.map((movie) => (
                  <div className="knownFor-card" key={movie.id}>
                    <Link to={`/movies/${movie.id}`}>
                      <div
                        className='knownFor-image-container'
                        style={{
                          backgroundImage: movie.poster_path ?
                            `url(https://www.themoviedb.org/t/p/w154${movie.poster_path})` :
                            `url(${defaultMovie})`
                        }}>
                      </div>
                      <div className="knownFor-name">{movie.title}</div>
                      <div className="knownFor-character">{movie.vote_average > 0 ? `${movie.vote_average * 10}%` : 'NR'}</div>
                    </Link>
                  </div>))}
              </section> : `We don't have any recommendations for this movie`}


            <section className="personInform-credits">
              <h3>{this.state.known_for_department}</h3>
              <Table
                singleLine
                className="personInform-table"
                stackable={true}
              >
                <Table.Body>
                  {this.state.credits?.cast.map((item) => (
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
                            {item.vote_average !== 0 ? item.vote_average * 10 + '%' : '—'}
                          </span>
                        </Link>
                      </Table.Cell>
                      <Table.Cell width={6}>
                        <Link to={`/movies/${item.id}`}>
                          <span className="personInform-table">
                            <strong>
                              {item.title}
                            </strong>
                          </span>
                        </Link>
                      </Table.Cell>
                      <Table.Cell width={4}>
                        <Link to={`/movies/${item.id}`}>
                          <span className="personInform-table">
                            {item.character}
                          </span>
                        </Link>
                      </Table.Cell>
                    </Table.Row >))}
                </Table.Body>
              </Table >
            </section>
          </div>
        </div>
      </>
    )
  }
}
export default PersonPage;
