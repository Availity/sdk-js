import nock from 'nock'; // nock is needed because tus will run as in node
import xhrMock from 'xhr-mock'; // xhr-mock is needed because upload-core only works in browser
import Upload from '../upload';

const options = {
  bucketId: 'a',
  customerId: 'b',
  clientId: 'c',
};

const optionsWithFileTypes = {
  bucketId: 'a',
  customerId: 'b',
  clientId: 'c',
  fileTypes: ['.png', '.pdf'],
};

const optionsWithFileSize = {
  bucketId: 'a',
  customerId: 'b',
  clientId: 'c',
  maxSize: 2e6,
};

const optionsWithMeta = {
  bucketId: 'a',
  customerId: 'b',
  clientId: 'c',
};

const optionsWithRetry = {
  bucketId: 'a',
  customerId: 'b',
  clientId: 'c',
  retryDelays: [1000, 2000],
};

const optionsWithOnPreStartFail = {
  bucketId: 'a',
  customerId: 'b',
  clientId: 'c',
  onPreStart: [() => true, () => false, () => true],
};

const optionsWithOnPreStartPass = {
  bucketId: 'a',
  customerId: 'b',
  clientId: 'c',
  onPreStart: [() => true, () => true, () => true],
};

describe('upload-core', () => {
  beforeEach(() => {
    global.jsdom.reconfigure({
      url: 'https://dev.local/other',
    });
  });

  it('should be defined', () => {
    expect(Upload).toBeTruthy();
  });

  describe('options', () => {
    it('should throw error for missing files', () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new Upload();
      }).toThrow('[options.file] must be defined and of type File');
    });

    it('should throw error with missing bucket id', () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new Upload([]);
      }).toThrow('[options.bucketId] must be defined');
    });

    it('should allow override to defaults', () => {
      const file = Buffer.from('hello world'.split(''));
      file.name = 'fileName.png';
      const upload = new Upload(file, optionsWithRetry);
      expect(upload.options.retryDelays[0]).toBe(
        optionsWithRetry.retryDelays[0]
      );
    });

    it('should not start upload if any one of the functions in onPreStart returns false', () => {
      const file = Buffer.from('hello world'.split(''));
      file.name = 'somefile.png';
      const upload = new Upload(file, optionsWithOnPreStartFail);

      upload.start();
      expect(upload.status).toEqual('rejected');
      expect(upload.errorMessage).toEqual('preStart validation failed');
    });

    it('should allow single file as constructor argument', () => {
      const file = Buffer.from('hello world'.split(''));
      file.name = 'fileName.png';
      const upload = new Upload(file, options);
      expect(upload.isValidFile()).toBeTruthy();
    });

    it('should throw error for invalid file type', () => {
      const file = Buffer.from('hello world'.split(''));
      file.name = 'notCoolFile.docx';
      const upload = new Upload(file, optionsWithFileTypes);
      expect(upload.isValidFile()).toBeFalsy();
    });

    it('should allow the correct file type', () => {
      const file = Buffer.from('hello world'.split(''));
      file.name = 'coolFile.png';
      const upload = new Upload(file, optionsWithFileTypes);
      expect(upload.isValidFile()).toBeTruthy();
    });

    it('should use default options', () => {
      const file = Buffer.from('hello world'.split(''));
      file.name = 'optionsFile.png';
      const upload = new Upload(file, options);

      expect(upload.options.endpoint).toBe(
        'https://dev.local/ms/api/availity/internal/core/vault/upload/v1/resumable'
      );
    });

    it('should not allow files over maxSize', () => {
      const file = Buffer.from('hello world!'.split(''));
      file.name = 'sizeFile.pdf';
      file.size = 1e7;
      const upload = new Upload(file, optionsWithFileSize);
      expect(upload.isValidFile()).toBeFalsy();
    });

    it('should use metadata values for fingerprint', () => {
      const file = Buffer.from('hello world!'.split(''));
      file.name = 'a';
      file.type = 'b';
      file.size = 1e2;

      let options = Object.assign(optionsWithMeta, {
        metadata: { documentTypeId: 'd' },
      });

      let upload = new Upload(file, options);
      expect(upload.generateId()).toBe('tus-a-b-100-1016975905');

      options = Object.assign(optionsWithMeta, {
        metadata: { documentTypeId: 'e' },
      });

      upload = new Upload(file, options);
      expect(upload.generateId()).toBe('tus-a-b-100-1016975906');
    });
  });

  describe('utils', () => {
    it('should check filePath for slashes', () => {
      const file1 = Buffer.from('hello world!'.split(''));
      file1.name = '\\bad\\file\\path\\file.pdf';
      const upload1 = new Upload(
        file1,
        Object.assign(options, { stripFileNamePathSegments: false })
      );
      expect(upload1.trimFileName(file1.name)).toBe(file1.name);

      const file2 = Buffer.from('hello world!'.split(''));
      file2.name = '\\bad\\file\\path\\file2.pdf';
      const upload2 = new Upload(file2, optionsWithMeta);
      expect(upload2.trimFileName(file2.name)).toBe('file2.pdf');

      const file3 = Buffer.from('hello world!'.split(''));
      file3.name = '/bad/file/path/file3.pdf';
      const upload3 = new Upload(file3, optionsWithMeta);
      expect(upload3.trimFileName(file3.name)).toBe('file3.pdf');

      const file4 = Buffer.from('hello world!'.split(''));
      file4.name = 'goodFileName.pdf';
      const upload4 = new Upload(file4, optionsWithMeta);
      expect(upload4.trimFileName(file4.name)).toBe('goodFileName.pdf');
    });

    it('should pass status of decrypting', () => {
      const file = Buffer.from('hello world'.split(''));
      file.name = 'decryptThisFile.png';
      const upload = new Upload(file, options);
      upload.setError('encrypted', 'Encrypted files require a password');
      upload.setError('decrypting', 'Decrypting file');
      expect(upload.status).toBe('decrypting');
    });

    it('should validate file name', () => {
      const file = Buffer.from('hello world'.split(''));
      file.name = 'good file name.pdf';
      const upload = new Upload(
        file,
        Object.assign(options, { allowedFileNameCharacters: 'a-zA-Z0-9_ ' })
      );
      expect(upload.isValidFile()).toBeTruthy();

      const file2 = Buffer.from('hello world'.split(''));
      file2.name = 'Bad-file-name.pdf';
      const upload2 = new Upload(
        file2,
        Object.assign(options, { allowedFileNameCharacters: 'a-zA-Z0-9 _' })
      );
      expect(upload2.isValidFile()).toBeFalsy();

      const file3 = Buffer.from('hello world'.split(''));
      file3.name = '123File(1).xlsx';
      const upload3 = new Upload(
        file3,
        Object.assign(options, { allowedFileNameCharacters: '_a-zA-Z0-9 ' })
      );
      expect(upload3.isValidFile()).toBeFalsy();

      const file4 = Buffer.from('hello world'.split(''));
      file4.name = 'fileName';
      const upload4 = new Upload(
        file4,
        Object.assign(options, { allowedFileNameCharacters: '_a-zA-Z0-9 ' })
      );
      expect(upload4.isValidFile()).toBeTruthy();
    });

    describe('upload', () => {
      beforeEach(() => {
        xhrMock.setup();
      });

      afterEach(() => {
        xhrMock.teardown();
      });
      it('should upload a file', () =>
        new Promise((resolve) => {
          nock('https://dev.local')
            .post('/ms/api/availity/internal/core/vault/upload/v1/resumable/a/')
            .reply(
              201,
              {},
              {
                'tus-resumable': '1.0.0',
                'upload-expires': 'Fri, 12 Jan 2030 15:54:39 GMT',
                'transfer-encoding': 'chunked',
                location: '4611142db7c049bbbe37376583a3f46b',
              }
            );

          nock('https://dev.local')
            .patch(
              '/ms/api/availity/internal/core/vault/upload/v1/resumable/a/4611142db7c049bbbe37376583a3f46b'
            )
            .reply(
              204,
              {},
              {
                'tus-resumable': '1.0.0',
                'upload-expires': 'Fri, 12 Jan 2030 15:54:39 GMT',
                'transfer-encoding': 'chunked',
                'Upload-Offset': 12,
                references:
                  '["/files/105265/9ee77f6d-9779-4b96-a995-0df47657e504"]',
              }
            );

          const file = Buffer.from('hello world!');
          file.name = 'a';
          const upload = new Upload(file, options);
          const success = jest.fn();
          upload.onSuccess.push(success, () => {
            expect(success).toHaveBeenCalled();
            resolve();
          });

          xhrMock.use('HEAD', /.*4611142db7c049bbbe37376583a3f46b.*/, {
            status: 200,
            headers: {
              'Content-Length': '0',
              'AV-Scan-Result': 'accepted',
              'Upload-Result': 'accepted',
            },
          });

          upload.start();
        }));
      it('should pickup upload object on each array of functions in onPreStart', () => {
          const file = Buffer.from('hello world!');
          file.name = 'a';
          const upload = new Upload(file, {
            ...optionsWithOnPreStartFail, onPreStart: optionsWithOnPreStartFail.onPreStart.concat([(upload) => {
              expect(upload).toBeDefined();
          }]) });
          upload.start();
        });
      it('should start upload if all the functions in onPreStart returns true', () =>
        new Promise((resolve) => {
          nock('https://dev.local')
            .post('/ms/api/availity/internal/core/vault/upload/v1/resumable/a/')
            .reply(
              201,
              {},
              {
                'tus-resumable': '1.0.0',
                'upload-expires': 'Fri, 12 Jan 2030 15:54:39 GMT',
                'transfer-encoding': 'chunked',
                location: '4611142db7c049bbbe37376583a3f46b',
              }
            );

          nock('https://dev.local')
            .patch(
              '/ms/api/availity/internal/core/vault/upload/v1/resumable/a/4611142db7c049bbbe37376583a3f46b'
            )
            .reply(
              204,
              {},
              {
                'tus-resumable': '1.0.0',
                'upload-expires': 'Fri, 12 Jan 2030 15:54:39 GMT',
                'transfer-encoding': 'chunked',
                'Upload-Offset': 12,
                references:
                  '["/files/105265/9ee77f6d-9779-4b96-a995-0df47657e504"]',
              }
            );

          const file = Buffer.from('hello world!');
          file.name = 'a';
          const upload = new Upload(file, optionsWithOnPreStartPass);
          const success = jest.fn();
          upload.onSuccess.push(success, () => {
            expect(success).toHaveBeenCalled();
            resolve();
          });

          xhrMock.use('HEAD', /.*4611142db7c049bbbe37376583a3f46b.*/, {
            status: 200,
            headers: {
              'Content-Length': '0',
              'AV-Scan-Result': 'accepted',
              'Upload-Result': 'accepted',
            },
          });

          upload.start();
        }));
    });
  });
});
