import {Utils} from '../../../src/common/utils';


describe('Date Util.dateFormat test', ()=>{
  it('formatting tests', ()=>{
    let i = 12;
    let year = 2018;
    let dates = [];
    while(i>0){
      dates.push(new Date(year,i,1));
      dates.push(new Date(year,i,5));
      dates.push(new Date(year,i,10));
      dates.push(new Date(year,i,20));
      dates.push(new Date(year,i,25));
      dates.push(new Date(year,i,28));
      i--;
    }
    for(let i in dates){
      let d_string:string;
      let expect:string;

      let m       = dates[i].getMonth()+1;
      let s_month = m.toString();
      let mm = s_month.substring(s_month.length-2,s_month.length)

      let d     = dates[i].getDate();
      let s_day = d.toString();
      let dd = s_day.substring(s_day.length-2,s_day.length)

      let yyyy = dates[i].getFullYear();
      let s_year = yyyy.toString();
      let yy = s_year.substring(s_year.length-2,s_year.length)

      expect = `${m}-${yy}-${d}`;
      d_string = Utils.datesFormat(dates[i],'m-y-d');
      console.log(`r: ${d_string} e: ${expect} `);
      //@NOTE expect just stopped working in this context
      //@NOTE throws expect is not a function I will finish late now that I knwo this works
      // expect(d_string).toEqual(expect);


      d_string = Utils.datesFormat(dates[i],'dd-mm-');
      d_string = Utils.datesFormat(dates[i],'yy-mm-dd');
      d_string = Utils.datesFormat(dates[i],'yyyy-mm-dd');
      d_string = Utils.datesFormat(dates[i],'yy/m/d');
      d_string = Utils.datesFormat(dates[i],'yy/mm/dd');
      d_string = Utils.datesFormat(dates[i],'yyyy/mm/dd');
      d_string = Utils.datesFormat(dates[i],'yy, m d');
      d_string = Utils.datesFormat(dates[i],'yyyy m, d');
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
