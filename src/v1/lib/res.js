'use strict'

const http = require('http');

const JSON = require('fast-json-stringify');

const ruleFilter = JSON({
  type:'object',
  properties:{
    code  : {type:'number'},
    msg   : {type:'string'},
    data  : {type:'string'}
  }
});

function send(res = new http.ServerResponse() , code = 200, msg="", data ="", etag=null){
  
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('etag', etag);
  res.statusCode = 200;
  
  const filter = {code, msg, data};
  
  res.end( ruleFilter(filter) );
}

module.exports = {send};