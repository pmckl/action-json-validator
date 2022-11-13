const fs = require('fs');

module.exports = function (path){
    try{
        return fs.readFileSync(path, 'utf8')
    }
    catch(err){
        return "";
    }
}