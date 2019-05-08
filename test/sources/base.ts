import test from "ava"
import is from "@sindresorhus/is"
import { BaseSource } from "../../src/sources/base"

test(`Source should Error is not initialized.`, (t) => {
  const source = new BaseSource()
  t.throws(() => source.get(`test`))
})

test(`Source get() with init`, (t) => {
  const source = new BaseSource()
  source._init({})
  t.notThrows(() => source.get(`test`))
  t.true(is.buffer(source.get(`test`)))
})
