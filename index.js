'use strict'

const url = require('url');
const http = require('http');
const qs = require('querystring');
const router = require('find-my-way')();

const JSON = require('fast-json-stringify');

const stringFormat = JSON({
  type: 'object',
  properties : {
    msg : {type : 'string'}
  }
});

router.on('GET', '/', (res)=>{

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;

  res.end( stringFormat({msg:"hi"}) );

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

  router.lookup(req, res);

});

server.listen(7000);