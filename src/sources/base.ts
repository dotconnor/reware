// eslint-disable-next-line no-unused-vars
import { Options } from "../types"

export class BaseSource {
  internal_options: Options | null = null
  get(key: string): Promise<Buffer> {
    if (this.internal_options === null) {
      throw new Error(`Source not initialized.`)
    }
    return Promise.resolve(Buffer.alloc(0))
  }
  _init(options: Options) {
    this.internal_options = options
  }
}
