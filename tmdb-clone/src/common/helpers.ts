import { posterUrl } from '../configuration/configuration';
import { CrewViewModel } from '../models/PersonDetails/ViewModels/PersonCreditsViewModel';

interface UserCrewModel {
  category?: string,
  list?: CrewViewModel[],
}

const Category: string[] = [
  'Sound',
  'Crew',
  'Production',
  'Editing',
  'Writing',
  'Creator',
  'Directing',
];

export default function getPosterUrl(url: string): string | null {
  if (!url) {
    return null;
  } if (!url.includes('http')) {
    return `${posterUrl}/w154${url}`;
  }
  return url;
}

export function getUserImageUrl(url: string): string | null {
  if (!url) {
    return null;
  } if (url.includes('tmdb')) {
    return url;
  } if (url.includes('gravatar')) {
    return url.slice(1);
  }
  return `${posterUrl}/w185${url}`;
}

export function getUserCrew(arr: CrewViewModel[]): UserCrewModel[] {
  const result: UserCrewModel[] = [];
  for (let i = 0; i < Category.length; i += 1) {
    const obj: UserCrewModel = {};
    const filteredArray: CrewViewModel[] = arr.filter((item) => item.department === Category[i]);
    if (filteredArray.length > 0) {
      obj.list = filteredArray;
      obj.category = Category[i];
      result.push(obj);
    }
  }
  return result;
}
