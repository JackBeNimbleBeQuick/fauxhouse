///<reference path="interfaces.d.ts"/>


import * as React from 'react';
import Navbar from './src/containers/parts/navbar';
import Home from './src/containers/views/home';
import Solution from './src/containers/views/solution';
import About from './src/containers/views/about';
import Demo from './src/containers/views/demo';
import Blog from './src/containers/views/blog';
import Login from './src/containers/views/login';
import Logout from './src/containers/views/logout';
import Appointments from './src/containers/views/appointments';
import {Session} from './src/com/Session';


class App extends React.Component  < any, any > {

  static defaultProps:mainProps = {
    switch_time: 1000,
    filter: /\b(home|solution|about|demo|blog|checkins|login|logout|appointments|logout)\b/,
    seq: {
      '#home': {num: 1, label: 'Your are home'},
      '#solution': {num: 2, label: 'We have the solutions'},
      '#about': {num: 3, label: 'Learn more about us'},
      '#demo': {num: 4, label: 'Ask for a Demo'},
      '#blog': {num: 5, label: 'Read what we think about'},
      '#appointments': {num: 6, label: 'What is my status'},
      '#login': {num: 7, label: 'Login'},
      '#logout': {num: 8, label: 'Logout'},
    }
  }

  constructor(props:any){
    super(props);
    let session = new Session();

    this.state = {
      session: session,
      triggerNav: false,
      menu: 'up',
      page: '#home',
      c_card: 'carda',
      carda: <Home/>,
      cardb: null,
    }
    //Using very lite weight
    window.addEventListener('popstate', (e:Event) => {this.handleChange(e); });
  }


  container = (hash:string) => {
    if(( this.props.filter ).test(hash) ){
      switch (hash){
        case '#solution':
          return <Solution/>
        case '#about':
          return <About/>
        case '#demo':
          return <Demo/>
        case '#blog':
          return <Blog/>
        case '#appointments':
          return <Appointments/>
        case '#logout':
          this.setState({triggerNav: true});
          return <Logout/>
        case '#login':
          return <Login/>
      }
    }
    return <Home/>
  }

  /**
   * To support direct external changes there are now
   * 2 calls for each switch
   * @param  {Event} e
   * @return {void}
   */
  handleChange = (e:Event) => {
    let el = e.target;
    let href:string|null = null;
    if(el instanceof HTMLAnchorElement){
      href = el.getAttribute('href');
    }
    if(el instanceof Window){
      href = document.location.hash;
    }

    if(href && href !== this.state.page){

      // console.log(href);
      // what is next card name
      let ccard = this.state.c_card;
      let ncard = ccard == 'carda' ? 'cardb' : 'carda';
      let next = this.container(href ? href : '#home');
      // console.log(`current: ${ccard} next: ${ncard} `);

      this.setState({
        menu: 'up',
        page: href,
        c_card: ncard,
        [ncard]: next,
        n_page: href
      });

    }
    return true;
  }

  //@TODO sort out the react events ... have not found the right ones yet
  toggleMenu = (e:any) => {
    this.setState({
      menu: this.state.menu == 'up' ? 'down' : 'up'
    })
  }

  render() {


    //@NOTE the current implemention provides a washboard slider
    // ... adding direction will allow ordering ... will do this later
    // ... same approach can now support cube flips and a number of other transforms
    let nav   = ['nav-button']
    let slide = ['menu','slider']
    let ccard = this.state.c_card;
    let page  = this.state.page;
    let main  = 'main ' + ccard ;

    if(this.state.menu == 'down'){
      nav.push('down');
      slide.push('down');
    }

    document.title = this.props.seq[page].label;

    return (
      <div className={main} >
        <button className= {nav.join(' ')}
          onClick={ e => this.toggleMenu(e) }>

          <span className="icon icon-menu-hamburger"></span>
        </button>

        <span className={slide.join(' ')}>
          <Navbar
            toggle = {this.state.triggerNav}
            position = {this.state.menu}
            handler={this.handleChange}/>
        </span>
        <Navbar
          toggle = {this.state.triggerNav}
          handler={this.handleChange}
        />
        <div className="carda">
          {this.state.carda}
        </div>
        <div className="cardb">
          {this.state.cardb}
        </div>
      </div>
    );
  }
}

export default App;
