import * as React from 'react';

import LoginForm from '../../forms/login_form';

class Login extends React.Component <any, any > {

  //@TODO move this into inrerface.pageProps
  static defaultProps = {
  }

  constructor(props:any){
    super(props);
    this.state = {
      name: 'login',
      props: this.props
    }
  }

  render() {
    return (
      <div className="header  login">
        <LoginForm
        />
        <div className="bg">
          <img src="css/images/forest.png"/>
        </div>
      </div>
    );
  }
}

export default Login;
