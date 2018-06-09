import * as React from 'react';
import Link from '../../component/link';
import {Session} from '../../com/Session';

class Navbar extends React.Component <any, any > {


  component:React.Component;

  //@TODO move this into inrerface.navProps
  static defaultProps = {
    session: new Session(),
    position: '',
    triggerNav: false,
    bars:[
      {home: 'Welcome'},
      {solution: 'Our Solution'},
      {about: 'About Us'},
      {demo: 'Demo'},
      {blog: 'Blog'},
      {appointments: 'Check-ins'},
      {login: 'Login'},
    ],
    handler: () => { alert('override me')}
  }

  constructor(props:any){
    super(props);
    this.props.handler.bind(this);
    this.component = this;
  }

  renderItems = () => {

    let status = this.props.session.loggedIn();
    let handler = this.props.handler;
    let items = this.props.bars.map( (item:any, i:string) => {
      let key = Object.keys(item)[0];
      let name = '#'+ key;
      let label = item[key];
      //A really rough test for permits... ///
      // @NOTE just completing the loop on an idea I had
      let show = key !=='appointments' || this.props.session.permitted(key);
      if( status === true &&  key === 'login'){
        name = "#logout";
        label = "Log Out";
      }


      if(show){
        return(
          <li key={i} className={key} >
            <Link
              name = {name}
              label= {label}
              handler = {handler}
            />
          </li>
        );
      }
      return '';
    });
    return items;
  }

  render() {

    let items:any = this.renderItems();
    let classes = ['row','nav', this.props.position];

    return(
      <ul className={classes.join(' ')}>
        {items}
      </ul>
    );

  }

}

export default Navbar;
