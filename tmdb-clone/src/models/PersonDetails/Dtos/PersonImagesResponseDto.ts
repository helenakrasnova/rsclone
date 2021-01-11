export interface Profile {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1?: any;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface PersonImagesResponseDto {
  id: number;
  profiles: Profile[];
}
