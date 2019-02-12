import AvSlotMachine from '../slotmachine';

const mockHttp = jest.fn(() => Promise.resolve({}));
const mockMerge = jest.fn((...args) => Object.assign(...args));

describe('AvSlotMachine', () => {
  let api;

  test('should be defined', () => {
    api = new AvSlotMachine({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: {},
    });

    expect(api).toBeDefined();
  });

  test('should handle no config passed in', () => {
    api = new AvSlotMachine({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
    });
    expect(api).toBeDefined();
  });

  test('query should return valid data', () => {
    api = new AvSlotMachine({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: {},
    });

    const data = `query {
      space(id: "rkxw8tu_p7") {
        name
        id
        url
        tenant
        permissions
        metadata {
          name
          value
        }
        type
        link {
          text
          url
          target
        }
      }
    }
    `;

    api.create = jest.fn();
    api.query(data);
    expect(api.create).toHaveBeenLastCalledWith({
      query: data,
    });
  });
});
