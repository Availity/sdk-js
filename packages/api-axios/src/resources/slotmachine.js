import AvMicroserviceApi from '../ms';

export default class AvSlotMachineApi extends AvMicroserviceApi {
  constructor(config) {
    super({
      name: 'spc/slotmachine/graphql',
      ...config,
    });
  }

  query(data, variables) {
    return this.create({ query: data, variables });
  }
}

export const avSlotMachineApi = new AvSlotMachineApi();
