export interface Cast {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  popularity: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface Crew {
  vote_average: number;
  overview: string;
  release_date: string;
  title: string;
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  vote_count: number;
  original_language: string;
  original_title: string;
  poster_path: string;
  id: number;
  video: boolean;
  popularity: number;
  credit_id: string;
  department: string;
  job: string;
}

export interface PersonCreditsResponseDto {
  cast: Cast[];
  crew: Crew[];
  id: number;
}
