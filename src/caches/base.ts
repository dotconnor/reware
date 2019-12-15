export class BaseCache {
  get(_key: string, _req?: Express.Request): Buffer | undefined {
    return undefined;
  }
  // eslint-disable-next-line no-unused-vars
  set(_key: string, _image: Buffer, _req?: Express.Request): void {
    return;
  }
}
