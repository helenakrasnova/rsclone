export interface DiscoverMoviesFilterRequestDto {
  sort_by?: string;
  certification?: string;
  region?: string | null;
  'certification.lte'?: number;
  'certification.gte'?: number;
  page?: number;
  'release_date.gte'?: string;
  'release_date.lte'?: string;
  'with_release_type'?: string;
  'vote_count.gte'?: number;
  'vote_count.lte'?: number;
  'vote_average.gte'?: number;
  'vote_average.lte'?: number;
  with_genres?: string;
  'with_runtime.gte'?: number;
  'with_runtime.lte'?: number;
  'certification_country'? : string | null;
  with_original_language?: string | null;
}
