import TmdbBaseService from './TmdbBaseService';
import { MovieDetailsViewModel } from '../models/MovieDetails/ViewModels/MovieDetailsViewModel';
import axios, { AxiosResponse } from 'axios';
import { MovieDetailsResponseDto } from '../models/MovieDetails/Dtos/MovieDetailsResponseDto';
import { MovieCastViewModel } from './../models/MovieDetails/ViewModels/MovieCastViewModel';
import { MovieCastResponseDto } from './../models/MovieDetails/Dtos/MovieCastResponseDto';
import { MovieReviewResponseDto } from './../models/MovieDetails/Dtos/MovieReviewResponseDto';
import { MovieRecommendationsResponseDto } from '../models/MovieDetails/Dtos/MovieRecommendationsResponseDto';
import { MovieRecommendationsViewModel } from './../models/MovieDetails/ViewModels/MovieRecommendationsViewModel';
import { MovieKeywordsResponseDto } from '../models/MovieDetails/Dtos/MovieKeywordsResponseDto';
import { MovieVideosResponseDto } from '../models/MovieDetails/Dtos/MovieVideosResponseDto';

class MovieDetailsService extends TmdbBaseService {
  constructor() {
    super();
  }

  public getMovie = async (id: string): Promise<MovieDetailsViewModel> => {
    let movieDetails = await this.getDetails(id);
    let movieItems = await Promise.all([
      this.getCast(id),
      this.getReviews(id),
      this.getRecommendations(id),
      this.getKeywords(id),
      this.getVideos(id)
    ]);
    movieDetails.cast = movieItems[0];
    movieDetails.reviews = movieItems[1];
    movieDetails.recommendations = movieItems[2];
    movieDetails.keywords = movieItems[3];
    movieDetails.videos = movieItems[4];
    return movieDetails;
  }

  private getDetails = async (id: string): Promise<MovieDetailsViewModel> => {
    const url: string = this.addApiKey(`${this.baseUrl}/movie/${id}`);
    const detailsResponse: AxiosResponse<MovieDetailsResponseDto> = await axios.get<MovieDetailsResponseDto>(url);
    let result: MovieDetailsViewModel = {
      backdrop_path: detailsResponse.data.backdrop_path,
      budget: detailsResponse.data.budget,
      genres: detailsResponse.data.genres,
      homepage: detailsResponse.data.homepage,
      id: detailsResponse.data.id,
      original_language: detailsResponse.data.original_language,
      original_title: detailsResponse.data.original_title,
      overview: detailsResponse.data.overview,
      poster_path: detailsResponse.data.poster_path,
      release_date: detailsResponse.data.release_date,
      revenue: detailsResponse.data.revenue,
      runtime: detailsResponse.data.runtime,
      status: detailsResponse.data.status,
      tagline: detailsResponse.data.tagline,
      title: detailsResponse.data.title,
      video: detailsResponse.data.video,
      vote_average: detailsResponse.data.vote_average,
      vote_count: detailsResponse.data.vote_count,
    }
    return result;
  }

  private getCast = async (id: string): Promise<MovieCastViewModel[]> => {
    const url: string = this.addApiKey(`${this.baseUrl}/movie/${id}/credits`);
    const detailsResponse: AxiosResponse<MovieCastResponseDto> = await axios.get<MovieCastResponseDto>(url);
    let result: Array<MovieCastViewModel> = detailsResponse.data.cast.map((item) => {
      return {
        id: item.id,
        name: item.name,
        profile_path: item.profile_path,
        cast_id: item.cast_id,
        character: item.character,
        order: item.order,
        
      }
    });
    return result;
  }

  private getReviews = async (id: string): Promise<MovieReviewResponseDto> => {
    const url: string = this.addApiKey(`${this.baseUrl}/movie/${id}/reviews`);
    const detailsResponse: AxiosResponse<MovieReviewResponseDto> = await axios.get<MovieReviewResponseDto>(url);
    return detailsResponse.data;
  }

  private getRecommendations = async (id: string): Promise<MovieRecommendationsViewModel[]> => {
    const url: string = this.addApiKey(`${this.baseUrl}/movie/${id}/recommendations`);
    const detailsResponse: AxiosResponse<MovieRecommendationsResponseDto> = await axios.get<MovieRecommendationsResponseDto>(url);
    let result: Array<MovieRecommendationsViewModel> = detailsResponse.data.results.map((item) => {
      return {
        poster_path: item.poster_path,
        title: item.title,
        id: item.id,
        vote_average: item.vote_average,
      }
    });
    return result;
  }
  private getKeywords = async (id: string): Promise<MovieKeywordsResponseDto> => {
    const url: string = this.addApiKey(`${this.baseUrl}/movie/${id}/keywords`);
    const detailsResponse: AxiosResponse<MovieKeywordsResponseDto> = await axios.get<MovieKeywordsResponseDto>(url);
    return detailsResponse.data;
  }
  private getVideos = async (id: string): Promise<MovieVideosResponseDto> => {
    const url: string = this.addApiKey(`${this.baseUrl}/movie/${id}/videos`);
    const detailsResponse: AxiosResponse<MovieVideosResponseDto> = await axios.get<MovieVideosResponseDto>(url);
    return detailsResponse.data;
  }
}
export default MovieDetailsService;
