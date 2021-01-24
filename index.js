'use strict'

const url = require('url');
const http = require('http');
const qs = require('querystring');
const router = require('find-my-way')();
const cache = require('./src/v1/lib/req');
const JSON = require('fast-json-stringify');
const response = require('./src/v1/lib/res');

const Mongo = require('./src/v1/lib/mongo');
const mongo = new Mongo('pemilo', 'admin', 'mongodb://127.0.0.1:27017/');

const stringFormat = JSON({
  type: 'object',
  properties : {
    msg : {type : 'string'}
  }
});

router.on('POST', '/', async (_, res) => {

  await mongo.save({
    email:"rezaxxxx02@gmail.com",
    password : "123",
    linkPhoto : "https://hello.com",
    title : "Pemiliihan Osis 2021",
    namaPanitia : ["Reza", "Fadhli"]
  }, "email");

  if(etag != null){
    response.send(res, 200, 'New message from server', stringFormat({msg:"hi"}), etag);
  }

});

router.on('GET', '/', async (req ,res)=>{
  
  const etag = await cache.cache(req, res);

  if(etag != null){
    response.send(res, 200, 'New message from server', stringFormat({msg:"hi"}), etag);
  }

});

const server = http.createServer( async (req, res)=>{  

  const bod = (event) => {    
    return new Promise((resolve) => {   
      const str = null;
      req.on(event, (tmp)=>{      
        str = JSON.parse(Buffer.from(tmp).toString('utf8'));              
      });
      resolve(str);
    });    
  }

  req.param = qs.parse(url.parse(req.url.toString()).query);
  req.bod = await bod("data");

  await mongo.init();

  router.lookup(req, res);

});

server.listen(7000);