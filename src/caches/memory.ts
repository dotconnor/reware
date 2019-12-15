import LRUCache from "lru-cache";
import { BaseCache } from "./base";

export class MemoryCache extends BaseCache {
  cache: LRUCache<string, Buffer>;
  constructor(options: LRUCache.Options<string, Buffer> = {}) {
    super();
    this.cache = new LRUCache({
      max: 250,
      ...options,
    });
  }

  get(key: string, _req?: Express.Request) {
    return this.cache.get(key);
  }
  set(key: string, image: Buffer, _req?: Express.Request) {
    this.cache.set(key, image);
  }
}
