import LRUCache from "lru-cache"
import { BaseCache } from "./base"

export class MemoryCache extends BaseCache {
  cache: LRUCache<String, Buffer>
  constructor(options: LRUCache.Options<String, Buffer> = {}) {
    super()
    this.cache = new LRUCache({
      max: 250,
      ...options,
    })
  }

  get(key: string) {
    return this.cache.get(key)
  }
  set(key: string, image: Buffer) {
    this.cache.set(key, image)
  }
}
