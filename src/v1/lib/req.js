const http = require('http');
const redis = require('./redis');
const handleRes = require('./res');
const { v4:uuid4 } = require('uuid');

async function cache(req = new http.IncomingMessage(), res = new http.ServerResponse()){
  
  const etag = req.headers.etag;

  //console.log(etag);

  if(etag === undefined){  
    const random = uuid4();
    await redis.set(random, true);    
    return random;
  } 
  else{
    
    const rdsta = await redis.check(etag.toString());
    //console.log(rdsta);

    if(rdsta){
      //console.log("Masuk");
      handleRes.send(res, 200, "Already cache bro!", null, etag);
      return null;
    }
    else{
     //console.log("Kena");
     await redis.set(etag, true);
     return etag; 
    }

  }  

}

module.exports={cache};