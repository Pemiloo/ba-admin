const joi = require('joi');

function ruleAdminSave(ob = {}){

  const rule = joi.object().keys({ email : joi.string().email().required(), password : joi.string().required(), linkPhoto : joi.string().required(), title : joi.string().required() ,namaPanitia : joi.array().required() });
  
  const {_, error} = rule.validate(ob);

  if(error === undefined || error === null){
    return true;
  }

  return false;
}

module.exports = { ruleAdminSave };