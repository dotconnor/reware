export class BaseCache {
  // eslint-disable-next-line no-unused-vars
  get(key: string): Buffer | undefined {
    return undefined
  }
  // eslint-disable-next-line no-unused-vars
  set(key: string, image: Buffer): void {
    return
  }
}
