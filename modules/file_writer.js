var fs = require('fs');

function fileWriter(path, content, callback) {
    fs.writeFile(path, content, (err, res) => {
        if(err) {
            callback(err);
            return;
        }
        callback(null, res)
    });
}

module.exports = fileWriter;