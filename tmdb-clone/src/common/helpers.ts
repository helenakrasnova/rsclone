import { posterUrl } from '../configuration/configuration';

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
