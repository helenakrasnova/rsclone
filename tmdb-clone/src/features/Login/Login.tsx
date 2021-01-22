import React, { Component, RefObject } from "react";
import './login.css';
import AuthenticationService from './../../services/AuthenticationService';
import { RouteComponentProps } from 'react-router-dom';
import { Form, Button, Checkbox } from "semantic-ui-react";
type LoginProps = {

}
// type LoginState = {
//   loginError: boolean;
// }
class Login extends Component<RouteComponentProps<LoginProps>, {}> {
  userNameInput: RefObject<HTMLInputElement>;
  passwordInput: RefObject<HTMLInputElement>;
  authService: AuthenticationService;
  constructor(props: RouteComponentProps<LoginProps>) {
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
      let loginResult = await this.authService.login(username, password);
      if (loginResult) {
        this.props.history.push('/');
      }
    }
    // else {
    //   this.setState({
    //     loginError: true
    //   });
    // }
  }
  render = () => {
    return (
      <>
        <div className="login-wrapper">
          <div className="login-content__wrapper">
            <div className="login-wrapper">
              <h2 className='login-header'>Login to your account</h2>
               <Form onSubmit={this.handleFormSubmit}>
                <Form.Field
                  icon='user'
                  iconPosition='left'>
                  <label className="login-text">Username</label>
                  <input ref={this.userNameInput} placeholder='Username' />
                </Form.Field>
                <Form.Field>
                  <label className="login-text">Password</label>
                  <input ref={this.passwordInput} type='password' placeholder='Password' />
                </Form.Field>
                <Button type='submit' color="blue">Login</Button>
              </Form>

            </div>
          </div>
        </div>

        {/* {this.state.loginError ? <div className="login-error">invalid username or password</div> : ''} */}
        {/* </div>
          </div>
        </form> */}
      </>
    );
  }

}
export default Login;
