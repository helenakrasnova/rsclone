import axios, { AxiosResponse } from 'axios';
import { SearchMoviesState } from '../features/MoviesListPage/SearchMovies/SearchMovies';
import { DiscoverMoviesFilterRequestDto } from '../models/DiscoverMoviesFilterRequestDto';
import { DiscoverResponseDto } from '../models/DiscoverResponseDto';
import TmdbBaseService from './TmdbBaseService';
import queryString from 'query-string';
class DiscoverMoviesService extends TmdbBaseService {
  constructor() {
    super();
  }
  findMovies = async (filter: SearchMoviesState | null): Promise<DiscoverResponseDto> => {
    let url: string = this.addApiKey(`${this.baseUrl}/discover/movie`);
    const request: DiscoverMoviesFilterRequestDto | null = this.createRequest(filter);
    if (request) {
      let requestString = queryString.stringify(request, { skipNull: true , skipEmptyString: true});
      url += `&${requestString}`;
    }
    let response: AxiosResponse<DiscoverResponseDto> = await axios.get<DiscoverResponseDto>(url);
    return response.data;
  }
  createRequest = (filter: SearchMoviesState | null): DiscoverMoviesFilterRequestDto | null => {
    if (!filter) {
      return null;
    }
    const request: DiscoverMoviesFilterRequestDto = {
      page: 1,
      sort_by: 'popularity.asc',
      "release_date.gte": filter.releaseDateFrom,
      "release_date.lte": filter.releaseDateFrom,
      with_release_type: Array.from(filter.releaseTypes).join('|'),
      region: filter.releaseCountry,
      with_genres: Array.from(filter.genres).join(','),
      certification: Array.from(filter.certification).join('|'),
      with_original_language: filter.selectedLanguage,
      "vote_average.gte": filter.voteAverageMin,
      "vote_average.lte": filter.voteAverageMax,
      "vote_count.gte": filter.voteCountMin,
      "with_runtime.gte": filter.movieDurationMin,
      "with_runtime.lte": filter.movieDurationMax,
    }
    return request;
  }
}
export default DiscoverMoviesService;
