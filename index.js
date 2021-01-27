'use strict'

const url = require('url');
const http = require('http');
const qs = require('querystring');
const router = require('find-my-way')();

const cache = require('./src/v1/lib/req');
const response = require('./src/v1/lib/res');

const Mongo = require('./src/v1/lib/mongo');
const mongo = new Mongo('pemilo','admin');

(async()=>{
  await mongo.init();
})();

const { ruleAdminSignup, ruleAdminSignin } = require('./src/v1/validation');

const { ruleSignin, ruleResponseSignin } = require('./src/v1/rule/index');

router.on('POST', '/v1/signup', async (req,res) => {

  const valid = ruleAdminSignup(req.bod);

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

router.on('GET', '/v1/signin', async (req ,res)=>{                                                                                                                                                                                                                                                                                                                                                                                                                                
  
  const valid = ruleAdminSignin(req.bod);

  if(valid){    

    const bod = ruleSignin(req.bod);
    const etag = await cache.cache(req, res, bod);  
    
    const dat = await mongo.get(req.bod, {email:1});

    const convertData = ruleResponseSignin(dat);

    if(dat.length === 0) {
      response.send(res, 204, 'Request berhasil namun data tidak ditemukan!', convertData, etag);          
    }
    else{
      response.send(res, 200, 'Request berhasil dan data ditemukan!', convertData, etag);          
    }

  }

  else response.send(res, 400, 'Request not valid');

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

  router.lookup(req, res);

});

server.listen(7000);