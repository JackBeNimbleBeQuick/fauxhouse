import * as React from 'react';

class Solution extends React.Component <any, any > {

  //@TODO move this into inrerface.pageProps
  static defaultProps = {
    bigWords:'Evidence-based, Employee-loved',
    smallWords:'12-week programs',
  }

  constructor(props:any){
    super(props);
    this.state = {
      name: 'home',
      props: this.props
    }
  }

  render() {
    return (
      <div className="header">
        <div className="text">
          <h1>{this.state.props.bigWords}</h1>
          <h1>{this.state.props.smallWords}</h1>
        </div>
        <img src="css/images/solution.png"/>
      </div>
    );
  }
}

export default Solution;
