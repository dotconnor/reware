import test from "ava"
import express from "express"
import request from "supertest"

import reware from "../src/reware"
import { FileSystemSource } from "../src/sources/fs"
import { join } from "path"
import { MemoryCache } from "../src/caches/memory"

test(`app should set to cache`, async (t) => {
  t.plan(1)
  let hitCache = false
  class Cache extends MemoryCache {
    set(key: string, image: Buffer) {
      hitCache = true
      return super.set(key, image)
    }
  }
  const app = express()
  app.use(
    reware({
      caches: [new Cache()],
      source: new FileSystemSource({
        basePath: join(__dirname, `fixtures`),
      }),
    })
  )
  await request(app)
    .get(`/logo`)
    .send()
  t.true(hitCache)
})

test(`app should read from cache`, async (t) => {
  t.plan(3)
  let cached
  class Cache extends MemoryCache {
    get(key: string) {
      cached = super.get(key)
      return cached
    }
  }
  const app = express()
  app.use(
    reware({
      caches: [new Cache()],
      source: new FileSystemSource({
        basePath: join(__dirname, `fixtures`),
      }),
    })
  )
  t.falsy(cached)
  await request(app)
    .get(`/logo`)
    .send()
  t.falsy(cached)
  await request(app)
    .get(`/logo`)
    .send()
  t.truthy(cached)
})
