var j2y_converter = require('../modules/json_2_yaml_converter'),
    fs = require('fs'),
    yaml = require('json2yaml');

describe('Testing json to yaml converter', () => {
    describe('where validations', () => {
        it('of JSON path should detect for black field error', () => {
            j2y_converter('', '', (err, data) => {
                expect(data).toBe(undefined);
                expect(err).toBe('Provide a path to JSON file (source)');
            });
        });
        it('of JSON path should detect for non JSON file error', () => {
            j2y_converter('file.js', '', (err, data) => {
                expect(data).toBe(undefined);
                expect(err).toBe('Provide a path to JSON file (source)');
            });
        });

        it('of YAML path should detect for black field error', () => {
            j2y_converter('file.json', '', (err, data) => {
                expect(data).toBe(undefined);
                expect(err).toBe('Provide a path to YAML (.yml) file (destination)');
            });
        });
        it('of YAML path should detect for non YAML file error', () => {
            j2y_converter('file.json', 'target.YAAML', (err, data) => {
                expect(data).toBe(undefined);
                expect(err).toBe('Provide a path to YAML (.yml) file (destination)');
            });
        });
    });
    describe('where source and destination files are validated', () => {
        let mockJSON = [
            {
              "name": "Apple",
              "type": "Fruit"
            },
            {
              "name": "Mango",
              "type": "Fruit"
            },
            {
              "name": "Spinach",
              "type": "Veggie"
            },
            {
              "name": "Cabbage",
              "type": "Veggie"
            },
            {
              "name": "Tomato",
              "type": "Veggie"
            }
          ];
        beforeEach(() => {
            spyOn(fs, 'readFile');
            spyOn(fs, 'writeFile');
            fs.readFile.and.callFake((path, contentType, callback) => {
                callback(null, mockJSON);
            });

            fs.writeFile.and.callFake((path, content, callback) => {
                callback(null, 'Successfully written');
            });
        });
        it('where it should return error in callback if file reader returns error', () => {
            fs.readFile.and.callFake((path, contentType, callback) => {
                callback('Mock Error');
            });
            j2y_converter('file.json', 'target.YML', (err, data) => {
                expect(err).toBe('Mock Error');
            });
        });

        it('where it should return error in callback when file writing returns error', () => {
            fs.writeFile.and.callFake((path, content, callback) => {
                callback('Mock Error');
            });

            j2y_converter('file.json', 'target.YML', (err, data) => {
                expect(err).toBe('Mock Error');
            });
        });

        it('where it should return successful callback when YAML file is written successfully', () => {
            j2y_converter('file.json', 'target.YML', (err, data) => {
                expect(err).toBe(null);
                expect(data).toBe('Successfully written');
            });
        });
    });
});