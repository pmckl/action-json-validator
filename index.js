const core = require('@actions/core');
const fs = require('fs');
const Validator = require('jsonschema').Validator;

var v = new Validator();

function preValidateProperty(object, key, schema, options, ctx) {
    var value = object[key];
    if (typeof value === 'undefined') return;
    if (schema.type && v.attributes.type.call(v, value, schema, options, ctx.makeChild(schema, key))) {
      if(schema.type==='integer' && typeof value!=='integer'){
        object[key] = parseFloat(value);
        return;
      }
      if(schema.type==='boolean' && typeof value!=='boolean'){
        object[key] = value == "true" ? true : false;
        return;
      }
    }
}

try {
  var schema = core.getInput('schema');
  var config = core.getInput('config');
  if(schema == ""){
    schema = "./local/schema.json"
  }
  if(config == ""){
    config = "./local/config.json"
  }

  var schema_obj = JSON.parse(fs.readFileSync(schema, 'utf8'));
  var config_obj = JSON.parse(fs.readFileSync(config, 'utf8'));

  var res = v.validate(config_obj, schema_obj, { preValidateProperty });
  if(res.valid == false){
    console.log(res)
    core.setFailed(res.errors);
  }
  else{
    console.log("Schema is valid!");
  }
} catch (error) {
  core.setFailed(error.message);
}