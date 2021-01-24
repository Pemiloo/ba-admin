const http = require('http');

const JSON = require('fast-json-stringify');

const ruleFilter = JSON({
  type:'object',
  properties:{
    msg : {type:'string'},
    data : {type:'string'}
  }
});

function send(res = new http.ServerResponse() , code = 200, msg="", data ="", etag=null){
  
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('etag', etag);
  res.statusCode = code;
  
  const filter = {msg, data};
  
  res.end( ruleFilter(filter) );
}

module.exports = {send};