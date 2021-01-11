import { PersonImagesResponseDto } from "../Dtos/PersonImagesResponseDto";
import { PersonCreditsViewModel } from "./PersonCreditsViewModel";

export interface PersonDetailsViewModel {
  also_known_as?: string[];
  biography?: string;
  birthday?: string;
  deathday?: any;
  gender?: number;
  id?: number;
  known_for_department?: string;
  name?: string;
  place_of_birth?: string;
  profile_path?: string;
  credits?: PersonCreditsViewModel;
  images?: PersonImagesResponseDto;
}
