
/// <reference path="./interfaces.d.ts"/>
import {Connected} from './Connected';
import {Session} from './Session';

export class Comservices{

  private services:services;

  private session:Session;

  private connect:Connected;

  private forward:Function;

  constructor(){
    this.session = new Session();
    this.services = this.session.serviceConfig();
    this.connect = new Connected();
  }


  //checkin  appointment
  /**
   * @TODO Move this to somewhere that makes better sense
   * Get Appointments History
   * @param {Function} success [description]
   * @param  {Function} error   [description]
   * @return {void} Connected:sends passes results to the passed in functions
   */
  public checkIn = (post:appointmentHistory ,success:Function, error:Function ) =>{
    let params = this.services.params;
    this.forward = success;
    this.connect.send({
      url: params.base + params.appointments,
      type: 'POST',
      data: post
    },this.packager, error);
  }

  //get week log
  /**
   * @TODO Move this to somewhere that makes better sense
   * Get Appointments History
   * @param {Function} success [description]
   * @param  {Function} error   [description]
   * @return {void} Connected:sends passes results to the passed in functions
   */
  public appointmentHistory = (success:Function, error:Function ) =>{
    let params = this.services.params;
    this.forward = success;
    this.connect.send({
      url: params.base + params.appointments,
      type: 'GET'
    },this.packager, error);
  }

  private packager = (data:any) => {
    console.log(data);
    let boxed = typeof data === 'object' ? data : JSON.parse(data);
    return this.forward(boxed);
  }


}
