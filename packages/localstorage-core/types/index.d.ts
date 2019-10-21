class AvLocalStorageCore {
  public get: (key: string) => any;

  public set: (key: string, value: any) => void;

  public remove: (key: string) => void;

  public getKeys: (searchKey: string) => void;

  public removeKeys: (searchKey: string) => void;

  public getSessionBust: () => any;
}

export default AvLocalStorageCore;
