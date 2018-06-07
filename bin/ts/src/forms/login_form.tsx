import * as React from 'react';
import {Session} from '../com/Session';

class LoginForm extends React.Component <any, any > {
  //@TODO move this into inrerface.pageProps
  static defaultProps = {
    session: new Session(),
    validate: {
      aword:{
        validator: /(password)/, //this is obviously wrong...
        message: 'This is not a strong password',
        filter: null
      },
      login:{
        validator:/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        message: 'something does not look right',
        filter: null
      },
    }
  }

  constructor(props:any){
    super(props);
    this.state = {
      name: 'login',
      isvalid: false,
      message: '',
      aword: '',
      login: '',
    }
    this.submit.bind(this);
    this.forgotten.bind(this);
    this.changes.bind(this);
  }

  submit = (el:any) => {
    el.preventDefault();
    let valid = true;
    let validate = this.props.validate;
    for(let field in validate){
      let message = validate[field]['message'];
      let valid_  = validate[field]['validator'];
      let value   = this.state[field];
      let valid   = valid_.test(value);
      if(!valid){
        this.setState({message: message});
        return false;
      }
    }
    if(valid){
      let post = {
        username: this.state.login,
        password: this.state.aword,
      }
      this.props.session.login(post,this.loggedin,this.issues);
    }
    return true;
  }

  loggedin = (response:boolean) => {
    document.location.hash = '#appointments';
  }

  issues = (response:any) => {
    console.log(response);
  }

  forgotten = (el:any) => {
    el.preventDefault();
  }

  changes = (e:any) => {
    let name  = e.target.name;
    let value = e.target.value;
    this.setState({[name]: value});
  }

  render() {
    let messagestate = this.state.message.length ? 'error active' : 'error';

    return (
        <div className="form center"
              onChange = { el => this.changes(el)}>

          <form  onSubmit={ e => this.submit(e) } >
            <span className={messagestate}> {this.state.message}</span>
            <div>
              <input name="login" placeholder="Email" type="email" value={this.state.login} />
            </div>
            <div>
              <input name="aword" placeholder="Password" type="password" value={this.state.password} />
            </div>

            <input type="submit" value="submit"/>

          </form>
          <span className="bottom right">
            <a href="#forgot"
              onClick = { el => this.forgotten(el)}>Forgotten?</a>
          </span>
        </div>
    );
  }
}

export default LoginForm;
