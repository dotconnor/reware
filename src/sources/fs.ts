import { promises as fs } from "fs"
import { join } from "path"
import glob from "glob"
import { BaseSource } from "./base"
import { escapeGlob } from "../utils/escapeGlob"

interface FileSystemSourceOptions {
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
  options: FileSystemSourceOptions
  constructor(options: FileSystemSourceOptions) {
    super()
    if (!options) {
      throw new Error(`FileSystemSource requires a options parameter.`)
    }
    this.options = options
  }
  async get(key: string): Promise<Buffer> {
    key = escapeGlob(key)
    if (
      this.internal_options !== null &&
      !this.internal_options.exactPathMatch
    ) {
      key = `${key}.@(${this.internal_options.pathMatchFileTypes!.join(`,`)})`
    }
    const matches = await globAsync(key, { cwd: this.options.basePath })
    if (matches.length === 0) {
      throw new FileNotFoundError(`File not found on File System`, key)
    }
    const file = await fs.readFile(join(this.options.basePath, matches[0]))
    return file
  }
}
