/* eslint-disable @typescript-eslint/no-explicit-any */
export default class AvApi {
  constructor({ http, promise, merge, config }: { http: any; promise: any; merge: any; config: any });

  http: any;

  Promise: any;

  merge: any;

  defaultConfig: any;

  config(config?: any): any;

  addParams(params?: any, config?: any, newObj?: boolean): any;

  getSessionBust(): string;

  cacheParams(config: any): any;

  getCacheBustVal(cacheBust: any, defaultFn: any): any;

  getPageBust(): any;

  setPageBust(value: any): void;

  pageBustValue: any;

  getUrl(config: any, id?: string): any;

  getRequestUrl(): any;

  getLocation(response: any): string;

  shouldPoll(response: any): boolean;

  onResponse(response: any, afterResponse: any): any;

  request(config: any, afterResponse: any): any;

  create(data: any, config: any): any;

  sendBeacon(data: any, config: any): any;

  post(data: any, config: any): any;

  postGet(data: any, config: any): any;

  get(id: any, config: any): any;

  query(config: any): any;

  all(config: any): any;

  getQueryResultKey(data: any): string;

  getResult(data: any): any;

  getPage(page: number, config: any, limit: any): any;

  update(id: any, data: any, config: any): any;

  put(...args: any[]): any;

  patch(id: any, data: any, config: any): any;

  remove(id: any, config: any): any;

  delete(...args: any[]): any;
}
