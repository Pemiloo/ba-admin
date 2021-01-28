'use strict'

const http = require('http');

//const request = require('../lib/req');
const response = require('../lib/res');

const Mongo = require('../lib/mongo');
const mongo = new Mongo('pemilo', 'admin');

const ruler = require('../rule/index');
const validator = require('../validation/index');

( async ()=>{ await mongo.init(); })();

async function Signup(req = new http.IncomingMessage, req = new http.ServerResponse){

  const valid = validator.ruleAdminSignup();

  if(valid){
    
    const sta = await mongo.save(req.bod, "email");

    if(sta)  response.send(res, 200, 'Insert data success!');

    else response.send(res, 400, 'Insert data not success!');

  }

  else response.send(res, 400, 'Request not valid!');

}

module.exports = { Signup };