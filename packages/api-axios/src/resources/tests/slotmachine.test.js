import AvSlotMachineApi from '../slotmachine';

describe('AvSlotMachineApi', () => {
  let api;
  beforeEach(() => {
    api = new AvSlotMachineApi();
  });

  test('should be defined', () => {
    expect(api).toBeDefined();
  });

  test('url should be correct', () => {
    expect(api.getUrl(api.config())).toBe('/ms/api/availity/internal/spc/slotmachine/graphql');
  });

  test('query should return valid data', async () => {
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
    await api.query(data);
    expect(api.create).toHaveBeenLastCalledWith({
      query: data,
    });
  });
});
