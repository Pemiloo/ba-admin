'use strict'

const url = require('url');
const http = require('http');
const qs = require('querystring');
const router = require('find-my-way')();

const get = require('./src/v1/router/get');
const put = require('./src/v1/router/put');
const post = require('./src/v1/router/post');

router.on('GET', '/v1/signin', get.Signin);
router.on('PUT', '/v1/profile', put.Profile);
router.on('POST', '/v1/signup', post.Signup);


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