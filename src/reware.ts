import { Router } from "express"
// eslint-disable-next-line no-unused-vars
import { Options } from "./types"

const DEFAILT_OPTIONS: Options = {
  exactPathMatch: false,
}

const reware = (options?: Options): Router => {
  const app = Router()
  options = { ...DEFAILT_OPTIONS, ...options }
  return app
}

export default reware
module.exports = reware
