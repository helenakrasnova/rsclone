import axios, { AxiosResponse } from 'axios';
import { DiscoverResponseDto } from '../models/DiscoverResponseDto';
import TmdbBaseService from './TmdbBaseService';

class DiscoverMoviesService extends TmdbBaseService {
  constructor() {
    super();
  }
  findMovies = async (): Promise<DiscoverResponseDto> => {
    let url: string = this.addApiKey(`${this.baseUrl}/discover/movie`);
    let response: AxiosResponse<DiscoverResponseDto> = await axios.get<DiscoverResponseDto>(url);
    return response.data;
  }
}
export default DiscoverMoviesService;
