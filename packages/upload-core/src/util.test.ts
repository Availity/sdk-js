import { createFingerprint, hashCode, isDetailedError } from './util';

describe('upload-core util', () => {
  test('hash code is generated', () => {
    expect(hashCode('abc123')).toBe(-1424436592);
    expect(hashCode('987zyx')).toBe(1685338401);
  });

  test('return 0 if no value provided', () => {
    expect(hashCode('')).toBe(0);
  });

  test('create fingerprint for file upload', async () => {
    const file = new File(['Hello world'], 'test');

    const fingerprint = await createFingerprint(file, { endpoint: '/test', metadata: { foo: 'bar' } });

    expect(fingerprint).toContain('tus-test-11-');
  });

  test('create fingerprint and call callback', async () => {
    const file = new File(['Hello world'], 'test');
    const mockFn = jest.fn((...args) => args[1]);

    const fingerprint = await createFingerprint(file, { endpoint: '/test', metadata: { foo: 'bar' } }, mockFn);

    expect(fingerprint).toContain('tus-test-11-');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('determine if an error is a detailed error', () => {
    expect(isDetailedError(new Error('test'))).toBeFalsy();

    const detailedError = new Error('test');
    // @ts-expect-error allow error for testing
    detailedError.originalResponse = {};
    expect(isDetailedError(detailedError)).toBeTruthy();
  });
});
