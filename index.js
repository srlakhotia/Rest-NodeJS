var path = require('path'),
    json2yamlConverter = require('./modules/json_2_yaml_converter');

json2yamlConverter(path.join(__dirname, 'resources/source.json'), path.join(__dirname, 'dist/transformed.yaml'), (err, res) => {
    if(err) { throw err };
    console.log('Converted successfully')
});