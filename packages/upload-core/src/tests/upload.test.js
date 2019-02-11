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

describe('upload.core', () => {
  it('should be defined', () => {
    expect(Upload).toBeTruthy();
  });

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
    expect(upload.options.retryDelays[0]).toBe(optionsWithRetry.retryDelays[0]);
  });

  it('should allow single file as constructor argument', () => {
    const file = Buffer.from('hello world'.split(''));
    file.name = 'fileName.png';
    // eslint-disable-next-line no-new
    new Upload(file, options);
  });

  it('should throw error for invalid file type', () => {
    const file = Buffer.from('hello world'.split(''));
    file.name = 'notCoolFile.docx';
    const upload = new Upload(file, optionsWithFileTypes);
    upload.start();
    expect(upload.isValidFile()).toBeFalsy();
  });

  it('should allow the correct file type', () => {
    const file = Buffer.from('hello world'.split(''));
    file.name = 'coolFile.PNG';
    // eslint-disable-next-line no-new
    new Upload(file, optionsWithFileTypes);
  });

  it('should use default options', () => {
    const file = Buffer.from('hello world'.split(''));
    file.name = 'optionsFile.png';
    const upload = new Upload(file, options);

    expect(upload.options.endpoint).toBe(
      '/ms/api/availity/internal/core/vault/upload/v1/resumable'
    );
  });

  it('should not allow files over maxSize', () => {
    const file = Buffer.from('hello world!'.split(''));
    file.name = 'sizeFile.pdf';
    file.size = 1e7;
    const upload = new Upload(file, optionsWithFileSize);
    upload.start();
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
    upload.start();
    expect(upload.id).toBe('tus-a-b-100-1485272892');

    options = Object.assign(optionsWithMeta, {
      metadata: { documentTypeId: 'e' },
    });

    upload = new Upload(file, options);
    upload.start();
    expect(upload.id).toBe('tus-a-b-100-1485272891');
  });

  it('should parse error messages', () => {
    const file = Buffer.from('hello world!'.split(''));
    file.name = 'a';
    const upload = new Upload(file, options);
    upload.start();
    const getResponseHeaderMethod = function getResponseHeaderMethod() {
      return 'error message';
    };
    const err = {
      originalRequest: { getResponseHeader: getResponseHeaderMethod },
      message:
        'tus: unexpected response while creating upload, originated from request (response code: 400, response text: Missing valid positive numeric header: Upload-Length)',
    };
    upload.parseErrorMessage('Default Error', err);
    expect(upload.errorMessage).toBe('error message');

    const upload2 = new Upload(file, options);
    upload2.start();
    upload2.parseErrorMessage('Default Error');
    expect(upload2.errorMessage).toBe('Default Error');
  });

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
    upload.start();
    expect(upload.isValidFile()).toBeTruthy();

    const file2 = Buffer.from('hello world'.split(''));
    file2.name = 'Bad-file-name.pdf';
    const upload2 = new Upload(
      file2,
      Object.assign(options, { allowedFileNameCharacters: 'a-zA-Z0-9 _' })
    );
    upload2.start();
    expect(upload2.isValidFile()).toBeFalsy();

    const file3 = Buffer.from('hello world'.split(''));
    file3.name = '123File(1).xlsx';
    const upload3 = new Upload(
      file3,
      Object.assign(options, { allowedFileNameCharacters: '_a-zA-Z0-9 ' })
    );
    upload3.start();
    expect(upload3.isValidFile()).toBeFalsy();

    const file4 = Buffer.from('hello world'.split(''));
    file4.name = 'fileName';
    const upload4 = new Upload(
      file4,
      Object.assign(options, { allowedFileNameCharacters: '_a-zA-Z0-9 ' })
    );
    upload4.start();
    expect(upload4.isValidFile()).toBeTruthy();
  });
});
