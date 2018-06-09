/// <reference path="./interfaces.d.ts"/>

export class Config {

  public static getServices = ():services => {

    let port:string = document && document.location ? document.location.port : '8091';


    let prodService:appointmentService = {
      base: 'https://loginservice.com/',
      login: 'login',
      login_success: {"status":"ok"},
      appointments: 'check-ins',
    }

    let devService:appointmentService =  {
      base: `http://localhost:${port}/staging/`,
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
