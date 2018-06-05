import * as React from 'react';

class Checkins extends React.Component <any, any > {

  //@TODO move this into inrerface.pageProps
  static defaultProps = {
    data: {},
    show: '',
  }

  constructor(props:any){
    super(props);
    this.state = {
      show: 'about',
      props: this.props
    }
  }

  renderList = () => {
    if(this.props.data.list){
        let list = this.props.data.list;

        let history = list.map( (item:any,i:number)=>{
        let checked = item['check-in'];
        let checkClass = checked == 'true' || checked ? 'icon icon-check' : 'icon icon-unchecked'

        return(
          <ul>
            <li><label>Checked-in:</label> <span className={checkClass}>{item['check-in']}</span></li>
            <li><label>Date:</label> <span className="date">{item.date}</span></li>
            <li><label>Comment:</label> <span className="comment">{item.comment}</span></li>
          </ul>
        );
      });
      return history;
    }

  }

  render() {
    let list = this.renderList();
    let classes = ['checkins','list',this.props.show]
    return (
      <ul className={classes.join(' ')}>
        {list}
      </ul>

    );
  }
}

export default Checkins;
