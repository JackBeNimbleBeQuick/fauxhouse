import * as React from 'react';

class Demo extends React.Component <any, any > {

  //@TODO move this into inrerface.pageProps
  static defaultProps = {
    bigWords:'Request a Demo',
  }

  constructor(props:any){
    super(props);
    this.state = {
      name: 'demo',
      props: this.props
    }
  }

  render() {
    return (
      <div className="header bg-image demo">
        <div className="text large">
          <h1>{this.state.props.bigWords}</h1>
        </div>
        <div className="bg">
          <img src="css/images/bamboo_lane.png"/>
        </div>
      </div>
    );
  }
}

export default Demo;
