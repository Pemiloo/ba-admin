'use strict'

const http = require('http');

//const request = require('../lib/req');
//const response = require('../lib/res');

const Mongo = require('../lib/mongo');
const mongo = new Mongo('pemilo', 'admin');

//const ruler = require('../rule/index');
//const validator = require('../validation/index');

( async ()=>{ await mongo.init(); })();

async function Profile(req = new http.IncomingMessage, res = new http.ServerResponse){return null;}

module.exports = { Profile }; 