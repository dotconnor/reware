import test from "ava"

import reware from "../src/reware"

test(`reware() should return a function`, (t) => {
  t.is(typeof reware(), `function`)
})

test(`reware() should accept a options param`, (t) => {
  t.is(typeof reware({}), `function`)
})
