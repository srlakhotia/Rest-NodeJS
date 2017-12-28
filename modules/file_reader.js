var fs = require('fs');

function fileReader(path, callback) {
    fs.readFile(path, 'utf-8', (err, data) => {
        if(err) {
            return callback(err);
        }
        callback(null, data);
    });
}

module.exports = fileReader;