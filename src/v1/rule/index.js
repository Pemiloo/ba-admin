'use strict'

const json = require('fast-json-stringify');

const ruleAdmin = json({
  email : String,
  password : String,
  linkPhoto : String,
  title : String,
  namaPanitia : [String]
});

module.exports = { ruleAdmin };