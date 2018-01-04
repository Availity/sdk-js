import AvPermissions from '../permissions';

const mockHttp = jest.fn(() => Promise.resolve({}));
const mockMerge = jest.fn((...args) => Object.assign(...args));

describe('AvPermissions', () => {
  let api;

  test('should be defined', () => {
    api = new AvPermissions(mockHttp, Promise, mockMerge, {});
    expect(api).toBeDefined();
  });

  test('should handle no config passed in', () => {
    api = new AvPermissions(mockHttp, Promise, mockMerge);
    expect(api).toBeDefined();
  });

  test('getPermissions() should query with permissionId and region params from arguments', () => {
    api = new AvPermissions(mockHttp, Promise, mockMerge);
    api.query = jest.fn();
    const id = 'testPermissionId';
    const region = 'testRegion';
    const expectedConfig = { params: { id, region } };
    api.getPermissions(id, region);
    expect(api.query).toHaveBeenLastCalledWith(expectedConfig);
  });
});
