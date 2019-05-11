export interface SourceOptions {
  pathMatchFileTypes?: string[]
}
export const DEFAULT_SOURCE_OPTIONS = {
  exactPathMatch: false,
  pathMatchFileTypes: [`jpg`, `jpeg`, `gif`, `png`, `webp`],
}

export class FileNotFoundError extends Error {
  key: string
  constructor(message: string, key: string) {
    super(message)
    this.key = key
  }
}

export class BaseSource {
  options: SourceOptions
  constructor(options?: SourceOptions) {
    this.options = { ...DEFAULT_SOURCE_OPTIONS, ...options }
  }
  // eslint-disable-next-line no-unused-vars
  get(key: string, req?: Express.Request): Promise<Buffer> {
    return Promise.resolve(Buffer.alloc(0))
  }
}
