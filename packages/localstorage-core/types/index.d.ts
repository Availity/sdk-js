declare function get(key: string): any;

declare function set(key: string, value: any): void;

declare function remove(key: string): void;

declare function getKeys(searchKey: string): void;

declare function removeKeys(searchKey: string): void;

declare function getSessionBust(): any;


export {
  get,
  set,
  remove,
  getKeys,
  removeKeys,
  getSessionBust
}
