import * as React from 'react';

import Radio from  '../component/radio';
import {Dates} from '../common/util/Dates';

class CheckinForm extends React.Component <any, any > {
  //@TODO move this into inrerface.pageProps
  static defaultProps = {
    show: 'left',
    checkIn: ()=>{alert('override me you fool 8^]')},
    history: ()=>{alert('override me you fool 8^]')}
  }

  constructor(props:any){
    super(props);
    let today = Dates.datesFormat(new Date(),'yyyy-mm-dd');
    // console.log(today);
    // console.log(new Date().getMonth());
    this.state = {
      mode:'checkin',
      date: today,
      comment: ''
    }
    this.submit.bind(this);
    this.changes.bind(this);
  }

  history = (e:any ) =>{
    e.preventDefault()
    // console.log(e);
    this.props.history(e);
  }

  //@TODO there is a whole query by date thing
  // . that could happen here
  // . this would apply for that
  setDate = (e:any) => {
    let value = e.target.value;
    let date = new Date(value);
    if(  date instanceof Date ){
    }else{
      date = new Date();
    }
     this.setState({
       date:Dates.datesFormat(date,'yyyy-dd-mm')
     });
  }

  //@TODO there is query by date not implemented
  submit = (el:any) => {
    el.preventDefault();
    this.setState({comment:''});

    let date = this.state.date;
    let iss  = typeof date == 'string';
    let isdo = date instanceof Date;
    if( this.state.mode=='checkin' ){
      date = new Date();
    }else if(iss && ! isdo && date.length > 0){
      date = new Date(date);
    }

    let s_date = Dates.datesFormat(date,'yyyy-mm-dd').trim();
    this.props.checkIn({
      date: s_date,
      comment: this.state.comment,
      'check-in': true
    });

    return true;
  }

  changes = (e:any) => {
    let name  = e.target.name;
    let value = e.target.value;
    this.setState({[name]: value});
  }

  render() {
    let classes = ['form','slider', this.props.show]
    return (
        <div className={classes.join(' ')}>
          <form
            onChange = { el => this.changes(el)}
            onSubmit={ e => this.submit(e) } >
            <span>
              <i className="error">{this.state.message}</i>
            </span>
            <ul className="row">
              <li>
                <Radio
                    name = "mode"
                    label= "Check-in"
                    select =  { this.state.mode === 'checkin' }
                    value="checkin"
                    handler = {this.changes}
                />
              </li>
              <li>
                <Radio
                    name = "mode"
                    label= "Query by date"
                    select =  { this.state.mode === 'query' }
                    value="query"
                    handler = {this.changes}
                />
              </li>
              <li className="pull-right">
                <a data-state="button" href="#getRecent"
                  onClick={e => this.history(e)}
                   >Get history </a>
              </li>
            </ul>
            <div className="pull-left">
              <input name="date" placeholder="Date" type="date" value={this.state.date}
                onChange={e => this.setDate(e)}
              />

            </div>
            <div className="center">
              <textarea name="comment" value={this.state.comment}
                onChange={e => this.changes(e)}
                >{this.state.comment}</textarea>
              <input type="submit" value="submit"/>
            </div>


          </form>
        </div>
    );
  }
}

export default CheckinForm;
