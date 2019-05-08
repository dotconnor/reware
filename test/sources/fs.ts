import test from "ava"
import { join } from "path"
import is from "@sindresorhus/is"
import { FileSystemSource, FileNotFoundError } from "../../src/sources/fs"
import { DEFAULT_OPTIONS } from "../../src/reware"

test(`Source should Error is not initialized.`, async (t) => {
  const source = new FileSystemSource({
    basePath: join(__dirname, `fixtures`),
  })
  await t.throwsAsync(() => source.get(`test`))
})

test(`Source get() with full path`, async (t) => {
  const source = new FileSystemSource({
    basePath: join(__dirname, `fixtures`),
  })
  source._init({ ...DEFAULT_OPTIONS, exactPathMatch: true })
  const file = await source.get(`get_file_with_full_path`)
  t.true(is.buffer(file))
  t.is(file.toString(), `get_file_with_path`)
})

test(`Source get() with non existent file`, async (t) => {
  const source = new FileSystemSource({
    basePath: join(__dirname, `fixtures`),
  })
  source._init({ ...DEFAULT_OPTIONS, exactPathMatch: true })
  await t.throwsAsync(source.get(`this_file_does_not_exist`), FileNotFoundError)
})

test(`Source get() with non existent file and glob`, async (t) => {
  const source = new FileSystemSource({
    basePath: join(__dirname, `fixtures`),
  })
  source._init({ ...DEFAULT_OPTIONS, exactPathMatch: false })
  await t.throwsAsync(source.get(`this_file_does_not_exist`), FileNotFoundError)
})

test(`Source get() with glob`, async (t) => {
  const source = new FileSystemSource({
    basePath: join(__dirname, `fixtures`),
  })
  source._init({ ...DEFAULT_OPTIONS, exactPathMatch: false })
  await t.throwsAsync(
    source.get(`get_file_without_extension`),
    FileNotFoundError
  )
})
