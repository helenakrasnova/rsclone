
export interface MovieCastViewModel {
  id: number;
  name: string;
  profile_path: string;
  cast_id: number;
  character: string;
  order: number;
  known_for_department?: string;
  job?: string;
}

export interface CastAndCrewViewModel{
  cast :MovieCastViewModel[];
  crew :MovieCastViewModel[];
}
