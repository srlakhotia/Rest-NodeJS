var fileReader = require('./file_reader'),
    fileWriter = require('./file_writer'),
    yaml = require('json2yaml'),
    yamlText;

function jsonConverter(jsonPath, yamlPath, callback) {  
    if(!jsonPath) {
        callback("Provide a path to JSON file (source)");
    }
    if(!yamlPath) {
        callback("Provide a path to YAML file (destination)")
    }
    fileReader(jsonPath, (err, data) => {
        let rawJSON;
        if(err) {
            callback(err);
            return;
        }
        rawJSON = JSON.parse(data);
        rawJSON && rawJSON.length && rawJSON.forEach((myObj, index) => {
            myObj.size = JSON.stringify(myObj).length;
        });

        yamlText = yaml.stringify(rawJSON);
        fileWriter(yamlPath, yamlText, (err, res) => {
            if(err) {
                callback(err);
                return;
            }
            callback(null, res);
        });
    });
};

module.exports = jsonConverter;