'use strict'

const json = require('fast-json-stringify');

const ruleSignin = json({
  title : 'RuleSignin',
  type: 'object',
  properties : {
    email : {type : 'string'},
    password : {type : 'string'}
  }
});

const ruleAdmin = json({
  title : 'RuleAdmin',
  type : 'object',
  properties : {
    email : {type : 'string'},
    password : {type : 'string'},
    linkPhoto : {type :'string'},
    title : {type : 'string'},
    namaPanitia : {type : 'array'}
  }
});

module.exports = { ruleAdmin, ruleSignin };