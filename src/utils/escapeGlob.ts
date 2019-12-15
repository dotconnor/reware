export function escapeGlob(glob: string): string {
  return glob
    .replace(/\\/g, `\\\\`)
    .replace(/\*/g, `\\*`)
    .replace(/\?/g, `\\?`)
    .replace(/\[/g, `\\[`)
    .replace(/\]/g, `\\]`)
    .replace(/\{/g, `\\{`)
    .replace(/\}/g, `\\}`)
    .replace(/\)/g, `\\)`)
    .replace(/\(/g, `\\(`)
    .replace(/!/g, `\\!`);
}
