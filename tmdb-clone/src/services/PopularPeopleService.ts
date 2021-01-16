import axios, { AxiosResponse } from 'axios';
import TmdbBaseService from './TmdbBaseService';
import queryString from 'query-string';
import { PopularPeoplePageResponseDto } from '../models/PopularPeople/PopularPeoplePageResponseDto';
import { PopularPeoplePageRequestDto } from './../models/PopularPeople/PopularPeoplePageRequestDto';
class PopularPeopleService extends TmdbBaseService {
  constructor() {
    super();
  }
  findPersons = async (page : number): Promise<PopularPeoplePageResponseDto> => {
    let url: string = this.addApiKey(`${this.baseUrl}/person/popular`);
    const request: PopularPeoplePageRequestDto | null = this.createRequest(page);
    if (request) {
      let requestString = queryString.stringify(request, { skipNull: true, skipEmptyString: true });
      url += `&${requestString}`;
    }
    let response: AxiosResponse<PopularPeoplePageResponseDto> = await axios.get<PopularPeoplePageResponseDto>(url);
    return response.data;
  }
  createRequest = (page: number): PopularPeoplePageRequestDto => {
    const request: PopularPeoplePageRequestDto = {
      page: page,
    }
    return request;
  }
}
export default PopularPeopleService;
