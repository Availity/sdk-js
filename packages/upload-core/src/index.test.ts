import { server } from '../mocks/server';
import Upload from '.';

const BUCKET_ID = 'abc';
const CUSTOMER_ID = '123';
const CLIENT_ID = 'test123';
const VAULT_URL = '/ms/api/availity/internal/core/vault/upload/v1/resumable';

const options = {
  bucketId: BUCKET_ID,
  customerId: CUSTOMER_ID,
  clientId: CLIENT_ID,
};

type MockFile = Buffer & {
  name?: string;
  type?: string;
  lastModified?: number;
  webkitRelativePath?: string;
  size?: number;
};

const readTestFile = (fileName: string, type?: string) => {
  const file: MockFile = Buffer.from('hello world');

  file.name = fileName;
  file.type = type;
  file.lastModified = Date.now();
  file.webkitRelativePath = 'foo';

  return file;
};

describe('upload-core', () => {
  it('should be defined', () => {
    expect(Upload).toBeTruthy();
  });

  describe('options', () => {
    it('should throw error for missing file', () => {
      // @ts-expect-error ignore ts for testing
      expect(() => new Upload()).toThrow('[file] must be defined and of type File');
    });

    it('should throw error when missing required values', () => {
      // @ts-expect-error ignore ts for testing
      expect(() => new Upload(Buffer.from('hello world'), {})).toThrow('[options.bucketId] must be defined');
      // @ts-expect-error ignore ts for testing
      expect(() => new Upload(Buffer.from('hello world'), { bucketId: BUCKET_ID })).toThrow(
        '[options.customerId] must be defined'
      );
      // @ts-expect-error ignore ts for testing
      expect(() => new Upload(Buffer.from('hello world'), { bucketId: BUCKET_ID, customerId: CUSTOMER_ID })).toThrow(
        '[options.clientId] must be defined'
      );
    });

    it('should allow single file as constructor argument', () => {
      const file = new File(['hello world'], 'test');

      const upload = new Upload(file, options);

      expect(upload.isValidFile()).toBeTruthy();
    });

    it('should use default options', () => {
      const file = new File(['hello world'], 'test');

      const upload = new Upload(file, options);

      expect(upload.options.endpoint).toBe(`http://localhost${VAULT_URL}`);
    });

    it('should allow override to defaults', () => {
      const file = new File(['hello world'], 'test');

      const upload = new Upload(file, { ...options, retryDelays: [] });

      expect(upload.options.retryDelays.length).toBe(0);
    });

    it('should allow the correct file type', () => {
      const file = new File(['hello world'], 'validFiletype.docx');

      const upload = new Upload(file, { ...options, fileTypes: ['.docx'] });

      expect(upload.isValidFile()).toBeTruthy();
    });

    it('should throw error for invalid file type', () => {
      const file = new File(['hello world'], 'invalidFileType.docx');

      const upload = new Upload(file, { ...options, fileTypes: ['.png', '.pdf'] });

      expect(upload.isValidFile()).toBeFalsy();
    });

    it('should allow files under maxSize', () => {
      const file = new File(['hello world'], 'validSize.pdf');

      const upload = new Upload(file, { ...options, maxSize: 1000 });

      expect(upload.isValidFile()).toBeTruthy();
    });

    it('should throw an error when file is over maxSize', () => {
      const file = new File(['hello world'], 'invalidSize.pdf');

      const upload = new Upload(file, { ...options, maxSize: 5 });

      expect(upload.isValidFile()).toBeFalsy();
      expect(upload.errorMessage).toBe('Document is too large');
    });

    it('should use metadata values for fingerprint', async () => {
      const fileName = 'a';
      const fileType = 'b';

      const file = new File(['hello world'], fileName, {
        type: fileType,
      });

      const fileSize = file.size;

      const upload = new Upload(file, { ...options, metadata: { documentTypeId: 'd' } });
      expect(await upload.generateId()).toContain(`tus-${fileName}-${fileType}-${fileSize}-`);
    });
  });

  describe('utils', () => {
    it('should check filePath for slashes', () => {
      const files = [
        {
          name: '\\bad\\file\\path\\file.pdf',
          stripFileNamePathSegments: false,
          expected: '\\bad\\file\\path\\file.pdf',
        },
        { name: '\\bad\\file\\path\\file2.pdf', stripFileNamePathSegments: true, expected: 'file2.pdf' },
        { name: '/bad/file/path/file3.pdf', stripFileNamePathSegments: true, expected: 'file3.pdf' },
        { name: 'goodFileName.pdf', stripFileNamePathSegments: true, expected: 'goodFileName.pdf' },
      ];

      const uploads = files.map(({ name, stripFileNamePathSegments }) => {
        const file = new File(['hello world'], name);
        const upload = new Upload(file, { ...options, stripFileNamePathSegments });
        return upload.trimFileName(upload.file.name);
      });

      for (const [i, upload] of uploads.entries()) {
        expect(upload).toBe(files[i].expected);
      }
    });

    it('should pass status of decrypting', async () => {
      const file = new File(['hello world'], 'decryptThisFile.png');

      const upload = new Upload(file, options);

      upload.setError('encrypted', 'Encrypted files require a password');
      upload.setError('decrypting', 'Decrypting file');

      expect(upload.status).toBe('decrypting');
    });

    it('should validate file name', () => {
      const file = new File(['hello world'], 'good file name.pdf');
      const upload = new Upload(file, { ...options, allowedFileNameCharacters: 'a-zA-Z0-9_ ' });
      expect(upload.isValidFile()).toBeTruthy();

      const file2 = new File(['hello world'], 'bad-file-name.pdf');
      const upload2 = new Upload(file2, { ...options, allowedFileNameCharacters: 'a-zA-Z0-9 _' });
      expect(upload2.isValidFile()).toBeFalsy();

      const file3 = new File(['hello world'], '123File(1).xlsx');
      const upload3 = new Upload(file3, { ...options, allowedFileNameCharacters: '_a-zA-Z0-9 ' });
      expect(upload3.isValidFile()).toBeFalsy();

      const file4 = new File(['hello world'], 'fileName');
      const upload4 = new Upload(file4, { ...options, allowedFileNameCharacters: '_a-zA-Z0-9 ' });
      expect(upload4.isValidFile()).toBeTruthy();
    });
  });

  describe('upload', () => {
    beforeAll(() => {
      server.listen();
    });

    afterEach(() => {
      server.resetHandlers();
    });

    afterAll(() => {
      server.close();
    });

    it('should upload a file', async () => {
      const file = readTestFile('testFile.txt');

      // @ts-expect-error allow error for testing
      const upload = new Upload(file, { ...options, retryDelays: [] });

      const mockOnSuccess = jest.fn();

      const startUpload = () =>
        new Promise<void>((resolve, reject) => {
          upload.onError.push(reject);

          upload.onSuccess.push(mockOnSuccess, resolve);

          upload.start();
        });

      // Wait until upload finishes
      await startUpload();

      expect(mockOnSuccess).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      const file = readTestFile('testFile.txt');

      const mockOnError = jest.fn();

      const startUpload = () =>
        new Promise<Upload>((resolve, reject) => {
          // @ts-expect-error allow error for testing
          const upload = new Upload(file, { ...options, bucketId: 'err', retryDelays: [] });

          upload.onError.push(mockOnError, () => {
            resolve(upload);
          });

          upload.onSuccess.push(reject);

          upload.start();
        });

      // Wait until upload finishes
      const upload = await startUpload();

      expect(mockOnError).toHaveBeenCalled();
      expect(upload.errorMessage).toContain('response code: 400');
    });

    it('should time out when av scan takes too long', async () => {
      const file = readTestFile('testFile.txt');

      // @ts-expect-error allow error for mock file
      const upload = new Upload(file, {
        ...options,
        bucketId: 'mno',
        pollingTime: 10, // so that Jest does not time out our test while waiting for retires
        retryDelays: [],
      });

      const onErrorMock = jest.fn();
      const errorMessage = new Error('AV scan timed out, max retries exceeded');

      const startUpload = () =>
        new Promise<void>((resolve, reject) => {
          upload.onError.push(onErrorMock, () => {
            resolve();
          });
          upload.onSuccess.push(reject);
          upload.start();
        });

      // Wait until upload finishes
      await startUpload();

      expect(onErrorMock).toHaveBeenCalledWith(errorMessage);
    });

    it('should pickup upload object on each array of functions in onPreStart', async () => {
      const fileName = 'testFile.txt';
      const file = readTestFile('testFile.txt');

      const mockFn = jest.fn();

      // @ts-expect-error allow error for mock file
      const upload = new Upload(file, {
        ...options,
        onPreStart: [
          (upload) => {
            mockFn(upload.file.name);
            return false;
          },
        ],
      });

      await upload.start();

      expect(mockFn).toHaveBeenCalledWith(fileName);
    });

    it('should parse references on upload accepted', async () => {
      const file = readTestFile('testFile.txt');

      const onSuccessMock = jest.fn();

      // @ts-expect-error allow error for mock file
      const upload = new Upload(file, options);

      const startUpload = () =>
        new Promise<void>((resolve, reject) => {
          upload.onError.push(reject);
          upload.onSuccess.push(onSuccessMock, resolve);
          upload.start();
        });

      // Wait until upload finishes
      await startUpload();

      expect(upload.references[0]).toMatch(/^(approved)\/(abc)\/([\dA-Za-z]+)$/);
    });

    it('should parse s3-references on upload accepted', async () => {
      const file = readTestFile('testFile.txt');

      const startUpload = () =>
        new Promise<Upload>((resolve, reject) => {
          // @ts-expect-error allow error for mock file
          const upload = new Upload(file, options);

          upload.onError.push(reject);
          upload.onSuccess.push(() => {
            resolve(upload);
          });
          upload.start();
        });

      // Wait until upload finishes
      const upload = await startUpload();

      expect(upload.s3References[0]).toMatch(/^s3:\/\/([^/]+)\/(.+)$/);
    });

    it('should start upload if all the functions in onPreStart returns true', async () => {
      const file = readTestFile('testFile.txt');

      const mockOnSuccess = jest.fn();

      const startUpload = () =>
        new Promise<void>((resolve, reject) => {
          // @ts-expect-error allow error for mock file
          const upload = new Upload(file, { ...options, onPreStart: [() => true, () => true] });

          upload.onError.push(reject);
          upload.onSuccess.push(mockOnSuccess, resolve);
          upload.start();
        });

      // Wait until upload finishes
      await startUpload();

      expect(mockOnSuccess).toHaveBeenCalled();
    });

    it('should not start upload if any onPreStart function returns false', async () => {
      const file = readTestFile('testFile.txt');

      // @ts-expect-error allow error for mock file
      const upload = new Upload(file, {
        ...options,
        onPreStart: [() => true, () => false, () => true],
      });

      await upload.start();

      expect(upload.status).toEqual('rejected');
      expect(upload.errorMessage).toEqual('preStart validation failed');
    });
  });
});
