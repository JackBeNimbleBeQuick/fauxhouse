///<reference path="../interfaces.d.ts" />


// import * as express from 'express';
import * as path from 'path';
import * as debug from 'debug'
import {ExpressServer} from '../server';
import * as chokidar from 'chokidar';
import * as boot from './run';


/**
 *
 * Restartable server wrapper ...
 * adaption from: Akshendra Pratap  8^)
 * https://blog.cloudboost.io/reloading-the-express-server-without-nodemon-e7fa69294a96
 * ..basically just converted to typescript to ease reusability
 *
 */
export class Restartable{

  private server:any;

  private instance: any;

  private sockets:Array<socket> = [];

  public constructor(){
    return this;
  }

  public start = () => {

    this.server = new ExpressServer();

    this.instance = this.server.start();

    // this.instance = this.server.app.listen(port, () => {
    //   debug(`Started on ${port}`);
    // });

    this.server.app.on('connection', (socket:any|null) => {
      debug(`state: ${this.sockets.length + 1}`);
      if(socket) this.sockets.push(socket);
    });
  }

  public pathCheck = (id:any) => {
    return (
      id.startsWith(path.join(__dirname, 'routes')) ||
      id.startsWith(path.join(__dirname, 'server.js'))
    );
  }

  public restart = () => {
    // clean the cache
    Object.keys(require.cache).forEach((id) => {
      if (this.pathCheck(id)) {
        debug(`Reloading: ${id}`);
        delete require.cache[id];
      }
    });

    this.sockets.forEach((socket, index) => {
      debug(`Destroying socket: ${index + 1}`);
      if (socket.destroyed === false) {
        socket.destroy();
      }
    });

    this.sockets = [];

    this.instance.close(() => {
      debug('Server is closed');
      debug('\n----------------- restarting -------------');
      this.start();
    });
  }

}
