import * as React from 'react';
import {Session} from '../com/Session';

class Logout extends React.Component <any, any > {

  //@TODO move this into inrerface.pageProps
  static defaultProps = {
    bigWords:'Thanks for logging time with us 8^).',
    smallWords:'The process works, keep coming back...',
  }

  constructor(props:any){
    super(props);
    this.state = {
      name: 'home',
      props: this.props
    }
    new Session().logout();
  }

  render() {
    return (
      <div className="header home">
        <div className="text">
          <h1>{this.state.props.bigWords}</h1>
          <h4>{this.state.props.smallWords}</h4>
        </div>
        <img src="css/images/glenn.png"/>
      </div>
    );
  }
}

export default Logout;
