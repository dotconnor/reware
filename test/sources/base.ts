import test from "ava"
import is from "@sindresorhus/is"
import { BaseSource } from "../../src/sources/base"

test(`Source get() with init`, async (t) => {
  const source = new BaseSource({})
  t.notThrowsAsync(() => source.get(``))
  t.true(is.buffer(await source.get(``)))
})
