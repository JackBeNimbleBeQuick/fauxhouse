import * as React from 'react';

class About extends React.Component <any, any > {

  //@TODO move this into inrerface.pageProps
  static defaultProps = {
    bigWords:'About LifeDojo',
  }

  constructor(props:any){
    super(props);
    this.state = {
      name: 'about',
      props: this.props
    }
  }

  render() {
    return (
      <div className="header about">
        <div className="text down">
            <h1 className="left">{this.state.props.bigWords}</h1>
        </div>
        <img src="css/images/glenn.png"/>
      </div>
    );
  }
}

export default About;
