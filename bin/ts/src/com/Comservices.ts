
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

  //POST
  /**
   * @TODO Move this to somewhere that makes better sense
   * Get Appointments History
   * @param {Function} success [description]
   * @param  {Function} error   [description]
   * @return {void} Connected:sends passes results to the passed in functions
   */
  public post = (post:appointmentHistory ,success:Function, error:Function ) =>{
    let params = this.services.params;
    this.forward = success;
    this.connect.send({
      url: params.base + params.appointments,
      type: 'POST',
      data: JSON.stringify(post),
      header_type: 'form'
    },this.packager, error);
  }

  //GET
  /**
   * @TODO Move this to somewhere that makes better sense
   * Get Appointments History
   * @param {Function} success [description]
   * @param  {Function} error   [description]
   * @return {void} Connected:sends passes results to the passed in functions
   */
  public get= (success:Function, error:Function ) =>{
    let params = this.services.params;
    this.forward = success;
    this.connect.send({
      url: params.base + params.appointments,
      type: 'GET',
      data: null, // 8^) looking into this
      header_type: 'form'
    },this.packager, error);
  }

  //PACKAGE
  /**
   * To handle hydration and any other needs that may be needed
   * as the app layer evolves so as to provide
   * . single simple call signatures at app level
   * . offload and communication details from the app layer
   * . maintain reusability with other communication types
   * @param  data [description]
   * @return      [description]
   */
  private packager = (data:any) => {
    console.log(data);
    let boxed = typeof data === 'object' ? data : JSON.parse(data);
    return this.forward(boxed);
  }


}
