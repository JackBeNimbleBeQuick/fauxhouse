
///<reference path="./interfaces.d.ts" />

import * as express from 'express';

import { Router, Request, Response } from 'express';

import {LoginController} from './controller/login';

import {IndexController} from './controller/index';

import * as Parser from 'body-parser';


export class ExpressServer {

  private app: express.Application;

  private port: string= process.env.PORT || '8092';

  public constructor(){

    this.app = express();

    this.app.use(Parser.urlencoded({extended: false}));

    this.app.use(Parser.json({inflate:true}));

    this.app.use('', IndexController);

    this.app.use((req:Request, res:Response, next:Function) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
      next();
    });

    this.app.post('/appointments', (req:Request, res:Response, next:Function) => {

      res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization');
      res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization');
      if('POST' == req.method){
        console.log(this.data(req));
        res.send(JSON.stringify({ status: 'ok'}));
      }else{
        next();
      }

    });
    this.app.get('/appointments', (req:Request, res:Response, next:Function) => {

      if('GET' == req.method){
        res.send(JSON.stringify({
          '2018-04-05': true,
          '2018-04-06': true,
          '2018-04-07': false,
          '2018-04-08': false,
          '2018-04-09': true,
          '2018-04-10': true,
          '2018-04-11': true,
        }));
      }else{
        next();
      }

    });

    this.app.post('/login', (req:Request, res:Response) => {

      res.setHeader('Access-Control-Allow-Origin', '*');
      // res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'POST');

      let login = this.data(req);

      if(login && login.password == 'password'){
        res.send(JSON.stringify({ status: 'ok'}));
      }else{
        res.send(JSON.stringify({ status: 'none'}));
      }
    });

    return this;
  }

  public start = () => {
    let instance = this.app.listen(this.port, () => {
      console.log(`Listening at http://localhost:${this.port}/`);
    });
    return instance;
  }

  private data = (req:Request) => {

      let data:any = req.body ? Object.keys(req.body)[0] : null;

      if(typeof data == 'string') data = JSON.parse(data);

      return data;

  }

}
