const url = require('url');
const http = require('http');
const qs = require('querystring');
const router = require('find-my-way')();

let stringFormat = require('fast-json-stringify')({
  title: 'Example Schema',
  type: 'object',
  properties : {
    message : {type : 'string'}
  }
});


router.on('POST', '/', async (req, res)=>{

  const URL =  qs.parse(url.parse(req.url.toString()).query);

  console.log(URL);

  const getBod = (event) => {
    return new Promise((resolve, reject) => {
      req.on(event, (tmp)=>{
        const str = JSON.parse(Buffer.from(tmp).toString('utf8'));
        resolve(str);
      });
    });
  } 

  const getData = await getBod("data");

  console.log(getData);

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  
  res.end( stringFormat({message:"hi"}) );

});

const server = http.createServer((req, res)=>{  
  router.lookup(req, res);
});

server.listen(7000);