'use strict'

const http = require('http');
const redis = require('./redis');
const handleRes = require('./res');
const { v4:uuid4 } = require('uuid');

async function cache(req = new http.IncomingMessage(), res = new http.ServerResponse(), data=null){  
  
  const etag = req.headers.etag;  
  
  if(etag === undefined){      
    const random = uuid4();
    await redis.set(random, data);    
    return random;
  }
  
  const rdsta = await redis.check(etag.toString(), data);        
  
  if(rdsta){          
    handleRes.send(res, 304, "Already cache bro!", null, etag);
    return null;
  }
  
  await redis.set(etag, data);
  return etag; 
  
}

async function broke(req=new http.IncomingMessage,res=new http.ServerResponse,etag=null){

  if(etag === null){
    return null;
  }

  

}

module.exports={cache};