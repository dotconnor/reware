export class BaseCache {
  // eslint-disable-next-line no-unused-vars
  get(key: string, req?: Express.Request): Buffer | undefined {
    return undefined
  }
  // eslint-disable-next-line no-unused-vars
  set(key: string, image: Buffer, req?: Express.Request): void {
    return
  }
}
