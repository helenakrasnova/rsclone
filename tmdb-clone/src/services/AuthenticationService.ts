import axios, { AxiosResponse } from 'axios';
import { AccountDetailsResponseDto } from '../models/Account/AccountDetailsResponseDto';
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
  sessionIdKey: string;
  accountDetailsKey: string;
  constructor() {
    super();
    this.token = null;
    this.sessionIdKey = 'sessionId';
    this.accountDetailsKey = 'accountDetailsKey';
  }

  public login = async (username: string, password: string): Promise<AccountDetailsResponseDto | undefined> => {
    let sessionId: string | undefined = await this.getSessionId(username, password);
    if (sessionId) {
      localStorage.setItem(this.sessionIdKey, sessionId);
      let accountDetails = await this.getAccountDetails();
      if (accountDetails) {
        localStorage.setItem(this.accountDetailsKey, JSON.stringify(accountDetails));
        return accountDetails;
      }
    }
    else {
      console.error('unable to get sessionId');
    }
  }

  public isAuthenticated = (): boolean => {
    if (this.getCurrentAccountDetails() && this.getCurrentSessionId()) {
      return true;
    }
    return false;
  }

  public logOut = (): void => {
    localStorage.removeItem(this.sessionIdKey);
    localStorage.removeItem(this.accountDetailsKey);
  }

  public getCurrentAccountDetails = (): AccountDetailsResponseDto | null => {
    let accountDetails = localStorage.getItem(this.accountDetailsKey);
    if (accountDetails) {
      return JSON.parse(accountDetails);
    }
    return null;
  }

  public getCurrentSessionId = () => {
    const sessionId = localStorage.getItem(this.sessionIdKey);
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
    let sessionId = this.getCurrentSessionId();
    if (sessionId) {
      return sessionId;
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

  private getAccountDetails = async (): Promise<AccountDetailsResponseDto> => {
    let url: string = this.addApiKey(`${this.baseUrl}/account`);
    const sessionId = this.getCurrentSessionId();
    url += `&session_id=${sessionId}`;
    let response: AxiosResponse<AccountDetailsResponseDto> = await axios.get<AccountDetailsResponseDto>(url);
    return response.data;
  }

}

export default AuthenticationService;
