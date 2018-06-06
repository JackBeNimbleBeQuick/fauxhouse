
/// <reference path="../com/interfaces.d.ts"/>
import * as React from 'react';
import CheckinForm from '../forms/checkin_form';
import Checkins from './checkins';
import {Comservices} from '../com/Comservices'

class Appointments extends React.Component <any, any > {

  //@TODO move this into inrerface.pageProps
  static defaultProps = {
    services: new Comservices(),
    title: 'A place to check in and catch up on your activities'
  }

  constructor(props:any){
    super(props);
    this.state = {
      showQuery: true,
      showList: false,
      name: 'home',
      checkins: {},
      props: this.props
    }
  }

  toggleQuery = (e:any) => {
    e.preventDefault();
    this.state.showQuery ? this.setState({showQuery:false}) : this.setState({showQuery:true}) ;
  }

  renderList = (response:any) => {
    this.setState({showQuery: false});
    this.setState({checkins: response})
  }

  serviceError = (response:any) => {
    console.log(response);
  }

  getHistory = () => {
    this.props.services.get(
      this.renderList,
      this.serviceError
    );
  }

  checkIn = (data: appointmentHistory) => {
    this.props.services.post(
      data,
      this.renderList,
      this.serviceError
    );
  }

  render() {

    let show         = this.state.showQuery ? 'show' : 'left';
    let showCheckins = this.state.showList ? 'show' : 'down';
    return (
      <div className="page">

        <div className="header home">

          <div className="text">
            <h2>{this.props.title}</h2>
          </div>

          <span className="left top">
            <a data-state="button" href="#getForm"
              onClick={ e => this.toggleQuery(e) }
              >Make / Edit</a>
          </span>

          <img src="css/images/waterpath.png"/>
        </div>

        <CheckinForm
          history= {this.getHistory}
          checkIn = {this.checkIn}
          show = { show }
        />
        <Checkins
          handler = {this.getHistory}
          show = { showCheckins }
          data = {this.state.checkins}
        />
      </div>
    );
  }
}

export default Appointments;
