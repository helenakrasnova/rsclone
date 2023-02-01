class TmdbBaseService {
  protected baseUrl: string;

  protected apiKey: string;

  protected token: string | null;

  constructor() {
    this.baseUrl = 'https://api.themoviedb.org/3';
    this.apiKey = '8d398210b8b32a20a13eede1a83dee17';
    this.token = null;
  }

  protected addApiKey = (url: string): string => `${url}?api_key=${this.apiKey}`;
}

export default TmdbBaseService;
