
interface words{
  bigWords: string,
  smallWords: string,
}

interface linkProp{
  name: string,
  signal: string,
  label: string,
  handler: Function
}

interface mainProps{
  switch_time: number
  filter?: RegExp,
  seq?: seqItem
}

interface mainStates{
    page: string,
    c_card: string,
    carda:React.Component|null,
    cardb:React.Component|null,
}

interface seqItem{
  [Identifier:string]: seq
}

interface seq{
  num: number,
  label: string,
}
