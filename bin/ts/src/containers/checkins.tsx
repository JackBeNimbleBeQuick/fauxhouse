import * as React from 'react';
import Closer from '../component/closer';
import {Session} from '../com/Session';

class Checkins extends React.Component <any, any > {

  static defaultProps = {
    history: `checkins for the last 7 days`,
    confirm: `Your checkin has been posted`,
    listing: {list: null,type:'history'},
    openCloser: true,
    session: 'down',
    closeHandler: () => {alert('override me ... please')}
  }

  constructor(props:any){
    super(props);
    let session = new Session();
    this.state = {
      props: this.props,
      session: session,
      history: <span><p> {session.loginName()}:</p> <p>{this.props.history}</p></span>,
      confirm: <h3> {this.props.confirm}</h3>,
    }
  }

  renderList = () => {
    // console.log(this.props.listing);
    if(this.props.listing){
      let list = this.props.listing.list;
      let history = [];
      for(let i in list){
        let checked = list[i];
        let checkClass = checked == true  ? 'icon icon-check' : 'icon icon-unchecked';
          history.push(
            <ul className="row" key={i}>
              <li> <span className={checkClass}></span></li>
              <li><span className="date">{i}</span></li>
            </ul>
          );
      }
      return history;
    }
    return null;

  }

  changes = (e:any) => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    let list = this.renderList();
    let classes = ['checkins','list', this.props.show]
    return (
      <div className={classes.join(' ')}>
        <div className="heading">
          {this.state[this.props.listing.type]}
          <Closer
            open= { this.props.openCloser}
            handler = { this.props.closeHandler }
          />
        </div>
        {list}
      </div>

    );
  }
}

export default Checkins;
