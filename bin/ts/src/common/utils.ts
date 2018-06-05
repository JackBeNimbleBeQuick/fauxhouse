

export class Utils{



  /**
   * Provide rudermentory date formatting
   * @param {Date, string}
   * @return {string}
    @TODO
     .finish unit test for all use cases,
     .clean simplify regex ... everything was made explicit on first pass
   */
  public static datesFormat = (date: Date, format: string):string => {
    let dividers = format.trim().match(/[\/\-\.]|(\b(\s)|(\,\s)\b)/g);
    let formatters:Array<string>|null = format.match(/\b(mm|m|dd|d|yy|yyyy|y)\b/g);
    let d_string, y_string, m_string;
    let accum = [];
    // console.log(dividers);
    // console.log(formatters);
    let divide:string|null|undefined = ' ';
    // divide  = dividers && dividers.length ? dividers.pop() : ' ';
    if(formatters instanceof Array){
      let i:number = formatters.length;
      while(i){
        let formatup:any = formatters.pop();
        // console.log(dividers);
        // console.log(`month: ${date.getMonth()} day: ${date.getDate()} year: ${date.getFullYear()}`);


        if( /\b(y|yy|yyy|yyyy)\b/.test(formatup) ) {
          let year:number =  date.getFullYear();
          let s_year = year.toString();
          y_string = s_year;
          if( /\b(y|yy|yyy)\b/ .test(formatup )){
            y_string = (s_year.substring(s_year.length-2,s_year.length));
          }
          y_string = divide ? y_string + divide : ' ';

          accum.unshift(y_string);
        }
        if( /\b(mm|m)\b/.test(formatup) ) {
          let month = date.getMonth()+1;
          let s_month = '00' + month.toString();
          m_string = month;
          if(formatup == 'mm'){
            m_string = (s_month.substring(s_month.length-2,s_month.length));
          }
          m_string = divide ? m_string + divide : ' ';

          accum.unshift(m_string);

        }
        if( /\b(dd|d)\b/.test(formatup) ) {
          let day:number =  date.getDate();
          let s_day = '00'+ day.toString();

          d_string = day.toString();
          if(formatup=='dd'){
            d_string = (s_day.substring(s_day.length-2,s_day.length));
          }
          d_string = divide ? d_string + divide : ' ';

          accum.unshift(d_string);

        }
        divide  = dividers && dividers.length ? dividers.pop() : ' ';
        i--;
      }
      // console.log(format);
      // console.log(accum.join(''));
      return accum.join('');

    }
    return '';
  }

}
