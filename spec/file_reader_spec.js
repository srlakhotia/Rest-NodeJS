var fReader = require('../modules/file_reader'),
    fs = require('fs');

describe('Testing filereader module', () => {
    let mockPath = 'C:\FakePath\file.txt',
        mockContentType = 'utf-8';

    beforeEach(() => {
        spyOn(fs, 'readFile');
    });
    it('where it should send out error if file reading encounters error', () => {
        fs.readFile.and.callFake((path, contentType, callback) => {
            callback('Mock Error');
        });
        fReader(mockPath, (err, data) => {
            expect(err).toBe('Mock Error');
        });
    });

    it('where it should send out success callback if file has successfully read', () => {
        fs.readFile.and.callFake((path, contentType, callback) => {
            callback(null, 'File read Successful');
        });

        fReader(mockPath, (err, data) => {
            expect(err).toBe(null);
            expect(data).toBe('File read Successful');
        });
    });
});