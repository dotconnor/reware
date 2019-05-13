/* eslint-disable no-unused-vars */
import { QueryOptions } from "./parseOptions"

export function getCacheKey(key: string, options: QueryOptions): string {
  return `${key}_${JSON.stringify(options)}`
}
