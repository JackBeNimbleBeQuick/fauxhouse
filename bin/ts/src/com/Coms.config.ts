/// <reference path="./interfaces.d.ts"/>

export class Config {

  public static getServices = ():services => {

    let prodService:appointmentService = {
      base: 'https://somewhereNice.com/',
      login: 'login',
      login_success: {"status":"ok"},
      appointments: 'check-ins',
    }

    let devService:appointmentService =  {
      base: 'http://localhost:8081/',
      login: 'login',
      login_success: {"status":"ok"},
      appointments: 'check-ins',
    };

    let env:string = 'prod';

    if(document && document.location){
      let host = document.location.host;
      if(/(localhost)/.test(host)){
        env= 'dev';
      }
    }

    let state:services = {
      env: env,
      params: env === 'prod' ? prodService : devService
    }

    return state;
  }
}

export default Config;
