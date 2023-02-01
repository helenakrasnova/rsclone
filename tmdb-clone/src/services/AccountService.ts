import axios, { AxiosResponse } from 'axios';
import TmdbBaseService from './TmdbBaseService';
import AuthenticationService from './AuthenticationService';
import { RatingResponseDto, RatingDto } from '../models/Account/RatingResponseDto';

class AccountService extends TmdbBaseService {
  authenticationService: AuthenticationService;

  constructor() {
    super();
    this.authenticationService = new AuthenticationService();
  }

  rateMovie = async (id: string, rating: number): Promise<void> => {
    let url: string = this.addApiKey(`${this.baseUrl}/movie/${id}/rating`);
    const sessionId = this.authenticationService.getCurrentSessionId();
    url += `&session_id=${sessionId}`;
    const requestBody: unknown = {
      value: rating,
    };
    try {
      await axios.post(url, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  public getRatings = (id: number): Promise<RatingDto[]> => this.getAllPagesResult(
    id, `account/${id}/rated/movies`,
  );

  public getWatchList = (id: number): Promise<RatingDto[]> => this.getAllPagesResult(
    id, `account/${id}/watchlist/movies`,
  );

  public getFavorites = (id: number): Promise<RatingDto[]> => this.getAllPagesResult(
    id, `account/${id}/favorite/movies`,
  );

  public addOrRemoveToWatchList = async (accountId: number, movieId: number, markAsAdd: boolean)
  : Promise<void> => {
    const url = this.getUrlWithSessionId(`account/${accountId}/watchlist`);
    const requestBody: unknown = {
      media_type: 'movie',
      media_id: movieId,
      watchlist: markAsAdd,
    };
    try {
      await axios.post(url, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  public addOrRemoveToFavorites = async (accountId: number, movieId: number, markAsAdd: boolean)
  : Promise<void> => {
    const url = this.getUrlWithSessionId(`account/${accountId}/favorite`);
    const requestBody: unknown = {
      media_type: 'movie',
      media_id: movieId,
      favorite: markAsAdd,
    };
    try {
      await axios.post(url, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  private getUrlWithSessionId = (path: string): string => {
    let url: string = this.addApiKey(`${this.baseUrl}/${path}`);
    const sessionId = this.authenticationService.getCurrentSessionId();
    url += `&session_id=${sessionId}`;
    return url;
  };

  private async getAllPagesResult(id: number, endPoint: string) {
    let page = 1;
    let result: RatingDto[] = [];
    let response: AxiosResponse<RatingResponseDto>;
    do {
      let url = this.getUrlWithSessionId(endPoint);
      url += `&page=${page}`;
      // eslint-disable-next-line no-await-in-loop
      response = await axios.get<RatingResponseDto>(url);
      result = [...result, ...response.data.results];
      page += 1;
    } while (page <= response.data.total_pages);
    return result;
  }
}

export default AccountService;
