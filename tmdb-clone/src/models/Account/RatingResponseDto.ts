export interface RatingDto {
  original_language: string;
  original_title: string;
  poster_path: string;
  id: number;
  video: boolean;
  vote_average: number;
  overview: string;
  release_date: string;
  title: string;
  adult: boolean;
  backdrop_path: string;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  rating?: number;
}

export interface RatingResponseDto {
  page: number;
  results: RatingDto[];
  total_pages: number;
  total_results: number;
}
