import * as React from 'react';

class Home extends React.Component <any, any > {

  //@TODO move this into inrerface.pageProps
  static defaultProps = {
    bigWords:'Health, one habit at a time.',
    smallWords:'Our approach and philospy is unique in our field.',
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
      <div className="header bg-image home">
        <div className="text">
          <h1>{this.state.props.bigWords}</h1>
          <h4>{this.state.props.smallWords}</h4>
        </div>
        <div className="bg">
          <img src="css/images/openfield.png"/>
        </div>
      </div>
    );
  }
}

export default Home;
