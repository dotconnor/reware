import { BaseSource } from "./base"

export class S3Source extends BaseSource {
  get(key: String) {
    return Buffer.alloc(0)
  }
}
