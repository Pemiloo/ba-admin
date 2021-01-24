'use strict'

const url = require('url');
const http = require('http');
const qs = require('querystring');
const router = require('find-my-way')();

const cache = require('./src/v1/lib/req');
const response = require('./src/v1/lib/res');

const Mongo = require('./src/v1/lib/mongo');
const mongo = new Mongo('pemilo', 'admin', 'mongodb://127.0.0.1:27017/');

const { ruleAdminSave } = require('./src/v1/validation');

router.on('POST', '/', async (req,res) => {

  const valid = ruleAdminSave(req.bod);

  if(valid){    

    const staIn = await mongo.save(req.bod,"email");
  
    if(staIn){
      response.send(res, 200, 'Insert data success!');
    }
    else{
      response.send(res, 400, 'Insert data not success!');
    }

  }

  else {response.send(res, 400, 'Request not valid!');}

});

router.on('GET', '/', async (req ,res)=>{
  
  const etag = await cache.cache(req, res);

  if(etag != null){
    response.send(res, 200, 'New message from server', stringFormat({msg:"hi"}), etag);
  }

});

const server = http.createServer( async (req, res)=>{  

  const bod = () => {    
    return new Promise((resolve) => {       
      let str = null;
      req.on("data", (tmp)=>{              
        str = JSON.parse(Buffer.from(tmp).toString('utf8'));                                      
      });
      req.on("end", () => {        
        resolve(str);            
      });
    });    
  }

  req.param = qs.parse(url.parse(req.url.toString()).query);

  req.bod = await bod();

  await mongo.init();

  router.lookup(req, res);

});

server.listen(7000);