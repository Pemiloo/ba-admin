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

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, DELETE",
  "Access-Control-Max-Age": 2592000
};

function send(res = new http.ServerResponse() , code = 200, msg="", data ="", etag=null){
  
  res.setHeader('Content-Type', 'application/json');
  if(etag != null  || etag != undefined){
    res.setHeader('etag', etag);
  }
  res.writeHead(200, headers);
  
  const filter = {code, msg, data};
  
  res.end( ruleFilter(filter) );
}

module.exports = {send};