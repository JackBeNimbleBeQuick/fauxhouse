import * as React from 'react';

class About extends React.Component <any, any > {

  //@TODO move this into inrerface.pageProps
  static defaultProps = {
    bigWords:'What about us...',
    smallWords:'Lomo proident selvage, everyday carry vegan austin qui meh consequat twee hammock nulla kale chips flannel. Aliquip irure fugiat, woke beard yuccie eiusmod. Pour-over +1 unicorn, franzen aliquip banh mi tumblr af. Ex do stumptown, elit wolf paleo authentic hot chicken pabst culpa pariatur polaroid twee 3 wolf moon. Migas ut YOLO, in est ugh sustainable in enamel pin prism listicle. Locavore brunch jean shorts fixie forage exercitation austin. Tousled ut quis health goth nulla tumblr.'

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
            <blockquote>
              <p className="small">{this.props.smallWords}</p>
            </blockquote>
        </div>
        <div className="bg">
          <img src="css/images/expansivesky.png"/>
        </div>
      </div>
    );
  }
}

export default About;
