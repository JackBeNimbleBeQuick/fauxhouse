import * as React from 'react';

class Blog extends React.Component <any, any > {

  //@TODO move this into inrerface.pageProps
  static defaultProps = {
    bigWords:'About LifeDojo',
  }

  constructor(props:any){
    super(props);
    this.state = {
      name: 'blog',
      props: this.props
    }
  }

  render() {
    return (
      <div className="header blog">
        <div className="text">
          <h1 className="left">{this.state.props.bigWords}</h1>
        </div>
        <img src="css/images/bamboo_lane.png"/>
      </div>
    );
  }
}

export default Blog;
