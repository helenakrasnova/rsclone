import { DropDownViewModel } from '../models/DropDownViewModel';

export const posterUrl = 'https://image.tmdb.org/t/p';

export const sortOptions: DropDownViewModel[] = [
  {
    key: 'Popularity Ascending',
    text: 'Popularity Ascending',
    value: 'popularity.asc',
  },
  {
    key: 'Popularity Descending',
    text: 'Popularity Descending',
    value: 'popularity.desc',
  },
  {
    key: 'Rating Descending',
    text: 'Rating Descending',
    value: 'vote_average.desc',
  },
  {
    key: 'Rating Ascending',
    text: 'Rating Ascending',
    value: 'vote_average.asc',
  },
  {
    key: 'Release Date Descending',
    text: 'Release Date Descending',
    value: 'release_date.desc',
  },
  {
    key: 'Release Date Ascending',
    text: 'Release Date Ascending',
    value: 'release_date.asc',
  },
  {
    key: 'Title Descending',
    text: 'Title Descending',
    value: 'original_title.desc',
  },
  {
    key: 'Title Ascending',
    text: 'Title Ascending',
    value: 'original_title.asc',
  },
];
