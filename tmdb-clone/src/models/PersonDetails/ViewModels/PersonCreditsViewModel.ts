export interface PersonCreditsViewModel {
  cast: CastViewModel[];
  crew: CrewViewModel[];
}
export interface CastViewModel {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  character: string;
}
export interface CrewViewModel {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
}
