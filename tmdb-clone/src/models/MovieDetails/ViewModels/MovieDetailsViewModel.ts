import { Genre } from "../Dtos/MovieDetailsDto";
import { MovieCastViewModel } from './MovieCastViewModel';
import { MovieReviewResponseDto } from './../Dtos/MovieReviewResponseDto';
import { MovieRecommendationsViewModel } from "./MovieRecommendationsViewModel";
import { MovieKeywordsResponseDto } from "../Dtos/MovieKeywordsResponseDto";
import { MovieVideosResponseDto } from "../Dtos/MovieVideosResponseDto";

export interface MovieDetailsViewModel {
  backdrop_path?: string;
  budget?: number;
  genres?: Genre[];
  homepage?: string;
  id?: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  poster_path?: string;
  release_date?: string;
  revenue?: number;
  runtime?: number;
  status?: string;
  tagline?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  cast?: Array<MovieCastViewModel>;
  reviews?: MovieReviewResponseDto;
  recommendations?: MovieRecommendationsViewModel[];
  keywords?: MovieKeywordsResponseDto;
  videos?: MovieVideosResponseDto;
}
