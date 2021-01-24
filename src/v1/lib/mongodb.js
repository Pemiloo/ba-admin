const { MongoClient } = require('mongodb');

function Mongo(database="", collection="", url="mongodb://127.0.0.1:27017/"){
  this.database = database;
  this.collection = collection;
  this.url = url;
}

Mongo.prototype.getDatabase = function(){
  return this.database;
}

Mongo.prototype.getCollection = function(){
  return this.collection;
}

Mongo.prototype.getUrl = function(){
  return this.url;
}

Mongo.prototype.init = async function(){
  const con = await MongoClient.connect(this.url);
  const client = await con.db(this.database).collection(this.collection);
  client.insertOne
  return client;
}

Mongo.prototype.save = async function(client=null, data=null){
  
  if(client === null || client === undefined){
    return false;
  }
  
  if(data === null || client === undefined){
    return false;    
  }

  if(typeof data === 'object'){
    await client.insertOne(data);
    return true;
  }
  
  else if(Array.isArray(data)){
    await client.insertMany(data);
    return true;
  }

  return false;
}

module.exports = Mongo;