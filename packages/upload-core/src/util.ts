import type { DetailedError, UploadOptions as TusUploadOptions } from 'tus-js-client';

// https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript/8831937#8831937
export const hashCode = (str: string) => {
  let hash = 0;
  if (str.length === 0) return hash;

  for (let i = 0; i < str.length; i++) {
    // eslint-disable-next-line unicorn/prefer-code-point
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char; // eslint-disable-line no-bitwise
    // eslint-disable-next-line operator-assignment
    hash = hash & hash; // eslint-disable-line no-bitwise
  }

  return hash;
};

export const isDetailedError = (error: Error | DetailedError): error is DetailedError =>
  (error as DetailedError).originalResponse !== undefined;

export const createFingerprint = (
  file: File,
  options: TusUploadOptions,
  callback?: (data: null, key: string) => string
) =>
  new Promise<string>((resolve) => {
    const { metadata = {}, endpoint } = options;

    const values = Object.values(metadata);

    const attributes = [file.name, file.type, file.size, file.lastModified];
    const signature = [attributes.toString().replaceAll(',', ''), endpoint, values].join('');

    const hash = Math.abs(hashCode(signature));

    const fingerprint = ['tus', ...attributes, hash].filter((value) => value ?? false).join('-');

    if (callback) {
      resolve(callback(null, fingerprint));
    } else {
      resolve(fingerprint);
    }
  });
