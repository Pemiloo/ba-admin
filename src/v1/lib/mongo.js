const { MongoClient } = require('mongodb');

function Mongo(database="", collection="", url="mongodb://127.0.0.1:27017/"){
  this.database = database;
  this.collection = collection;
  this.url = url;
  this.client = null;
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
  const con = await MongoClient.connect(this.url, {useNewUrlParser:true, useUnifiedTopology:true});
  this.client = await con.db(this.database).collection(this.collection);
}

Mongo.prototype.save = async function(data=null, keyField=""){

  if(this.client === null || this.client === undefined){    
    return false;
  }
  
  if(data === null || data === undefined){    
    return false;    
  }
  
  const key = data[keyField];

  const ob = { [keyField] : key };

  const findGet = await this.client.findOne(ob);

  if(findGet != null){
    return false;
  }

  if(typeof data === 'object'){            

    try{
      await this.client.insertOne(data);
      return true;
    }

    catch{return false;}
  }  

  else if(Array.isArray(data)){    
    
    try {
      await this.client.insertMany(data);
      return true;    
    }

    catch{return false;}
  }

  return false;
}

Mongo.prototype.get = async function(param={}, field={}, start=0, end=0, sort={}){
  
  let res = null;
  
  if(end === 0){
    res = await this.client.find(param, {projection:field}).sort(sort).toArray();
    return res;
  }
  
  res = await this.client.find(param, {projection:field}).skip(start).limit(end).sort(sort).toArray();
  
  return res;
}

Mongo.prototype.setOne = async function(param = null, set = null){
  if(param === null || set === null) return false;
  await this.client.updateOne(param, {$set:set, $currentDate: {lastModified:true}});
  return true;
}

Mongo.prototype.setMany = async function(param = null, set = null){
  if(param === null || set === null) return false;
  await this.client.updateMany(param, {$set:set, $currentDate: {lastModified:true}});
  return true;
}



module.exports = Mongo;