
import TmdbBaseService from './TmdbBaseService';
import { PersonDetailsViewModel } from './../models/PersonDetails/ViewModels/PersonDetailsViewModel';
import { PersonDetailsResponseDto } from '../models/PersonDetails/Dtos/PersonDetailsResponseDto';
import axios, { AxiosResponse } from 'axios';
import { PersonCreditsViewModel } from '../models/PersonDetails/ViewModels/PersonCreditsViewModel';
import { PersonCreditsResponseDto } from './../models/PersonDetails/Dtos/PersonCreditsResponseDto';
import { PersonImagesResponseDto } from '../models/PersonDetails/Dtos/PersonImagesResponseDto';

class PersonPageService extends TmdbBaseService {
  public getPerson = async (id: string): Promise<PersonDetailsViewModel> => {
    let personDetails = await this.getPersonDetails(id);
    let personDetailsItems = await Promise.all([
      this.getPersonCredits(id),
      this.getPersonImages(id),
    ]);
    personDetails.credits = personDetailsItems[0];
    personDetails.images = personDetailsItems[1];
    return personDetails;
  }
  private getPersonDetails = async (id: string): Promise<PersonDetailsViewModel> => {
    const url: string = this.addApiKey(`${this.baseUrl}/person/${id}`);
    const detailsResponse: AxiosResponse<PersonDetailsResponseDto> = await axios.get<PersonDetailsResponseDto>(url);
    let result: PersonDetailsViewModel = {
      also_known_as: detailsResponse.data.also_known_as,
      biography: detailsResponse.data.biography,
      birthday: detailsResponse.data.birthday,
      gender: detailsResponse.data.gender,
      id: detailsResponse.data.id,
      known_for_department: detailsResponse.data.known_for_department,
      name: detailsResponse.data.name,
      place_of_birth: detailsResponse.data.place_of_birth,
      profile_path: detailsResponse.data.profile_path,
      deathday: detailsResponse.data.deathday,
      imdb_id: detailsResponse.data.imdb_id
    }
    return result;
  }
  private getPersonCredits = async (id: string): Promise<PersonCreditsViewModel> => {
    const url: string = this.addApiKey(`${this.baseUrl}/person/${id}/movie_credits`);
    const detailsResponse: AxiosResponse<PersonCreditsResponseDto> = await axios.get<PersonCreditsResponseDto>(url);
    let result: PersonCreditsViewModel = {
      cast: detailsResponse.data.cast.map((item) => ({
        id: item.id,
        title: item.title,
        poster_path: item.poster_path,
        release_date: item.release_date,
        vote_average: item.vote_average,
        character: item.character,
        popularity: item.popularity,
        vote_count: item.vote_count
      })),
      crew: detailsResponse.data.crew.map((item) => ({
        id: item.id,
        title: item.title,
        release_date: item.release_date,
        vote_average: item.vote_average,
      })),
    }
    let knownFor = [...result.cast];
    knownFor.sort((a, b) => b.vote_count - a.vote_count);
    result.knownFor = knownFor.slice(0,8);
    result.cast.forEach((item) => item.release_date = item.release_date ? item.release_date : '3000-1-1');
    result.cast.sort((a, b) => new Date(b.release_date).getFullYear() - new Date(a.release_date).getFullYear());

    return result;
  }

  private getPersonImages = async (id: string): Promise<PersonImagesResponseDto> => {
    const url: string = this.addApiKey(`${this.baseUrl}/person/${id}/images`);
    const detailsResponse: AxiosResponse<PersonImagesResponseDto> = await axios.get<PersonImagesResponseDto>(url);
    let result: PersonImagesResponseDto = {
      id: detailsResponse.data.id,
      profiles: detailsResponse.data.profiles,
    }
    return result;
  }
}
export default PersonPageService;
