
/// <reference path="../../com/interfaces.d.ts"/>
import * as React from 'react';
import CheckinForm from '../../forms/checkin_form';
import Checkins from '../parts/checkins';
import {Dates} from '../../common/util/Dates';
import {Comservices} from '../../com/Comservices'

class Appointments extends React.Component <any, any > {

  //@TODO move this into inrerface.pageProps
  static defaultProps = {
    services: new Comservices(),
    title: 'A place to check in and catch up on your activities'
  }

  constructor(props:any){
    super(props);
    this.state = {
      showQuery: false,
      showList: false,
      name: 'home',
      checkins: {},
      props: this.props
    }
    setTimeout(()=>{this.setState({showQuery: true})},800);
  }

  toggleQuery = (e:any) => {
    e.preventDefault();
    this.state.showQuery ? this.setState({showQuery:false}) : this.setState({showQuery:true}) ;
  }

  renderList = (response:any) => {
    // console.log(response);
    this.setState({
      showQuery: false,
      showList: true,
      checkins: {list:response, type: 'history'},
    });
  }

  checkinSent = (response:any) => {
    // console.log(response);
    let s_today:string = Dates.datesFormat(new Date(),'yyyy-mm-dd');
    this.setState({
      showQuery: false,
      showList: true,
      checkins: {list:{[s_today]:true}, type: 'confirm'},
    });
  }

  serviceError = (response:any) => {
    // console.log(response);
  }

  getHistory = (e:any) => {
    // console.log(e);
    this.props.services.get(
      this.renderList,
      this.serviceError
    );
  }

  closeList = (e:any) => {
    this.setState({showList:false});
  }

  checkIn = (data: appointmentHistory) => {
    this.props.services.post(
      data,
      this.checkinSent,
      this.serviceError
    );
  }

  render() {

    let show         = this.state.showQuery ? 'show' : 'left';
    let showCheckins = this.state.showList ? 'show' : 'up';
    return (
      <div className="page">

        <div className="header  appointments">

          <div className="text">
            <h2>{this.props.title}</h2>
          </div>

          <span className="left top">
            <a data-state="button" href="#getForm"
              onClick={ e => this.toggleQuery(e) }
              >Make / Edit</a>
          </span>

          <div className="bg">
            <img src="css/images/waterpath.png"/>
          </div>

        </div>

        <CheckinForm
          history= {this.getHistory}
          checkIn = {this.checkIn}
          show = { show }
        />
        <Checkins
          handler = {this.getHistory}
          closeHandler = {this.closeList}
          listing = {this.state.checkins}
          show = {showCheckins}
        />
      </div>
    );
  }
}

export default Appointments;
