import Upload from './upload';

const options = {
  bucket: 'healthplan-bucket',
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
    }).toThrow('[options.bucket] must be defined');
  });

  it('should allow single file as constructor arguement', () => {
    const file = Buffer.from('hello world'.split(''));
    new Upload(file, options); // eslint-disable-line
  });

  it('should allow array of file as constructor arguement', () => {
    const file = [Buffer.from('hello world'.split(''))];
    new Upload(file, options); // eslint-disable-line
  });
});
