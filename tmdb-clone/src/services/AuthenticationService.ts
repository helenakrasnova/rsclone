import axios, { AxiosResponse } from 'axios';
import { AccountDetailsResponseDto } from '../models/Account/AccountDetailsResponseDto';
import TmdbBaseService from './TmdbBaseService';

type TokenResponse = {
  success: boolean;
  expires_at: string;
  request_token: string;
};
type SessionResponse = {
  success: boolean;
  session_id: string;
};

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

  public login = async (
    username: string,
    password: string,
  ): Promise<AccountDetailsResponseDto | undefined | null> => {
    try {
      const sessionId: string | undefined = await this.getSessionId(username, password);
      if (sessionId) {
        localStorage.setItem(this.sessionIdKey, sessionId);
        const accountDetails = await this.getAccountDetails();
        if (accountDetails) {
          localStorage.setItem(this.accountDetailsKey, JSON.stringify(accountDetails));
          return accountDetails;
        }

        console.error('unable to get account details');
        return null;
      }
      console.error('unable to get sessionId');
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  public static isAuthenticated = (): boolean => {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
      return true;
    }
    return false;
  };

  public logOut = (): void => {
    localStorage.removeItem(this.sessionIdKey);
    localStorage.removeItem(this.accountDetailsKey);
  };

  public getCurrentAccountDetails = (): AccountDetailsResponseDto | null => {
    const accountDetails = localStorage.getItem(this.accountDetailsKey);
    if (accountDetails) {
      return JSON.parse(accountDetails);
    }
    return null;
  };

  public getCurrentSessionId = (): string | null => {
    const sessionId = localStorage.getItem(this.sessionIdKey);
    return sessionId || null;
  };

  private validateToken = async (username: string, password: string, currentToken: string) => {
    const url: string = this.addApiKey(`${this.baseUrl}/authentication/token/validate_with_login`);
    const requestBody: unknown = {
      username,
      password,
      request_token: currentToken,
    };
    try {
      const response: AxiosResponse<TokenResponse> = await axios.post<TokenResponse>(
        url, requestBody, {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data.request_token;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  private getToken = async (): Promise<string> => {
    if (this.token) {
      return this.token;
    }
    const url: string = this.addApiKey(`${this.baseUrl}/authentication/token/new`);
    const response: AxiosResponse<TokenResponse> = await axios.get<TokenResponse>(url);
    return response.data.request_token;
  };

  private getSessionId = async (username: string, password: string) => {
    const sessionId = this.getCurrentSessionId();
    if (sessionId) {
      return sessionId;
    }
    const currentToken: string = await this.getToken();
    await this.validateToken(username, password, currentToken);
    const url: string = this.addApiKey(`${this.baseUrl}/authentication/session/new`);
    const requestBody: unknown = {
      request_token: currentToken,
    };
    const response: AxiosResponse<SessionResponse> = await axios.post<SessionResponse>(
      url, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data.session_id;
  };

  private getAccountDetails = async (): Promise<AccountDetailsResponseDto> => {
    let url: string = this.addApiKey(`${this.baseUrl}/account`);
    const sessionId = this.getCurrentSessionId();
    url += `&session_id=${sessionId}`;
    const response:
    AxiosResponse<AccountDetailsResponseDto> = await axios.get<AccountDetailsResponseDto>(url);
    return response.data;
  };
}

export default AuthenticationService;
