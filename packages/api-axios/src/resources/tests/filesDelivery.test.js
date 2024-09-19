import AvFilesDeliveryApi from '../filesDelivery';

const mockConfig = {
  clientId: '123-456',
  customerId: '1194',
};

describe('AvFileDelivery', () => {
  let api;
  beforeEach(() => {
    api = new AvFilesDeliveryApi();
  });

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('url should be correct', () => {
    expect(api.getUrl(api.config())).toBe(
      '/ms/api/availity/internal/platform/file-upload-delivery/v1/batch/deliveries'
    );
  });

  test('polling url should be correct', () => {
    expect(api.getLocation({ headers: { Location: '/ms/api/availity/internal/platform/file-upload-delivery/v1/batch/deliveries/id123'}, data: { id: 'id123'}, config: {}})).toBe(
      'http://localhost:8080/ms/api/availity/internal/platform/file-upload-delivery/v1/batch/deliveries/id123'
    );
    expect(api.getLocation({ headers: { Location: '/ms/api/availity/internal/platform/file-upload-delivery/v1/batch/deliveries/id123'}, data: {}, config: {}})).toBe(
      'http://localhost:8080/ms/api/availity/internal/platform/file-upload-delivery/v1/batch/deliveries/id123'
    );
  });

  test('uploadFile() should call create for reference passed', async () => {
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
    await api.uploadFilesDelivery(data, mockConfig);

    const conf = api.config(mockConfig);
    conf.headers['X-Availity-Customer-ID'] = mockConfig.customerId;
    conf.headers['X-Client-ID'] = mockConfig.clientId;

    expect(api.create).toHaveBeenLastCalledWith(data, conf);
  });
});
