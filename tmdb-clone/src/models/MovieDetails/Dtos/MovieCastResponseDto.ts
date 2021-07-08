export interface MovieCastResponseDto {
  cast: Array<MovieCastDto>,
  crew: Array<MovieCastDto>,
}
export interface MovieCastDto {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
  job?: string;
}
