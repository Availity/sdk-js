import Upload from './upload';

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

describe('upload.core', () => {
  it('should be defined', () => {
    expect(Upload).toBeTruthy();
  });

  it('should throw error for missing files', () => {
    expect(() => {
      new Upload(); // eslint-disable-line
    }).toThrow('[options.file] must be defined and of type File');
  });

  it('should throw error with missing bucket id', () => {
    expect(() => {
      new Upload([]); // eslint-disable-line
    }).toThrow('[options.bucketId] must be defined');
  });

  it('should allow single file as constructor argument', () => {
    const file = Buffer.from('hello world'.split(''));
    new Upload(file, options); // eslint-disable-line
  });

  it('should throw error for invalid file type', () => {
    const file = Buffer.from('hello world'.split(''));
    file.name = 'notCoolFile.docx';
    const upload = new Upload(file, optionsWithFileTypes); // eslint-disable-line
    upload.start();
    expect(upload.isValidFile()).toBeFalsy();
  });

  it('should allow the correct file type', () => {
    const file = Buffer.from('hello world'.split(''));
    file.name = 'coolFile.PNG';
    new Upload(file, optionsWithFileTypes); // eslint-disable-line
  });

  it('should use default options ', () => {
    const file = Buffer.from('hello world'.split(''));
    const upload = new Upload(file, options);

    expect(upload.options.endpoint).toBe(
      '/ms/api/availity/internal/core/vault/upload/v1/resumable'
    );
  });

  it('should not allow files over maxSize', () => {
    const file = Buffer.from('hello world!'.split(''));
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
    const upload = new Upload(file, options);
    upload.start();
    const getResponseHeaderMethod = function() {
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
});
