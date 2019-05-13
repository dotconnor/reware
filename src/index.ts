import reware from "./reware"
export * from "./sources/base"
export * from "./sources/fs"
export * from "./sources/s3"
export * from "./caches/base"
export * from "./caches/memory"

module.exports = reware
Object.assign(module.exports, exports)
