import axios, { AxiosResponse } from 'axios';
import queryString from 'query-string';
import { SearchMoviesState } from '../features/MoviesListPage/SearchMovies/SearchMovies';
import { DiscoverMoviesFilterRequestDto } from '../models/DiscoverMoviesFilterRequestDto';
import { DiscoverResponseDto } from '../models/DiscoverResponseDto';
import TmdbBaseService from './TmdbBaseService';

class DiscoverMoviesService extends TmdbBaseService {
  public findMovies = async (
    filter: SearchMoviesState | null,
    orderBy: string,
    page: number,
  ): Promise<DiscoverResponseDto> => {
    let url: string = this.addApiKey(`${this.baseUrl}/discover/movie`);
    const request: DiscoverMoviesFilterRequestDto | null = this.createRequest(
      filter, orderBy, page,
    );
    if (request) {
      const requestString = queryString.stringify(
        request, { skipNull: true, skipEmptyString: true },
      );
      url += `&${requestString}`;
    }
    const response: AxiosResponse<DiscoverResponseDto> = await axios.get<DiscoverResponseDto>(url);
    return response.data;
  };

  private createRequest = (
    filter: SearchMoviesState | null,
    orderBy: string,
    page: number,
  ): DiscoverMoviesFilterRequestDto | null => {
    if (!filter) {
      return null;
    }
    const request: DiscoverMoviesFilterRequestDto = {
      page,
      sort_by: orderBy,
      'release_date.gte': filter.releaseDateFrom,
      'release_date.lte': filter.releaseDateTo,
      with_release_type: Array.from(filter.releaseTypes).join('|'),
      region: filter.releaseCountry,
      with_genres: Array.from(filter.genres).join(','),
      certification: Array.from(filter.certification).join('|'),
      certification_country: filter.certification.values.length > 0 ? 'US' : null,
      with_original_language: filter.selectedLanguage,
      'vote_average.gte': filter.voteAverageMin,
      'vote_average.lte': filter.voteAverageMax,
      'vote_count.gte': filter.voteCountMin,
      'with_runtime.gte': filter.movieDurationMin,
      'with_runtime.lte': filter.movieDurationMax,
    };
    return request;
  };
}

export default DiscoverMoviesService;
