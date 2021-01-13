import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import PersonPageService from '../../services/PersonPageService';
import './personPage.css'
import { PersonDetailsViewModel } from './../../models/PersonDetails/ViewModels/PersonDetailsViewModel';
import { Link } from 'react-router-dom';
type PersonPageProps = {
  id: string
}
// type MovieDetailsView = {
//   title: string
// }
class PersonPage extends Component<PersonPageProps, PersonDetailsViewModel> {
  personPageService: PersonPageService;
  id: string;
  constructor({ match }: RouteComponentProps<PersonPageProps>) {
    super(match.params);
    this.id = match.params.id;
    this.personPageService = new PersonPageService();
    this.state = {
    }
  }
  componentDidMount = async () => {
    const person = await this.personPageService.getPerson(this.id);
    this.setState(person);

  }
  render = () => {
    return (
      <>
        <div className="personInform-container">
          <div className="personInform-firstColumn">
            <section
              style={{ backgroundImage: `url(https://www.themoviedb.org/t/p/w342${this.state.profile_path})` }}
              className="personInform-poster">
            </section>
            <h3>Personal Info</h3>
            <section className="posterInform-facts">
              <h4>Known For</h4>
              <div>{this.state.known_for_department}</div>
              <h4>Gender</h4>
              <div>{this.state.gender === 2 ? 'Male' : 'Female'}</div>
              <h4>Birthday</h4>
              <div>{this.state.birthday}</div>
              <h4>Place of Birth</h4>
              <div>{this.state.place_of_birth}</div>
              {this.state.deathday ? <h3>Deathday<div>{this.state.deathday}</div></h3> : <div></div>}
              <h4>Also Known As</h4>
              {this.state.also_known_as?.map((item) => (<div>{item}</div>))}
            </section>
          </div>
          <div className="personInform-secondColumn">
            <section className="personInform-title">
              <h1>{this.state.name}</h1>
            </section>
            <section className="personInform-biography">
              <h3>Biography</h3>
              <div>{this.state.biography}</div>
            </section>
            <section className="personInform-knownFor">
              <h3>Known For</h3>
              <div>?????????????????????????</div>
            </section>
            <section className="personInform-credits">
              <h3>{this.state.known_for_department}</h3>
              <div> {this.state.credits?.cast.map((item) => (<Link to={`/movies/${item.id}`}><div>{item.title} as {item.character}</div></Link>))}</div>

            </section>
          </div>
        </div>

      </>
    )
  }
}
export default PersonPage;
