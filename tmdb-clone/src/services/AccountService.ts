import TmdbBaseService from './TmdbBaseService';
import AuthenticationService from './AuthenticationService';
import axios, { AxiosResponse } from 'axios';
import { RatingResponseDto } from '../models/Account/RatingResponseDto';

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
    let requestBody: object = {
      value: rating,
    }
    try {
      await axios.post(url, requestBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  public getRatings = async (id: number, page: number): Promise<RatingResponseDto> => {
    let url = this.getUrlWithSessionId(`/account/${id}/rated/movies`);
    url += `&page=${page}`;
    const response: AxiosResponse<RatingResponseDto> = await axios.get<RatingResponseDto>(url);
    return response.data;
  }

  public addOrRemoveToWatchList = async (accountId: number, movieId: number, markAsAdd : boolean): Promise<void> => {
    let url = this.getUrlWithSessionId(`/account/${accountId}/watchlist`);
    let requestBody: object = {
      media_type: 'movie',
      media_id: movieId,
      watchlist: markAsAdd
    }
    try {
      await axios.post(url, requestBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public getWatchList = async (id: number, page: number): Promise<RatingResponseDto> => {
    let url = this.getUrlWithSessionId(`/account/${id}/watchlist/movies`);
    url += `&page=${page}`;
    const response: AxiosResponse<RatingResponseDto> = await axios.get<RatingResponseDto>(url);
    return response.data;
  }

  private getUrlWithSessionId = (path: string): string => {
    let url: string = this.addApiKey(`${this.baseUrl}/${path}`);
    const sessionId = this.authenticationService.getCurrentSessionId();
    url += `&session_id=${sessionId}`;
    return url;
  }

}

export default AccountService;
