'use strict'

const joi = require('joi');

function ruleEngine(rule = null, ob = {}){
  const {_, err} = rule.validate(ob);
  if(err === undefined || err === null) return true;
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

function ruleAdminSignin(ob = {}){
  
  const rule = joi.object().keys({
    email : joi.string().email().required(),
    password : joi.string().required()
  });

  return ruleEngine(rule, ob);

}

module.exports = { ruleAdminSignup, ruleAdminSignin };