import test from "ava"
import is from "@sindresorhus/is"
import { S3Source } from "../../src/sources/s3"

const testFunction = () => {
  return typeof process.env.CI === `undefined` ? test : test.skip
}

testFunction()(`Source get() with test`, async (t) => {
  const source = new S3Source({ bucket: `reware-tests` })
  const file = await source.get(`logo`)
  t.true(is.buffer(file))
})
