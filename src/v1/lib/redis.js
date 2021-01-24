'use strict'

const util = require('util');
const redis = require('redis');

const client = redis.createClient();

const getAs = util.promisify(client.get).bind(client);
const setAs = util.promisify(client.set).bind(client);
const delAs = util.promisify(client.del).bind(client);
const flush = util.promisify(client.flushall).bind(client);

async function clear(){
  const res = await flush();
  return res;
}

async function del(key=""){
  const res = await delAs(key);
  return res;
}

async function check(key=""){
  const res = await getAs(key);
  if(res === null){
    return false;
  }
  return true;
}

async function get(key=""){
  const res = await getAs(key);
  return res;
}

async function set(key="", data={}){
  const res = await setAs(key, data);
  if(res === "OK"){
    return true;
  }
  return false;
}

module.exports = {get, set, check, del, clear};