//interfaces are the functions and class structures of the persistent layer
//use data_types for data types used as parameters to the interfaces


/* __ JSON Support __*/
// declare module "*.json" {
//     const value: any;
//     export default value;
// }

/* __ Primative __*/
interface indexed_number{
  [key:string]:number
}

interface indexed_string{
  [key:string]:string
}

/* __AJAX Communication __*/
interface postage {
  url: string,
  type: string,
  data?: Object|null,
  header_type?: string, //cors,form,json
  wait?: number,
  debug?: Boolean
}

interface serviceClass {
  getServices():services
}

interface services{
  env: string,
  params: appointmentService
}

interface appointmentService{
  base: string,
  login: string,
  login_success: Object,
  appointments: string
}

interface loginResponse{
  status?:string
}

interface appointmentList{
  list: Array<appointmentHistory>
}

interface appointmentHistory{
  date: string,
  'check-in':boolean,
  comment:string
}

interface comState{
  [Identifier:number]: comStateItem
}

interface comStateItem{
  key: string,
  explained: string,
}

/*______*/

interface Session {
  data:SessionData,
  permitted(): boolean
}

interface SessionData{
  logged_in: boolean,
  pid:string,
  name: string,
  key: string,
  permits:Permits,
}

interface Permits{
  zones:Zones,
}

interface Zones{
  appointments:boolean
}

interface connectStatData{
  [Identifier:string]: connectStatItem
}

interface connectStatItem{
  [Identifier:string]: connectStatistics
}

interface connectStatistics{
  [Identifier:string]: number ,
}

/* __ Filters ___ */
interface filterInterface {
  filter(value:any):any
}

/* __ Validators ___ */
interface validatorInterface {
  isValid(value:any):Boolean
}

/* __ Exchange ___ */
interface Exchange{
  getCall(key:string): string | Boolean,
  getMap(key:string): exchangeMap,
  getMaps(): exchangeMap,
  getCalls(): indexed_string
}

/* __ exchange data type ___ */
interface exchangeConditions{
  true: string,
  false: string,
  logic: null | Function
}

interface exchangeMaps{
  [key:string]: exchangeMap
}

interface exchangeMap{
  sequence: exchangeSequence
}

interface exchangeSequence{
  [key:string]: exchangeLink
}

interface exchangeLink{
  product: string,
  action: string, //post,get,put,delete
  wait?: number,
  dominion: string, // session | public
  protocol: string,
  host: string,
  tokens: string | null,
  uri: string,
  //should be explicit data type
  //used as primary key in key:value storage
  returns: string,
  requires: string | null,
  conditions: null | exchangeConditions
}

/* Storage */

interface performance{
  call: string,
  ms: number
}

interface liveData{
  exchangeUsed: string, //i.e. Zelle, Transfers, PayBill, RDC, WU
  call: string,
  performance: performance,
  data_type: string,
  data: string | Object
}
