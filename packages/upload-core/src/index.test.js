import nock from 'nock'; // nock is needed because tus will run as in node
import xhrMock from 'xhr-mock'; // xhr-mock is needed because upload-core only works in browser

import Upload from '.';

const BUCKET_ID = 'bucket';
const CUSTOMER_ID = '123';
const CLIENT_ID = 'test123';
const BASE_URL = 'https://dev.local';
const VAULT_URL = '/ms/api/availity/internal/core/vault/upload/v1/resumable';
const LOCATION = '123abc789xyz';

const options = {
  bucketId: BUCKET_ID,
  customerId: CUSTOMER_ID,
  clientId: CLIENT_ID,
};

const optionsWithMeta = {
  bucketId: BUCKET_ID,
  customerId: CUSTOMER_ID,
  clientId: CLIENT_ID,
};

const optionsWithOnPreStartFail = {
  bucketId: BUCKET_ID,
  customerId: CUSTOMER_ID,
  clientId: CLIENT_ID,
  onPreStart: [() => true, () => false, () => true],
};

const optionsWithOnPreStartPass = {
  bucketId: BUCKET_ID,
  customerId: CUSTOMER_ID,
  clientId: CLIENT_ID,
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
      expect(() => new Upload()).toThrow('[file] must be defined and of type File');
    });

    it('should throw error with missing bucket id', () => {
      expect(() => new Upload([])).toThrow('[options.bucketId] must be defined');
    });

    it('should allow override to defaults', () => {
      const file = Buffer.from([...'hello world']);
      file.name = 'fileName.png';
      const retryDelays = [1000, 2000];

      const upload = new Upload(file, { ...options, retryDelays });

      expect(upload.options.retryDelays[0]).toBe(retryDelays[0]);
    });

    it('should not start upload if any onPreStart function returns false', async () => {
      const file = Buffer.from([...'hello world']);
      file.name = 'somefile.png';

      const startUpload = () =>
        new Promise((resolve) => {
          const upload = new Upload(file, {
            ...options,
            onPreStart: [() => true, () => false, () => true],
          });

          upload.start();

          resolve(upload);
        });

      // Wait until upload finishes
      const upload = await startUpload();

      expect(upload.status).toEqual('rejected');
      expect(upload.errorMessage).toEqual('preStart validation failed');
    });

    it('should allow single file as constructor argument', () => {
      const file = Buffer.from([...'hello world']);
      file.name = 'fileName.png';

      const upload = new Upload(file, options);

      expect(upload.isValidFile()).toBeTruthy();
    });

    it('should throw error for invalid file type', () => {
      const file = Buffer.from([...'hello world']);
      file.name = 'notCoolFile.docx';

      const upload = new Upload(file, { ...options, fileTypes: ['.png', '.pdf'] });

      expect(upload.isValidFile()).toBeFalsy();
    });

    it('should allow the correct file type', () => {
      const file = Buffer.from([...'hello world']);
      file.name = 'coolFile.png';

      const upload = new Upload(file, { ...options, fileTypes: ['.png', '.pdf'] });

      expect(upload.isValidFile()).toBeTruthy();
    });

    it('should use default options', () => {
      const file = Buffer.from([...'hello world']);
      file.name = 'optionsFile.png';

      const upload = new Upload(file, options);

      expect(upload.options.endpoint).toBe(`${BASE_URL}${VAULT_URL}`);
    });

    it('should not allow files over maxSize', () => {
      const file = Buffer.from([...'hello world!']);
      file.name = 'sizeFile.pdf';
      file.size = 1e7;

      const upload = new Upload(file, { ...options, maxSize: 2e6 });

      expect(upload.isValidFile()).toBeFalsy();
      expect(upload.errorMessage).toBe('Document is too large');
    });

    it('should use metadata values for fingerprint', async () => {
      const file = Buffer.from([...'hello world!']);
      file.name = 'a';
      file.type = 'b';
      file.size = 1e2;

      let options = Object.assign(optionsWithMeta, {
        metadata: { documentTypeId: 'd' },
      });

      let upload = new Upload(file, options);
      expect(await upload.generateId()).toBe('tus-a-b-100-1016975905');

      options = Object.assign(optionsWithMeta, {
        metadata: { documentTypeId: 'e' },
      });

      upload = new Upload(file, options);
      expect(await upload.generateId()).toBe('tus-a-b-100-1016975906');
    });
  });

  describe('utils', () => {
    it('should check filePath for slashes', () => {
      const file1 = Buffer.from([...'hello world!']);
      file1.name = '\\bad\\file\\path\\file.pdf';
      const upload1 = new Upload(file1, Object.assign(options, { stripFileNamePathSegments: false }));
      expect(upload1.trimFileName(file1.name)).toBe(file1.name);

      const file2 = Buffer.from([...'hello world!']);
      file2.name = '\\bad\\file\\path\\file2.pdf';
      const upload2 = new Upload(file2, optionsWithMeta);
      expect(upload2.trimFileName(file2.name)).toBe('file2.pdf');

      const file3 = Buffer.from([...'hello world!']);
      file3.name = '/bad/file/path/file3.pdf';
      const upload3 = new Upload(file3, optionsWithMeta);
      expect(upload3.trimFileName(file3.name)).toBe('file3.pdf');

      const file4 = Buffer.from([...'hello world!']);
      file4.name = 'goodFileName.pdf';
      const upload4 = new Upload(file4, optionsWithMeta);
      expect(upload4.trimFileName(file4.name)).toBe('goodFileName.pdf');
    });

    it('should pass status of decrypting', () => {
      const file = Buffer.from([...'hello world']);
      file.name = 'decryptThisFile.png';

      const upload = new Upload(file, options);

      upload.setError('encrypted', 'Encrypted files require a password');
      upload.setError('decrypting', 'Decrypting file');

      expect(upload.status).toBe('decrypting');
    });

    it('should validate file name', () => {
      const file = Buffer.from([...'hello world']);
      file.name = 'good file name.pdf';
      const upload = new Upload(file, Object.assign(options, { allowedFileNameCharacters: 'a-zA-Z0-9_ ' }));
      expect(upload.isValidFile()).toBeTruthy();

      const file2 = Buffer.from([...'hello world']);
      file2.name = 'Bad-file-name.pdf';
      const upload2 = new Upload(file2, Object.assign(options, { allowedFileNameCharacters: 'a-zA-Z0-9 _' }));
      expect(upload2.isValidFile()).toBeFalsy();

      const file3 = Buffer.from([...'hello world']);
      file3.name = '123File(1).xlsx';
      const upload3 = new Upload(file3, Object.assign(options, { allowedFileNameCharacters: '_a-zA-Z0-9 ' }));
      expect(upload3.isValidFile()).toBeFalsy();

      const file4 = Buffer.from([...'hello world']);
      file4.name = 'fileName';
      const upload4 = new Upload(file4, Object.assign(options, { allowedFileNameCharacters: '_a-zA-Z0-9 ' }));
      expect(upload4.isValidFile()).toBeTruthy();
    });
  });

  describe('upload', () => {
    // beforeAll(() => server.listen());

    beforeEach(() => {
      xhrMock.setup();
    });

    afterEach(() => {
      xhrMock.teardown();
      // server.resetHandlers();
    });

    // afterAll(() => server.close());

    it('should upload a file', async () => {
      nock(BASE_URL).post(`${VAULT_URL}/${BUCKET_ID}/`).reply(
        201,
        {},
        {
          'tus-resumable': '1.0.0',
          'upload-expires': 'Fri, 12 Jan 2030 15:54:39 GMT',
          'transfer-encoding': 'chunked',
          location: LOCATION,
        }
      );

      nock(BASE_URL).patch(`${VAULT_URL}/${BUCKET_ID}/${LOCATION}`).reply(
        204,
        {},
        {
          'tus-resumable': '1.0.0',
          'upload-expires': 'Fri, 12 Jan 2030 15:54:39 GMT',
          'transfer-encoding': 'chunked',
          'Upload-Offset': 12,
          references: '["/files/105265/9ee77f6d-9779-4b96-a995-0df47657e504"]',
        }
      );

      xhrMock.use('HEAD', new RegExp(LOCATION), {
        status: 200,
        headers: {
          'Content-Length': '0',
          'AV-Scan-Result': 'accepted',
          'Upload-Result': 'accepted',
        },
      });

      const file = Buffer.from('hello world!');
      file.name = 'a';

      const upload = new Upload(file, options);

      const mockOnSuccess = jest.fn();

      const startUpload = () =>
        new Promise((resolve) => {
          upload.onSuccess.push(mockOnSuccess, () => {
            resolve();
          });
          upload.start();
        });

      // Wait until upload finishes
      await startUpload();

      expect(mockOnSuccess).toHaveBeenCalled();
    });

    it('should time out when av scan takes too long', async () => {
      nock(BASE_URL).post(`${VAULT_URL}/${BUCKET_ID}/`).reply(
        201,
        {},
        {
          'tus-resumable': '1.0.0',
          'upload-expires': 'Fri, 12 Jan 2030 15:54:39 GMT',
          'transfer-encoding': 'chunked',
          location: LOCATION,
        }
      );

      nock(BASE_URL).patch(`${VAULT_URL}/${BUCKET_ID}/${LOCATION}`).reply(
        204,
        {},
        {
          'tus-resumable': '1.0.0',
          'upload-expires': 'Fri, 12 Jan 2030 15:54:39 GMT',
          'transfer-encoding': 'chunked',
          'Upload-Offset': 12,
          references: '["/files/105265/9ee77f6d-9779-4b96-a995-0df47657e504"]',
        }
      );

      const file = Buffer.from('hello world!');
      file.name = 'a';

      const upload = new Upload(file, {
        ...options,
        pollingTime: 50, // so that Jest does not time out our test while waiting for retires
      });

      const onErrorMock = jest.fn();
      const errorMessage = new Error('AV scan timed out, max retries exceeded');

      xhrMock.use('HEAD', new RegExp(LOCATION), {
        status: 200,
        headers: {
          'Content-Length': '0',
          'AV-Scan-Result': 'pending',
          'Upload-Result': 'pending',
        },
      });

      const startUpload = () =>
        new Promise((resolve) => {
          upload.onError.push(onErrorMock, () => {
            resolve();
          });

          upload.start();
        });

      // Wait until upload finishes
      await startUpload();

      expect(onErrorMock).toHaveBeenCalledWith(errorMessage);
    });

    it('should pickup upload object on each array of functions in onPreStart', async () => {
      const file = Buffer.from('hello world!');
      const fileName = 'test';
      file.name = fileName;

      const mockFn = jest.fn();

      const startUpload = () =>
        new Promise((resolve) => {
          const upload = new Upload(file, {
            ...optionsWithOnPreStartFail,
            onPreStart: [
              (upload) => {
                mockFn(upload.file.name);
                return false;
              },
            ],
          });
          upload.start();

          resolve();
        });

      await startUpload();

      expect(mockFn).toHaveBeenCalledWith(fileName);
    });

    it('should parse references on upload accepted', async () => {
      nock(BASE_URL).post(`${VAULT_URL}/${BUCKET_ID}/`).reply(
        201,
        {},
        {
          'tus-resumable': '1.0.0',
          'upload-expires': 'Fri, 12 Jan 2030 15:54:39 GMT',
          'transfer-encoding': 'chunked',
          location: LOCATION,
        }
      );

      nock(BASE_URL).patch(`${VAULT_URL}/${BUCKET_ID}/${LOCATION}`).reply(
        204,
        {},
        {
          'tus-resumable': '1.0.0',
          'upload-expires': 'Fri, 12 Jan 2030 15:54:39 GMT',
          'transfer-encoding': 'chunked',
          'Upload-Offset': 12,
          'AV-Scan-Result': 'accepted',
          'Upload-Result': 'accepted',
          references: '["/files/105265/9ee77f6d-9779-4b96-a995-0df47657e504"]',
          's3-references': '["s3://files/105265/9ee77f6d-9779-4b96-a995-0df47657e504"]',
        }
      );

      const file = Buffer.from('hello world!');
      file.name = 'a';

      const onSuccessMock = jest.fn();

      const upload = new Upload(file, options);

      xhrMock.use('HEAD', new RegExp(LOCATION), {
        status: 200,
        headers: {
          'Content-Length': '0',
          'AV-Scan-Result': 'accepted',
          'Upload-Result': 'accepted',
        },
      });

      const startUpload = () =>
        new Promise((resolve) => {
          upload.onSuccess.push(onSuccessMock, () => {
            resolve();
          });
          upload.start();
        });

      // Wait until upload finishes
      await startUpload();

      expect(upload.references[0]).toBe('/files/105265/9ee77f6d-9779-4b96-a995-0df47657e504');
    });

    it('should parse s3-references on upload accepted', async () => {
      nock(BASE_URL).post(`${VAULT_URL}/${BUCKET_ID}/`).reply(
        201,
        {},
        {
          'tus-resumable': '1.0.0',
          'upload-expires': 'Fri, 12 Jan 2030 15:54:39 GMT',
          'transfer-encoding': 'chunked',
          location: LOCATION,
        }
      );

      nock(BASE_URL).patch(`${VAULT_URL}/${BUCKET_ID}/${LOCATION}`).reply(
        204,
        {},
        {
          'tus-resumable': '1.0.0',
          'upload-expires': 'Fri, 12 Jan 2030 15:54:39 GMT',
          'transfer-encoding': 'chunked',
          'Upload-Offset': 12,
          'AV-Scan-Result': 'accepted',
          'Upload-Result': 'accepted',
          references: '["/files/105265/9ee77f6d-9779-4b96-a995-0df47657e504"]',
          's3-references': '["s3://files/105265/9ee77f6d-9779-4b96-a995-0df47657e504"]',
        }
      );

      const file = Buffer.from('hello world!');
      file.name = 'a';

      const onSuccessMock = jest.fn();

      const upload = new Upload(file, optionsWithOnPreStartPass);

      xhrMock.use('HEAD', new RegExp(LOCATION), {
        status: 200,
        headers: {
          'Content-Length': '0',
          'AV-Scan-Result': 'accepted',
          'Upload-Result': 'accepted',
        },
      });

      const startUpload = () =>
        new Promise((resolve) => {
          upload.onSuccess.push(onSuccessMock, () => {
            resolve();
          });
          upload.start();
        });

      // Wait until upload finishes
      await startUpload();

      expect(upload.s3References[0]).toBe('s3://files/105265/9ee77f6d-9779-4b96-a995-0df47657e504');
    });

    it('should start upload if all the functions in onPreStart returns true', async () => {
      nock(BASE_URL).post(`${VAULT_URL}/${BUCKET_ID}/`).reply(
        201,
        {},
        {
          'tus-resumable': '1.0.0',
          'upload-expires': 'Fri, 12 Jan 2030 15:54:39 GMT',
          'transfer-encoding': 'chunked',
          location: LOCATION,
        }
      );

      nock(BASE_URL).patch(`${VAULT_URL}/${BUCKET_ID}/${LOCATION}`).reply(
        204,
        {},
        {
          'tus-resumable': '1.0.0',
          'upload-expires': 'Fri, 12 Jan 2030 15:54:39 GMT',
          'transfer-encoding': 'chunked',
          'Upload-Offset': 12,
          references: '["/files/105265/9ee77f6d-9779-4b96-a995-0df47657e504"]',
        }
      );

      const file = Buffer.from('hello world!');
      file.name = 'a';

      const upload = new Upload(file, optionsWithOnPreStartPass);

      xhrMock.use('HEAD', new RegExp(LOCATION), {
        status: 200,
        headers: {
          'Content-Length': '0',
          'AV-Scan-Result': 'accepted',
          'Upload-Result': 'accepted',
        },
      });

      const mockOnSuccess = jest.fn();

      const startUpload = () =>
        new Promise((resolve) => {
          upload.onSuccess.push(mockOnSuccess, () => {
            resolve();
          });
          upload.start();
        });

      // Wait until upload finishes
      await startUpload();

      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });
});
