//@NOTE tests the restarting of server
import {Restartable} from './restartable';
let server = new Restartable();
server.start();

setTimeout(()=>{server.restart()},5000);
