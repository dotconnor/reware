import { Router } from "express"

export interface RewareOptions {}

export const DEFAULT_OPTIONS: RewareOptions = {}

const reware = (options?: RewareOptions): Router => {
  const app = Router()
  options = { ...DEFAULT_OPTIONS, ...options }
  return app
}

export default reware
module.exports = reware
module.exports.DEFAULT_OPTIONS = DEFAULT_OPTIONS
