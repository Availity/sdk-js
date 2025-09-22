import Upload from '@availity/upload-core';

import AvMicroserviceApi from '../ms';

export default class AvFilesApi extends AvMicroserviceApi {
  constructor(config) {
    super({
      name: 'core/vault/upload/v1',
      headers: {
        'Content-Type': undefined,
      },
      ...config,
    });
  }

  hashData(data) {
    const str = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.codePointAt(i);
      // eslint-disable-next-line no-bitwise
      hash = (hash << 5) - hash + char;
      // eslint-disable-next-line no-bitwise
      hash &= hash;
    }
    return Math.abs(hash).toString(36);
  }

  async uploadFile(data, config) {
    if (!config.customerId || !config.clientId) {
      throw new Error('[config.customerId] and [config.clientId] must be defined');
    }

    const file = new File([JSON.stringify(data)], config.fileName || `${this.hashData(data)}.json`, {
      type: 'application/json',
    });

    const upload = new Upload(file, {
      bucketId: config.id,
      customerId: config.customerId,
      clientId: config.clientId,
      endpoint: '/cloud/web/appl/vault/upload/v1/resumable',
    });

    await upload.generateId();

    return new Promise((resolve, reject) => {
      upload.onSuccess.push(() => resolve(upload));
      upload.onError.push((error) => reject(error));
      upload.start();
    });
  }
}

export const avFilesApi = new AvFilesApi();
