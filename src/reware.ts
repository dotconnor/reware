import { Router } from "express"
// eslint-disable-next-line no-unused-vars
import { Options } from "./types"

export const DEFAULT_OPTIONS: Options = {
  exactPathMatch: false,
  pathMatchFileTypes: [`jpg`, `jpeg`, `gif`, `png`, `webp`],
}

const reware = (options?: Options): Router => {
  const app = Router()
  options = { ...DEFAULT_OPTIONS, ...options }
  return app
}

export default reware
module.exports = reware
module.exports.DEFAULT_OPTIONS = DEFAULT_OPTIONS
