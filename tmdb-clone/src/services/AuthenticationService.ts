import axios, { AxiosResponse } from 'axios';
import TmdbBaseService from './TmdbBaseService';
type TokenResponse = {
  success: boolean;
  expires_at: string;
  request_token: string;
}
type SessionResponse = {
  success: boolean;
  session_id: string;
}

class AuthenticationService extends TmdbBaseService {
  token: string | null;
  sessionId: string | null;
  constructor() {
    super();
    this.token = null;
    this.sessionId = null;
  }

  public login = async (username: string, password: string) => {
    let sessionId: string | undefined = await this.getSessionId(username, password);
    if (sessionId) {
      localStorage.setItem('sessionId', sessionId);
    }
    else {
      console.error('unable to get sessionId');
    }
  }

  public getCurrentSessionId = () => {
    const sessionId = localStorage.getItem('sessionId');
    return sessionId ? sessionId : null;
  }

  private validateToken = async (username: string, password: string, currentToken: string) => {
    let url: string = this.addApiKey(`${this.baseUrl}/authentication/token/validate_with_login`);
    let requestBody: object = {
      username: username,
      password: password,
      request_token: currentToken,
    }
    try {
      let response: AxiosResponse<TokenResponse> = await axios.post<TokenResponse>(url, requestBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data.request_token;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private getToken = async (): Promise<string> => {
    if (this.token) {
      return this.token;
    }
    let url: string = this.addApiKey(`${this.baseUrl}/authentication/token/new`);
    let response: AxiosResponse<TokenResponse> = await axios.get<TokenResponse>(url);
    return response.data.request_token;
  }

  private getSessionId = async (username: string, password: string) => {
    if (this.sessionId) {
      return this.sessionId;
    }
    let currentToken: string = await this.getToken();
    await this.validateToken(username, password, currentToken);
    let url: string = this.addApiKey(`${this.baseUrl}/authentication/session/new`);
    let requestBody: object = {
      request_token: currentToken,
    }
    let response: AxiosResponse<SessionResponse> = await axios.post<SessionResponse>(url, requestBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data.session_id;
  }
}
export default AuthenticationService;
