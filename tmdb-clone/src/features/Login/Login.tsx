import React, { Component, RefObject } from 'react';
import './login.css';
import { RouteComponentProps } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import AuthenticationService from '../../services/AuthenticationService';

type LoginProps = {

};

type LoginState = {
  loginError: boolean;
};

class Login extends Component<RouteComponentProps<LoginProps>, LoginState> {
  userNameInput: RefObject<HTMLInputElement>;

  passwordInput: RefObject<HTMLInputElement>;

  authService: AuthenticationService;

  constructor(props: RouteComponentProps<LoginProps>) {
    super(props);
    this.userNameInput = React.createRef();
    this.passwordInput = React.createRef();
    this.authService = new AuthenticationService();
    this.state = {
      loginError: false,
    };
  }

  handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = this.userNameInput?.current?.value;
    const password = this.passwordInput?.current?.value;
    if (username && password) {
      const loginResult = await this.authService.login(username, password);
      if (loginResult) {
        this.props.history.push('/');
      } else {
        this.setState({
          loginError: true,
        });
      }
    }
  };

  render = () => (
    <div className="login-wrapper">
      <div className="login-content__wrapper">
        <div className="login-wrapper">
          <h2 className="login-header">Login to your account</h2>
          <Form onSubmit={this.handleFormSubmit}>
            <Form.Field
              icon="user"
              iconPosition="left"
            >
              <label className="login-text">Username</label>
              <input ref={this.userNameInput} placeholder="Username" />
            </Form.Field>
            <Form.Field>
              <label className="login-text">Password</label>
              <input ref={this.passwordInput} type="password" placeholder="Password" />
            </Form.Field>
            <Button type="submit" color="blue">Login</Button>

            <Button color="twitter">
              <a className="login-link" href="https://www.themoviedb.org/signup">Register </a>
            </Button>

          </Form>

          {this.state.loginError ? <h3 className="login-error">We could not validate your information. Want to try again?</h3> : ''}
        </div>
      </div>
    </div>
  );
}

export default Login;
