import axios, { AxiosResponse } from 'axios';
import { SearchResponseDto } from '../models/SearchResponseDto';
import SearchService from './SearchService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SearchService tests', () => {
  const searchService = new SearchService();
  const searchResponseDto = {
    results: [
      {
        id: 111,
        media_type: 'movie',
      },
      {
        id: 222,
        media_type: 'tv',
      },
      {
        id: 333,
        media_type: 'person',
      },
      {
        id: 444,
        media_type: 'tv',
      },
      {
        id: 555,
        media_type: 'movie',
      },
    ]
  };
  test('findSearchResults successful response only movies and person filtered', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: searchResponseDto });
    let actualResult = await searchService.findSearchResults('test');
    expect(actualResult).toBeDefined();
    expect(actualResult.results.length).toBe(3);
    expect(actualResult.results.find(item => item.id === 555)).toBeDefined();
    expect(actualResult.results.find(item => item.id === 333)).toBeDefined();
    expect(actualResult.results.find(item => item.id === 111)).toBeDefined();
  })
})
