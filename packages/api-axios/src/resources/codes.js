import AvApi from '../api';

export default class AvCodesApi extends AvApi {
  constructor(config) {
    super({
      name: 'codes',
      ...config,
    });
  }
}

export const avCodesApi = new AvCodesApi();
