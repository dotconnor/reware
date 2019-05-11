// eslint-disable-next-line no-unused-vars
import { Options } from "../types"

export interface SourceOptions {
  exactPathMatch?: boolean
  pathMatchFileTypes?: string[]
}
export const DEFAULT_SOURCE_OPTIONS = {
  exactPathMatch: false,
  pathMatchFileTypes: [`jpg`, `jpeg`, `gif`, `png`, `webp`],
}
export class BaseSource {
  options: SourceOptions
  constructor(options: SourceOptions) {
    this.options = { ...DEFAULT_SOURCE_OPTIONS, ...options }
  }
  // eslint-disable-next-line no-unused-vars
  get(key: string, req?: Express.Request): Promise<Buffer> {
    return Promise.resolve(Buffer.alloc(0))
  }
}
