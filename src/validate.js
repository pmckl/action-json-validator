const Validator = require('jsonschema').Validator;
let schemaValidator = new Validator();
function preValidateProperty(object, key, schema, options, ctx) {
    var value = object[key];
    if (typeof value === 'undefined') return;
    if (schema.type && schemaValidator.attributes.type.call(schemaValidator, value, schema, options, ctx.makeChild(schema, key))) {
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

module.exports = function (schema,config){
    let ret = [];
    if(Object.keys(schema).length === 0 || Object.keys(config).length === 0){
        ret.push("The provided schema or config is empty");
        return ret;
    }
    let validatorResult = schemaValidator.validate(config, schema, { preValidateProperty });
    if(validatorResult.valid == false){
        validatorResult.errors.forEach(error => {
            ret.push(error.stack);
        });
    }
    return ret;
}