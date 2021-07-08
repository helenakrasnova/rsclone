import languages from '../configuration/languages';

export default function getRatingColor(rating: number): string {
  let result = '';
  if (rating >= 7) {
    result = '#21d07a';
  } else if (rating >= 4) {
    result = '#d2d531';
  } else if (rating > 0) {
    result = '#cb215b';
  } else {
    result = '#666666';
  }
  return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fallbackImage(e: any, defaultValue: string) {
  if (e.target.src !== defaultValue) {
    e.target.src = defaultValue;
  }
}

export function getFullLanguage(lng: string): string {
  let result = '-';
  if (lng) {
    const index = languages.findIndex((item) => item.value === lng);
    if (index >= 0) {
      result = languages[index].english_name;
    }
  }
  return result;
}
