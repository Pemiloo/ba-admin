'use strict'

const joi = require('joi');

function ruleEngine(rule = null, ob = {}){
  const {_, error} = rule.validate(ob);
  if(error === undefined || error === null) return true;
  return false;
}

function ruleAdminSignup(ob = {}){

  const rule = joi.object().keys({ 
    
    email : joi.string().email().required(), 
    password : joi.string().required(), 
    linkPhoto : joi.string().required(), 
    title : joi.string().required() ,
    namaPanitia : joi.array().required() 

  });
  
  return ruleEngine(rule, ob);

}

function ruleUpdateProfile(ob = {}){

  const rule = joi.object().keys({    
    
    email : joi.string().email().required(),    
    
    set : joi.object().keys({

      email : joi.string().email().optional(), 
      password : joi.string().optional(), 
      linkPhoto : joi.string().optional(), 
      title : joi.string().optional() ,
      namaPanitia : joi.array().optional() 

    }).required()

  });

  return ruleEngine(rule, ob);

}

function ruleAdminSignin(ob = {}){
  
  const rule = joi.object().keys({
    
    email : joi.string().email().required(),
    password : joi.string().required()

  });

  return ruleEngine(rule, ob);

}

module.exports = { ruleAdminSignup, ruleAdminSignin, ruleUpdateProfile };