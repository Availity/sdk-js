import { createFingerprint, hashCode } from './util';

describe('upload-core util', () => {
  test('hash code is generated', () => {
    expect(hashCode('abc123')).toBe(-1424436592);
    expect(hashCode('987zyx')).toBe(1685338401);
  });

  test('create fingerprint for file upload', async () => {
    const file = new File(['Hello world'], 'test');

    const fingerprint = await createFingerprint(file, { endpoint: '/test', metadata: { foo: 'bar' } });

    expect(fingerprint).toContain('tus-test-11-');
  });
});
