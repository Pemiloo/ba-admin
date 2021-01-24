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
  const con = await MongoClient.connect(this.url);
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

  if(findGet === null){
    return false;
  }

  if(typeof data === 'object'){    
    
    try{
      await client.insertOne(data);
      return true;
    }

    catch{return false;}
  }  

  else if(Array.isArray(data)){    
    
    try {
      await client.insertMany(data);
      return true;    
    }

    catch{return false;}
  }

  return false;
}

module.exports = Mongo;