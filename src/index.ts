import reware from "./reware"
export { BaseSource, SourceOptions } from "./sources/base"
export { FileSystemSource, FileSystemSourceOptions } from "./sources/fs"
export { S3Source, S3SourceOptions } from "./sources/s3"

module.exports = reware
Object.assign(module.exports, exports)
