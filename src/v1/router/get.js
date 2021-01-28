'use strict'

const http = require('http');

const request = require('../lib/req');
const response = require('../lib/res');

const Mongo = require('../lib/mongo');
const mongo = new Mongo('pemilo', 'admin');

const ruler = require('../rule/index');
const validator = require('../validation/index');

( async ()=>{ await mongo.init(); })();

async function Signin(req = new http.IncomingMessage, res = new http.ServerResponse){
  
  const valid = validator.ruleAdminSignin(req.bod);

  if(valid){

    const etag = await request.cache(req, res, ruler.ruleSignin(req.bod));

    if(etag === null){
      return null;
    }

    const result = await mongo.get(req.bod, {email : 1});

    const convert = ruler.ruleResponseSignin(result);

    if(result.length === 0){
      response.send(res, 204, 'Request berhasil namun data tidak ditemukan!', convert, etag);          
    }
    
    else {response.send(res, 200, 'Request berhasil dan data ditemukan!', convert, etag);          }

  }

  else {response.send(res, 400, 'Request not valid');}

}

module.exports = { Signin };