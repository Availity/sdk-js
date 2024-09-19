import AvFilesDelivery from '../filesDelivery';

const mockHttp = jest.fn(() => Promise.resolve({}));
const mockMerge = jest.fn((...args) => Object.assign(...args));

const mockConfig = {
  clientId: '123-456',
  customerId: '1194',
};

describe('AvFileDelivery', () => {
  let api;

  test('should be defined', () => {
    api = new AvFilesDelivery({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: {},
    });
    expect(api).toBeDefined();
  });

  test('should handle no config passed in', () => {
    api = new AvFilesDelivery({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
    });
    expect(api).toBeDefined();
  });

  test('post url should be correct', () => {
    api = new AvFilesDelivery({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
    });
    expect(api.getUrl(mockConfig)).toBe(
      '/ms/api/availity/internal/platform/file-upload-delivery/v1/batch/deliveries'
    );
  });

  test('uploadFile() should call create for reference passed', () => {
    api = new AvFilesDelivery({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: {},
    });

    const data = {
      deliveries: [
        {
          fileURI: 'uri',
          deliveryChannel: 'DEMO',
          metadata: {
            payerId: 'test_payerId',
            requestId: '123',
            patientLastName: 'lastName',
            patientFirstName: 'firstName',
          },
        },
      ],
    };

    api.create = jest.fn();
    api.uploadFilesDelivery(data, mockConfig);
    expect(api.create).toHaveBeenLastCalledWith(data, api.config(mockConfig));
  });
});
