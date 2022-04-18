/* eslint-disable @typescript-eslint/no-explicit-any */
import AvApi from './api';

export default class AvMicroservice extends AvApi {
  getUrl(config: any, id?: string): string;
}
