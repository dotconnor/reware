import { BaseSource } from "./base"

export class S3Source extends BaseSource {
  get(key: string) {
    return Promise.resolve(Buffer.alloc(0))
  }
}
