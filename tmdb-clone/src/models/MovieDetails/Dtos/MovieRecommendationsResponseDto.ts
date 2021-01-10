export interface Result {
  genre_ids: number[];
  original_language: string;
  original_title: string;
  poster_path: string;
  title: string;
  id: number;
  overview: string;
  release_date: string;
  vote_count: number;
  vote_average: number;
  adult: boolean;
  backdrop_path: string;
  video: boolean;
  popularity: number;
}

export interface MovieRecommendationsResponseDto {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}
