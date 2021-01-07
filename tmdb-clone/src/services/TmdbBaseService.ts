class TmdbBaseService {
  baseUrl: string;
  apiKey: string;
  token: string | null;
  constructor() {
    this.baseUrl = 'https://api.themoviedb.org/3';
    this.apiKey = 'ba0b8e9ed78729e1cfe4267f114108cd';
    this.token = null;
  }
  addApiKey = (url: string): string => {
    return `${url}?api_key=${this.apiKey}`;
  }
}
export default TmdbBaseService;
