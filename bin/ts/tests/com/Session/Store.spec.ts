
/// <reference path="../../../src/com/interfaces.d.ts"/>
//@NOTE I have solved this in the past with directories object in package.JSON
//@NOTE but this time around no dice for now 8^)
import {Connected} from '../../../src/com/Connected';
import {Session} from '../../../src/com/Session';

const service = {
  // base: 'https://ue7jsck4wk.execute-api.us-west-2.amazonaws.com/staging/',
  base: 'http://tincan/',
  // login: 'login',
  login: '_login',
  appointments: 'check-ins',
};
const login_service = {
  url: service.base
}
const login = {
  username: 'jack@daisyranch.org',
  password: 'password',
}

const predict = {
  pid: {
    login: 'sam.spade',
    permitted: '',
    appointmenst: [
      {
        "data": "2018-04-26",
        "check-in": true,
        "comment": "Sam wrote some graffiti on the walls, you might want to have him clean that up",
      },
      {
        "data": "2018-04-25",
        "check-in": false,
        "comment": "",
      },
      {
        "data": "2018-04-24",
        "check-in": true,
        "comment": "George wrote on the black board",
      },
      {
        "data": "2018-04-23",
        "check-in": false,
        "comment": "",
      },
      {
        "data": "2018-04-22",
        "check-in": true,
        "comment": "Suzy got some flowers",
      },
    ],
  }

}

describe('Session Data Storage', () => {
  it('Session tests', () => {
    let session =  new Session();
    let post: postage   = {
        url: service.base + service.login,
        type: 'GET',
        data: login,
        debug: true
    }

    console.log(post);

    /*
    //ah ... com will need to be mocked
    let comm    =  new Connected();
    let success = (response) => {
      console.log('Succeeded');
      console.log(response);
    }
    let error = (response) => {
      console.log('Oh Shoot No Dice');
      console.log(response);
    }
    comm.send(post, success, error);
    */

  });

});
