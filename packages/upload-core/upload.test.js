import Upload from './upload';

const options = {
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
    }).toThrow('[options.files] must be defined and of type File');
  });

  it('should throw error with missing bucket id', () => {
    expect(() => {
      new Upload([]); // eslint-disable-line
    }).toThrow('[options.bucketId] must be defined');
  });

  it('should allow single file as constructor arguement', () => {
    const file = Buffer.from('hello world'.split(''));
    new Upload(file, options); // eslint-disable-line
  });

  it('should use default options ', () => {
    const file = [Buffer.from('hello world'.split(''))];
    const upload = new Upload(file, options);

    expect(upload.options.endpoint).toBe(
      '/ms/api/availity/internal/core/vault/upload/v1/resumable'
    );
  });
});
