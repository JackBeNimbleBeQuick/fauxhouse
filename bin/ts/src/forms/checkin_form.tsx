import * as React from 'react';

import Radio from  '../component/radio';
import {Utils} from '../common/utils';

class CheckinForm extends React.Component <any, any > {
  //@TODO move this into inrerface.pageProps
  static defaultProps = {
    show: '',
    checkIn: ()=>{alert('override me you fool 8^]')},
    handler: ()=>{alert('override me you fool 8^]')}
  }

  constructor(props:any){
    super(props);
    let today = Utils.datesFormat(new Date(),'yyyy-mm-dd');
    // console.log(today);
    // console.log(new Date().getMonth());
    this.state = {
      show: this.props.show,
      mode:'checkin',
      date: today,
      comment: ''
    }
    this.submit.bind(this);
    this.changes.bind(this);
  }

  getRecent = (e:any ) =>{
    e.preventDefault()
    this.setState({show:'left'});
    this.props.handler(e);
  }

  //@TODO there is a whole query
  //@TODO by date things that is not yet implemented
  // . this would apply for that
  setDate = (e:any) => {
    let value = e.target.value;
    let date = new Date(value);
    if(  date instanceof Date ){
    }else{
      date = new Date();
    }
     this.setState({
       date:Utils.datesFormat(date,'yyy-dd-mm')
     });
  }

  //@TODO there is query by date not implemented
  submit = (el:any) => {
    el.preventDefault();

    let date = this.state.date;
    let iss  = typeof date == 'string';
    let isdo = date instanceof Date;
    if( this.state.mode=='checkin' ){
      date = new Date();
    }else if(iss && ! isdo && date.length > 0){
      date = new Date(date);
    }

    let s_date = Utils.datesFormat(date,'yyyy-mm-dd').trim();
    let post = {
      date: s_date,
      comment: this.state.comment,
      'check-in': true
    }
    // console.log(JSON.stringify(post));
    this.props.checkIn(JSON.stringify(post));

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
                  onClick={e => this.getRecent(e)}
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