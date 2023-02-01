import axios, { AxiosResponse } from 'axios';
import queryString from 'query-string';
import TmdbBaseService from './TmdbBaseService';
import { PopularPeoplePageResponseDto } from '../models/PopularPeople/PopularPeoplePageResponseDto';
import { PopularPeoplePageRequestDto } from '../models/PopularPeople/PopularPeoplePageRequestDto';

class PopularPeopleService extends TmdbBaseService {
  findPersons = async (page: number): Promise<PopularPeoplePageResponseDto> => {
    let url: string = this.addApiKey(`${this.baseUrl}/person/popular`);
    const request: PopularPeoplePageRequestDto | null = this.createRequest(page);
    if (request) {
      const requestString = queryString
        .stringify(request, { skipNull: true, skipEmptyString: true });
      url += `&${requestString}`;
    }
    const response: AxiosResponse<PopularPeoplePageResponseDto> = await axios
      .get<PopularPeoplePageResponseDto>(url);
    return response.data;
  };

  createRequest = (page: number): PopularPeoplePageRequestDto => {
    const request: PopularPeoplePageRequestDto = {
      page,
    };
    return request;
  };
}

export default PopularPeopleService;
