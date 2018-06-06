import {Dates} from '../../../src/common/util/Dates';


describe('Date Util.dateFormat test', ()=>{
  it('formatting tests', ()=>{
    let i = 1;
    let year = 2018;
    let dates = [];

    //create date range within each month
    while(i<13){
      dates.push(new Date(year,i,1));
      dates.push(new Date(year,i,5));
      dates.push(new Date(year,i,10));
      dates.push(new Date(year,i,20));
      dates.push(new Date(year,i,25));
      dates.push(new Date(year,i,28));
      i++;
    }
    for(let i in dates){
      let d_string:string;
      let expect:string;

      let m       = dates[i].getMonth()+1;
      let s_month = m.toString();
      let mm      = s_month.substring(s_month.length-2,s_month.length)

      let d      = dates[i].getDate();
      let s_day  = d.toString();
      let dd     = s_day.substring(s_day.length-2,s_day.length)

      let yyyy   = dates[i].getFullYear();
      let s_year = yyyy.toString();
      let yy     = s_year.substring(s_year.length-2,s_year.length)

      expect = `${m}-${yy}-${d}`;
      d_string = Dates.datesFormat(dates[i],'m-y-d');
      console.log(`r: ${d_string} e: ${expect} `);

      // @NOTE need to come up series of none string tests
      // or use bit wise tests on strings
      // expect(d_string).toEqual(expect);


      d_string = Dates.datesFormat(dates[i],'dd-mm-');
      d_string = Dates.datesFormat(dates[i],'yy-mm-dd');
      d_string = Dates.datesFormat(dates[i],'yyyy-mm-dd');
      d_string = Dates.datesFormat(dates[i],'yy/m/d');
      d_string = Dates.datesFormat(dates[i],'yy/mm/dd');
      d_string = Dates.datesFormat(dates[i],'yyyy/mm/dd');
      d_string = Dates.datesFormat(dates[i],'yy, m d');
      d_string = Dates.datesFormat(dates[i],'yyyy m, d');
    }

  });
});

/* fast boiler plate
describe('', ()=>{
  it('', ()=>{});
});

describe('', ()=>{
  it('', ()=>{});
});
*/
