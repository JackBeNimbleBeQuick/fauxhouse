import * as React from 'react';

class Solution extends React.Component <any, any > {

  //@TODO move this into inrerface.pageProps
  static defaultProps = {
    bigWords:'Journey through full vertical solutions',
    smallWords:'Where all channels are open to a unified presentation',
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
      <div className="header  solution">
        <div className="text">
          <h1>{this.state.props.bigWords}</h1>
          <blockquote>
          <p>{this.state.props.smallWords}</p>
          </blockquote>
        </div>
        <div className="bg">
          <img src="css/images/lawn.png"/>
        </div>
      </div>
    );
  }
}

export default Solution;
