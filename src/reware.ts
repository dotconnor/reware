import { Router } from "express"
import { BaseSource } from "./sources/base"
import { FileNotFoundError } from "./sources/base"
import { checkImageType } from "./utils/checkImageType"
import { parseQuery, parseKey } from "./utils/parseOptions"
import { applyOptions } from "./utils/applyOptions"
// eslint-disable-next-line no-unused-vars
import { BaseCache } from "./caches/base"
import { MemoryCache } from "./caches/memory"
import { getCacheKey } from "./utils/getCacheKey"

export interface RewareOptions {
  source?: BaseSource
  caches?: BaseCache[]
  passThroughError?: boolean
}

export const DEFAULT_OPTIONS: RewareOptions = {
  source: new BaseSource({}),
  passThroughError: false,
  caches: [new MemoryCache()],
}

const reware = (options?: RewareOptions): Router => {
  const app = Router()
  const _options = { ...DEFAULT_OPTIONS, ...options }
  app.get(`/:key`, async (req, res, next) => {
    const { key } = req.params
    try {
      const done = (img: Buffer) =>
        res
          .set(`Content-Type`, checkImageType(img)!.mime)
          .send(img)
          .end()
      const opts = parseQuery(key, req.query)
      const cache_key = getCacheKey(parseKey(key), opts)
      for (const cache of _options.caches || []) {
        const cached = cache.get(cache_key)
        if (cached) {
          return done(cached)
        }
      }
      let image = await _options.source!.get(parseKey(key), req)
      const t = checkImageType(image)
      if (t === null) {
        if (_options.passThroughError) {
          return next(new Error(`File from source is not an image`))
        }
        return res.sendStatus(400)
      }
      // eslint-disable-next-line require-atomic-updates
      image = await applyOptions(image, opts)
      _options.caches!.forEach((cache) => {
        cache.set(cache_key, image)
      })
      return done(image)
    } catch (e) {
      if (_options.passThroughError) {
        return next(e)
      }
      if (e instanceof FileNotFoundError) {
        return res.sendStatus(404)
      }
      return res.sendStatus(400)
    }
  })
  return app
}

export default reware
module.exports = reware
module.exports.DEFAULT_OPTIONS = DEFAULT_OPTIONS
