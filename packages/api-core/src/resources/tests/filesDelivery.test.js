import AvFilesDelivery from '../filesDelivery';

const mockHttp = vi.fn(() => Promise.resolve({}));

const mockConfig = {
  clientId: '123-456',
  customerId: '1194',
};

describe('AvFileDelivery', () => {
  let api;

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should be defined', () => {
    api = new AvFilesDelivery({ http: mockHttp });
    expect(api).toBeDefined();
  });

  test('should handle no config passed in', () => {
    api = new AvFilesDelivery({
      http: mockHttp,
      promise: Promise,
    });
    expect(api).toBeDefined();
  });

  test('post url should be correct', () => {
    api = new AvFilesDelivery({
      http: mockHttp,
      promise: Promise,
    });
    expect(api.getUrl(mockConfig)).toBe('/ms/api/availity/internal/platform/file-upload-delivery/v1/batch/deliveries');
  });

  test('uploadFilesDelivery() should throw when customerId is missing', () => {
    api = new AvFilesDelivery({ http: mockHttp });
    expect(() => api.uploadFilesDelivery({}, { clientId: '456' })).toThrow(
      '[config.customerId] and [config.clientId] must be defined'
    );
  });

  test('uploadFilesDelivery() should throw when clientId is missing', () => {
    api = new AvFilesDelivery({ http: mockHttp });
    expect(() => api.uploadFilesDelivery({}, { customerId: '456' })).toThrow(
      '[config.customerId] and [config.clientId] must be defined'
    );
  });

  test('uploadFile() should call create for reference passed', () => {
    api = new AvFilesDelivery({ http: mockHttp });

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

    api.create = vi.fn();
    api.uploadFilesDelivery(data, mockConfig);
    expect(api.create).toHaveBeenLastCalledWith(data, api.config(mockConfig));
  });
});
