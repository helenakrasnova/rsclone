export interface PersonCreditsViewModel {
  cast: CastViewModel[];
  crew: CrewViewModel[];
  knownFor?: CastViewModel[];
}
export interface CastViewModel {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  character: string;
  popularity: number;
  vote_count: number;
}
export interface CrewViewModel {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
}
