var fWriter = require('../modules/file_writer'),
    fs = require('fs');

describe('Testing fileWriter Module', () => {
    let mockPath = 'C:\FakePath\file.txt',
        mockContent = 'Hello World';

    beforeEach(() => {
        spyOn(fs, 'writeFile');
    });

    it('where it should send out error if file writing encounters error', () => {
        fs.writeFile.and.callFake((path, content, callback) => {
            callback('Mock Error');
        });

        fWriter(mockPath, mockContent, (err, data) => {
            expect(err).toBe('Mock Error');
        });
    });

    it('where it should send success callback if file writing is successful', () => {
        fs.writeFile.and.callFake((path, content, callback) => {
            callback(null, 'Writing successful');
        });

        fWriter(mockPath, mockContent, (err, data) => {
            expect(err).toBe(null);
            expect(data).toBe('Writing successful');
        });
    });
});