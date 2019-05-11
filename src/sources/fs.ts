import { promises as fs } from "fs"
import { join } from "path"
import glob from "glob"
// eslint-disable-next-line no-unused-vars
import { BaseSource, SourceOptions } from "./base"
import { escapeGlob } from "../utils/escapeGlob"

interface FileSystemSourceOptions extends SourceOptions {
  basePath: string
}
function globAsync(key: string, options: glob.IOptions) {
  return new Promise<string[]>((resolve, reject) => {
    glob(key, options, (err, matches) => {
      if (err) {
        reject(err)
      } else {
        resolve(matches)
      }
    })
  })
}
export class FileNotFoundError extends Error {
  key: string
  constructor(message: string, key: string) {
    super(message)
    this.key = key
  }
}
export class FileSystemSource extends BaseSource {
  fsoptions: FileSystemSourceOptions
  constructor(options: FileSystemSourceOptions) {
    super(options)
    if (!options) {
      throw new Error(`FileSystemSource requires a options parameter.`)
    }
    this.fsoptions = options
  }
  // eslint-disable-next-line no-unused-vars
  async get(key: string, req?: Express.Request): Promise<Buffer> {
    key = escapeGlob(key)
    if (this.options !== null && !this.options.exactPathMatch) {
      key = `${key}.@(${this.options.pathMatchFileTypes!.join(`,`)})`
    }
    const matches = await globAsync(key, { cwd: this.fsoptions.basePath })
    if (matches.length === 0) {
      throw new FileNotFoundError(`File not found on File System`, key)
    }
    const file = await fs.readFile(join(this.fsoptions.basePath, matches[0]))
    return file
  }
}
