import * as React from 'react';

class Blog extends React.Component <any, any > {

  //@TODO move this into inrerface.pageProps
  static defaultProps = {
    bigWords:'What we write about ....',
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
      <div className="header  blog">
        <div className="text">
          <h1 className="left">{this.state.props.bigWords}</h1>
        </div>
        <div className="bg">
          <img src="css/images/bamboo_steps.png"/>
        </div>
      </div>
    );
  }
}

export default Blog;
