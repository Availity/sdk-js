import AvUserPermissions from '../userPermissions';

const mockHttp = jest.fn(() => Promise.resolve({}));
const mockMerge = jest.fn((...args) => Object.assign(...args));

describe('AvUserPermissions', () => {
  let api;

  test('should be defined', () => {
    api = new AvUserPermissions({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: {},
    });
    expect(api).toBeDefined();
  });

  test('should handle no config passed in', () => {
    api = new AvUserPermissions({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
    });
    expect(api).toBeDefined();
  });

  test('getPermissions should query with permissionId and region params from arguments', () => {
    api = new AvUserPermissions({
      http: mockHttp,
      promise: Promise,
      merge: mockMerge,
      config: {},
    });
    api.query = jest.fn();
    const permissionId = 'testPermissionId';
    const region = 'testRegion';
    const expectedConfig = { params: { permissionId, region } };
    api.getPermissions(permissionId, region);
    expect(api.query).toHaveBeenLastCalledWith(expectedConfig);
  });
});
