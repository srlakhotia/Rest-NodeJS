var fileReader = require('./file_reader'),
    fileWriter = require('./file_writer'),
    yaml = require('json2yaml'),
    yamlText;

function jsonConverter(jsonPath, yamlPath, callback) {  
    if(!jsonPath || jsonPath.split('.').pop().toLowerCase() !== 'json') {
        callback("Provide a path to JSON file (source)");
        return;
    }
    if(!yamlPath || yamlPath.split('.').pop().toLowerCase() !== 'yml') {
        callback("Provide a path to YAML (.yml) file (destination)");
        return;
    }
    fileReader(jsonPath, (err, data) => {
        let rawJSON;
        if(err) {
            callback(err);
            return;
        }

        try {
            rawJSON = JSON.parse(data);
        } catch(e) {
            rawJSON = data;
        }

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