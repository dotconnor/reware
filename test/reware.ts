import test from "ava"
import express from "express"
import request from "supertest"
import fileType from "file-type"
import { PNG } from "pngjs"

import reware from "../src/reware"
import { FileSystemSource } from "../src/sources/fs"
import { join } from "path"

const makeApp = (options?: any) => {
  const app = express()
  app.use(
    reware({
      source: new FileSystemSource({
        basePath: join(__dirname, `fixtures`),
        ...options,
      }),
    })
  )
  return app
}

test(`reware() should return a function`, (t) => {
  t.is(typeof reware(), `function`)
})

test(`reware() should accept a options param`, (t) => {
  t.is(typeof reware({}), `function`)
})

test(`should return 404 if not found`, async (t) => {
  t.plan(1)
  const app = makeApp()
  const res = await request(app)
    .get(`/non_existent`)
    .send()
  t.is(res.status, 404)
})

test(`should return 400 if not an image`, async (t) => {
  t.plan(1)
  const app = makeApp({
    exactPathMatch: true,
  })
  const res = await request(app)
    .get(`/get_file_with_full_path`)
    .send()
  t.is(res.status, 400)
})

test(`should return image`, async (t) => {
  t.plan(1)
  const app = makeApp()
  const res = await request(app)
    .get(`/logo`)
    .send()
  t.is(res.status, 200)
})

test(`should convert image from png to jpg`, async (t) => {
  t.plan(2)
  const app = makeApp()
  const res = await request(app)
    .get(`/logo.jpg`)
    .send()
  t.is(res.status, 200)
  t.is(fileType(res.body)!.ext, `jpg`)
})

test(`should convert image from png to webp`, async (t) => {
  t.plan(2)
  const app = makeApp()
  const res = await request(app)
    .get(`/logo.webp`)
    .send()
  t.is(res.status, 200)
  t.is(fileType(res.body)!.ext, `webp`)
})

test(`should resize image to 512 with only width`, async (t) => {
  t.plan(4)
  const app = makeApp()
  const res = await request(app)
    .get(`/logo.png?width=512`)
    .send()
  t.is(res.status, 200)
  t.is(fileType(res.body)!.ext, `png`)
  const png = await new PNG().parse(res.body)
  t.is(png.width, 512)
  t.is(png.height, 512)
})

test(`should resize image to 512 with only height`, async (t) => {
  t.plan(4)
  const app = makeApp()
  const res = await request(app)
    .get(`/logo.png?height=512`)
    .send()
  t.is(res.status, 200)
  t.is(fileType(res.body)!.ext, `png`)
  const png = await new PNG().parse(res.body)
  t.is(png.width, 512)
  t.is(png.height, 512)
})

test(`should set correct content-type header - png`, async (t) => {
  t.plan(1)
  const app = makeApp()
  const res = await request(app)
    .get(`/logo.png`)
    .send()
  t.is(res.header[`content-type`], `image/png`)
})

test(`should set correct content-type header - webp`, async (t) => {
  t.plan(1)
  const app = makeApp()
  const res = await request(app)
    .get(`/logo.webp`)
    .send()
  t.is(res.header[`content-type`], `image/webp`)
})
