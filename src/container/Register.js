import React, { Component } from 'react';
import Authentication from '../module/Authentication';

class Register extends Component {
  state = {
    email: '',
    password: '',
  };

  render() {
    return (
      <div>
        <input
          type="email"
          value={this.state.email}
          onChange={event => this.setState({ email: event.target.value })}
        />
        <input
          type="password"
          value={this.state.password}
          onChange={event => this.setState({ password: event.target.value })}
        />
        <button
          onClick={() =>
            Authentication.loginWithEmail(this.state.email, this.state.password)
          }
        >
          login with email
        </button>
        <button onClick={() => Authentication.loginWithGoogle()}>
          login with google
        </button>
      </div>
    );
  }
}

export default Register;
