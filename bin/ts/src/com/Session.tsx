/// <reference path="./interfaces.d.ts"/>
import Config from './Coms.config';
import {Connected} from './Connected';

export class Session implements Session{

  private connected:Connected|null = null;
  private config:services |null = null;
  private forward: Function;

  constructor(){
  }

  public permitted = (key:string) => {
    // console.log(`actions received: ${key}`);
    let stored = this.retrieve('login');
    // console.log(stored);
    if ( ! stored || ! this.logged(stored) ) return false;
    if(stored.permits && stored.permits.zones[key]) return stored.permits.zones[key];
    return false;
  }

  public login = (data:any, success:Function, error:Function) => {
    this.forward = success;

    let succeeds = (response:any) => {
      //@TODO work this into to validator
      let s_resp =  JSON.parse(response);
      let compare:any  = this.serviceConfig().params.login_success;
      if(s_resp.status && compare.status && s_resp.status === compare.status ){
        this.saveLogin({
          logged_in: true,
          pid: data.username,
          name: "Jack",
          key: 'login',
          permits:{ // making things explicit
            zones:{
              appointments: true
            }
          },
        });
        console.log('oko <8^] ')
        console.log(response);
        console.log(s_resp);
        console.log(compare);
        console.log(this.config);
        return this.forward(true);
      }
      console.log('ooops !3^[ ')
      console.log(response);
      return error(response)
    }


    this.connect().send(this.loginPostage(data),succeeds, error);
  }

  public logout = () => {
    window.sessionStorage
     ? window.sessionStorage.clear()
     : null;
   return true;
  }

  public loggedIn = ():boolean => {
    return this.logged(this.retrieve('login'));
  }

  private logged = (session: SessionData) => {
    let login = this.retrieve('login');
    if(login && login.logged_in) return login.logged_in;
    return false;
  }

  public serviceConfig  = ():services=> {
    if(this.config) return this.config;
    this.config = Config.getServices();
    return this.config;
  }

  private connect = () => {
    if (this.connected) return this.connected;
    this.connected  = new Connected();
    return this.connected;
  }

  private loginPostage = (data:Object) => {
    if( ! this.config) this.config = Config.getServices();
    let service = this.serviceConfig().params;
    return {
        url: service.base + service.login,
        type: 'POST',
        data: JSON.stringify(data),
    }
  }

  private saveLogin = (data: SessionData) =>{
    this.storage().setItem(data.key, JSON.stringify(data));
  }

  private storage = () => {
    if (window.sessionStorage) {
      return window.sessionStorage;
    }
    throw Error('this device / browser is not supportind sessionStorage ~8^[');
  }

  /**
   * Provides access to sessionStorage | boolean | throw fit
   * @return {boolean | SessionData }
   */
  public retrieve = (key:string) => {
    let store = this.storage();
    let  found = store.getItem(key);
    if( typeof found ==='string' && found.length) return JSON.parse(found);
    return null;
  }
}
