'use strict'

const http = require('http');

//const request = require('../lib/req');
const response = require('../lib/res');

const Mongo = require('../lib/mongo');
const mongo = new Mongo('pemilo', 'admin');

//const ruler = require('../rule/index');
const validator = require('../validation/index');

( async ()=>{ await mongo.init(); })();

async function Profile(req = new http.IncomingMessage, res = new http.ServerResponse){
  
  const valid = validator.ruleUpdateProfile(req.bod);

  if(valid){

    const {email,set} = req.bod;

    const result = await mongo.setOne(email, set);

    if(result){
      response.send(res, 200, `Success update data with email ${email}`);
    }

    else{ response.send(res, 400, `Update data not sucess!!`); }

  }

  else {response.send(res, 400, "Request data not valid!");}

}

module.exports = { Profile }; 