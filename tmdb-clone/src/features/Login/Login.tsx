import React, { Component, RefObject } from "react";
import './login.css';
import AuthenticationService from './../../services/AuthenticationService';
type LoginProps = {

}
class Login extends Component<{}, {}> {
  userNameInput: RefObject<HTMLInputElement>;
  passwordInput: RefObject<HTMLInputElement>;
  authService: AuthenticationService;
  constructor(props: LoginProps) {
    super(props);
    this.userNameInput = React.createRef();
    this.passwordInput = React.createRef();
    this.authService = new AuthenticationService();
    // this.state = {
    //   loginError: false
    // }
  }
  handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let username = this.userNameInput?.current?.value;
    let password = this.passwordInput?.current?.value;
    if (username && password) {
      await this.authService.login(username, password);
    }
    // if (result) {
    //   this.props.history.push('/');
    // }
    // else {
    //   this.setState({
    //     loginError: true
    //   });
    // }
  }
  render = () => {
    return (
      <>
        <form
          className="transparent"
          onSubmit={this.handleFormSubmit}>
          <div className="formFilter">
            <h3 className="formText"> provide your credentials</h3>
            <div className="form-inner">
              <label htmlFor="username">UserName</label>
              <input
                type="text"
                className="userName"
                ref={this.userNameInput} />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="password"
                ref={this.passwordInput} />
              <label htmlFor=""></label>
              <input
                type="submit"
                value="log-in" />
              {/* {this.state.loginError ? <div className="login-error">invalid username or password</div> : ''} */}
            </div>
          </div>
        </form>
      </>
    );
  }

}
export default Login;
