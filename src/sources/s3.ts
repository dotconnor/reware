import { S3, SharedIniFileCredentials } from "aws-sdk"
import LRUCache from "lru-cache"
// eslint-disable-next-line no-unused-vars
import { BaseSource, SourceOptions, FileNotFoundError } from "./base"

export interface S3SourceOptions extends SourceOptions {
  bucket: string
  region?: string
  accessKeyId?: string
  secretAccessKey?: string
  profile?: string
}

const DEFAULT_OPTIONS = {
  region: `us-east-1`,
}

function getS3Options(opts: S3SourceOptions): any {
  let opt: any = {
    region: opts.region,
  }
  if (opts.accessKeyId || opts.secretAccessKey) {
    if (!(opts.accessKeyId && opts.secretAccessKey)) {
      throw new Error(
        `If either AWS Access Key or Secret Key is provided then both are required.`
      )
    }
    opt = {
      ...opt,
      accessKeyId: opts.accessKeyId,
      secretAccessKey: opts.secretAccessKey,
    }
  }
  if (opts.profile) {
    const cred = new SharedIniFileCredentials({ profile: opts.profile })
    opt = {
      ...opt,
      credentials: cred,
    }
  }
  return opt
}

function listObjectsAsync(
  client: S3,
  options: S3.ListObjectsV2Request
): Promise<S3.ListObjectsV2Output> {
  return new Promise((resolve, reject) => {
    client.listObjectsV2(options, (err, data) => {
      if (err) {
        return reject(err)
      }
      return resolve(data)
    })
  })
}

function getObjectAsync(
  client: S3,
  options: S3.GetObjectRequest
): Promise<S3.GetObjectOutput> {
  return new Promise((resolve, reject) => {
    client.getObject(options, (err, data) => {
      if (err) {
        return reject(err)
      }
      return resolve(data)
    })
  })
}

export class S3Source extends BaseSource {
  s3options: S3SourceOptions
  client: S3
  matchCache: LRUCache<string, string>
  constructor(options: S3SourceOptions) {
    super(options)
    if (!options) {
      throw new Error(`FileSystemSource requires a options parameter.`)
    }
    this.s3options = { ...DEFAULT_OPTIONS, ...options }
    this.client = new S3(getS3Options(this.s3options))
    this.matchCache = new LRUCache({
      max: 250,
    })
  }
  async matchCacheGetOrSet(key: string): Promise<string | undefined> {
    if (this.matchCache.has(key)) {
      return this.matchCache.get(key)
    }
    const { Contents: matches } = await listObjectsAsync(this.client, {
      Bucket: this.s3options.bucket,
      Prefix: key,
    })
    if (!matches || matches.length === 0 || !matches[0].Key) {
      return undefined
    }
    this.matchCache.set(key, matches[0].Key)
    return matches[0].Key
  }
  async get(key: string, req?: Express.Request) {
    const match = await this.matchCacheGetOrSet(key)
    if (!match) {
      throw new FileNotFoundError(`File not found on S3`, key)
    }
    const file = await getObjectAsync(this.client, {
      Bucket: this.s3options.bucket,
      Key: match,
    })
    return file.Body as Buffer
  }
}
