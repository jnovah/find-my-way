import React, { Component } from 'react'
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

class Login extends Component {
  render() {
    return(
      <div>Welcome to Find My Way</div>

      <GoogleSigninButton
        style={{width: 48, height: 48}}
        size={GoogleSigninButton.Size.Icon}
        color={GoogleSigninButton.Color.Dark}
        onPress={this._signIn.bind(this)}/>
    )
  }
}

export default Login
