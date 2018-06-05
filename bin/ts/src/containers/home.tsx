import * as React from 'react';

class Home extends React.Component <any, any > {

  //@TODO move this into inrerface.pageProps
  static defaultProps = {
    bigWords:'Employee health, one habit at a time.',
    smallWords:'LifeDojo’s ongoing 12-week wellbeing programs inspire behavior change that lasts.',
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
      <div className="header home">
        <div className="text">
          <h1>{this.state.props.bigWords}</h1>
          <h4>{this.state.props.smallWords}</h4>
        </div>
        <img src="css/images/birchlawn.png"/>
      </div>
    );
  }
}

export default Home;
