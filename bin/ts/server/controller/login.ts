///<reference path="../interfaces.d.ts" />

import * as express from 'express';

import { Router, Request, Response } from 'express';

import * as Parser from 'body-parser';

const app: express.Application = express();

const router: Router = Router();

app.use(Parser.urlencoded({extended: false}));
app.use(Parser.json());

router.post('', (req: Request, res: Response) => {

  if(req.body.login){
    let post:login = {
      login: req.body.login,
      password: req.body.password,
    }
    if(post){

    }
    console.log(post);
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ result: false }));

});

router.get('/', (req: Request, res: Response) => {
    res.send('Login controller!');
});

export const LoginController: Router = router;
