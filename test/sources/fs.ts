import test from "ava";
import { join } from "path";
import is from "@sindresorhus/is";
import { FileSystemSource } from "../../src/sources/fs";
import { FileNotFoundError } from "../../src/sources/base";

const createSource = (options?: any) => {
  return new FileSystemSource({
    basePath: join(__dirname, `..`, `fixtures`),
    ...options,
  });
};

test(`Source get() with full path`, async (t) => {
  const source = createSource();
  const file = await source.get(`get_file_with_full_path`);
  t.true(is.buffer(file));
  t.is(file.toString(), `get_file_with_path`);
});

test(`Source get() with non existent file`, async (t) => {
  const source = createSource();
  await t.throwsAsync(
    source.get(`this_file_does_not_exist`),
    FileNotFoundError
  );
});

test(`Source get() with glob`, async (t) => {
  const source = createSource();
  const file = await source.get(`get_file_without_extension`);
  t.true(is.buffer(file));
  t.is(file.toString(), `this is really a text file`);
});
