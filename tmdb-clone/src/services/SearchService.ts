import axios, { AxiosResponse } from 'axios';
import queryString from 'query-string';
import TmdbBaseService from './TmdbBaseService';
import { SearchResponseDto, SearchResult } from '../models/SearchResponseDto';
import { SearchRequestDto } from '../models/SearchRequestDto';

class SearchService extends TmdbBaseService {
  public findSearchResults = async (querySearch: string): Promise<SearchResponseDto> => {
    let url: string = this.addApiKey(`${this.baseUrl}/search/multi`);
    const request: SearchRequestDto | null = this.createRequest(querySearch);
    if (request) {
      const requestString = queryString
        .stringify(request, { skipNull: true, skipEmptyString: true });
      url += `&${requestString}`;
    }
    const response: AxiosResponse<SearchResponseDto> = await axios.get<SearchResponseDto>(url);
    response.data.results = response.data.results.filter((item: SearchResult) => item.media_type === 'movie' || item.media_type === 'person');
    return response.data;
  };

  private createRequest = (querySearch: string): SearchRequestDto => {
    const request: SearchRequestDto = {
      query: querySearch,
      page: 1,
    };
    return request;
  };
}

export default SearchService;
