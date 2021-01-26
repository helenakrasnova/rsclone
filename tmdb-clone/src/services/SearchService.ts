import axios, { AxiosResponse } from 'axios';
import TmdbBaseService from './TmdbBaseService';
import queryString from 'query-string';
import { PopularPeoplePageResponseDto } from '../models/PopularPeople/PopularPeoplePageResponseDto';
import { PopularPeoplePageRequestDto } from './../models/PopularPeople/PopularPeoplePageRequestDto';
import { SearchResponseDto } from '../models/SearchResponseDto';
import { SearchRequestDto } from './../models/SearchRequestDto';
import { SearchResult } from './../models/SearchResponseDto';

class SearchService extends TmdbBaseService {

  public findSearchResults = async (querySearch: string): Promise<SearchResponseDto> => {
    let url: string = this.addApiKey(`${this.baseUrl}/search/multi`);
    const request: SearchRequestDto | null = this.createRequest(querySearch);
    if (request) {
      let requestString = queryString.stringify(request, { skipNull: true, skipEmptyString: true });
      url += `&${requestString}`;
    }
    let response: AxiosResponse<SearchResponseDto> = await axios.get<SearchResponseDto>(url);
    response.data.results = response.data.results.filter((item: SearchResult) =>
    item.media_type === 'movie' || item.media_type === 'person');
    return response.data;
  }

  private createRequest = (querySearch: string): SearchRequestDto => {
    const request: SearchRequestDto = {
      query: querySearch,
      page: 1,
    }
    return request;
  }

}

export default SearchService;
