import { MovieDiscoverDto } from "./MovieDiscoverDto";

export interface DiscoverResponseDto {
  page: number;
  results: Array<MovieDiscoverDto>;
  total_pages: number;
  total_results: number;
}
