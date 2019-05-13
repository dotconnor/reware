import { Router } from "express"
import { BaseSource } from "./sources/base"
import { FileNotFoundError } from "./sources/base"
import { checkImageType } from "./utils/checkImageType"
import { parseQuery, parseKey } from "./utils/parseOptions"
import { applyOptions } from "./utils/applyOptions"

export interface RewareOptions {
  source?: BaseSource
  passThroughError?: boolean
}

export const DEFAULT_OPTIONS: RewareOptions = {
  source: new BaseSource({}),
  passThroughError: false,
}

const reware = (options?: RewareOptions): Router => {
  const app = Router()
  const _options = { ...DEFAULT_OPTIONS, ...options }
  app.get(`/:key`, async (req, res, next) => {
    const { key } = req.params
    try {
      let image = await _options.source!.get(parseKey(key), req)
      const t = checkImageType(image)
      if (t === null) {
        if (_options.passThroughError) {
          return next(new Error(`File from source is not an image`))
        }
        return res.sendStatus(400)
      }
      const opts = parseQuery(key, req.query)
      image = await applyOptions(image, opts)
      return res
        .set(`Content-Type`, checkImageType(image)!.mime)
        .send(image)
        .end()
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
