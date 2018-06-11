/// <reference path="./interfaces.d.ts"/>

export class Config {

  public static getServices = ():services => {

    // let port:string = document && document.location ? dhttp://localhost:8091/loginocument.location.port : '8092';
    let port = 8092;

    let prodService:appointmentService = {
      base: 'https://loginservice.com/',
      login: 'login',
      login_success: {"status":"ok"},
      appointments: 'appointments',
    }

    let devService:appointmentService =  {
      base: `http://localhost:${port}/`,
      login: 'login',
      login_success: {"status":"ok"},
      appointments: 'appointments',
    };

    let env:string = 'prod';

    if(document && document.location){
      let host = document.location.host;
      if(/(localhost)/.test(host)){
        env= 'dev';
      }
    }

    let state:services = {
      server_port: port,
      env: env,
      params: env === 'prod' ? prodService : devService
    }

    return state;
  }
}

export default Config;
