import { parse } from "path"

export interface QueryOptions {
  width?: number
  height?: number
  type?: `jpg` | `png` | `webp`
  fit?: `cover` | `contain` | `fill` | `inside` | `outside`
}

type OptionTypes = `width` | `height` | `type` | `fit`

class OptionsError extends Error {
  type: OptionTypes
  constructor(message: string, type: OptionTypes) {
    super(message)
    this.type = type
  }
}

const imageExts = new Set([`jpg`, `png`, `webp`])
const fitTypes = new Set([`cover`, `contain`, `fill`, `inside`, `outside`])
const getExt = /(?:\.([^.]+))?$/

export function parseKey(key: string) {
  const parsedKey = parse(key)
  return parsedKey.name
}

export function parseQuery(key: string, query: any): QueryOptions {
  const obj: QueryOptions = {}
  const ext = getExt.exec(key)
  if (ext !== null && ext[1]) {
    if (!imageExts.has(ext[1])) {
      throw new OptionsError(`Failed to parse query options.`, `type`)
    }
    obj.type = ext[1] as `jpg` | `png` | `webp`
  }
  if (query.fit) {
    if (!fitTypes.has(query.fit)) {
      throw new OptionsError(`Failed to parse query options.`, `fit`)
    }
    obj.type = query.fit
  }
  if (query.width) {
    let { width } = query
    width = Number.parseInt(width, 10)
    if (Number.isNaN(width)) {
      throw new OptionsError(`Failed to parse query options.`, `width`)
    }
    obj.width = width
  }
  if (query.height) {
    let { height } = query
    height = Number.parseInt(height, 10)
    if (Number.isNaN(height)) {
      throw new OptionsError(`Failed to parse query options.`, `height`)
    }
    obj.height = height
  }
  return obj
}
