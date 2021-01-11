import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import PersonPageService from '../../services/PersonPageService';
import './personPage.css'
import { PersonDetailsViewModel } from './../../models/PersonDetails/ViewModels/PersonDetailsViewModel';
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
      <React.Fragment>
        {this.state.name}
      </React.Fragment>
    )
  }
}
export default PersonPage;
