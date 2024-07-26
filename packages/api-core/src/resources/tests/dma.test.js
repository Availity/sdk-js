import AvLogMessagesV2 from '../dma';

const mockHttp = jest.fn(() => Promise.resolve({}));
const mockMerge = jest.fn((...args) => Object.assign(...args));

describe('AvLogMessages', () => {
  let api;
  test('should be defined', () => {
    api = new AvLogMessagesV2({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: {},
    });
    expect(api).toBeDefined();

    const fields = api.send('info', { testField1: 'test1', testField2: 'test2'});
    expect(fields).toContain('level=info&entries.testField1=test1&entries.testField2=test2');
  });
});
