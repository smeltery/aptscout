import { readFileSync, existsSync } from 'node:fs';
import { dirname, extname } from 'node:path';

const budgets = JSON.parse(
  readFileSync(new URL('./budgets.json', import.meta.url), 'utf8'),
);
const result = Bun.spawnSync([
  'git',
  'ls-files',
  '--cached',
  '--others',
  '--exclude-standard',
  '-z',
]);
if (result.exitCode) throw new Error('Unable to enumerate repository files');
const files = [
  ...new Set(result.stdout.toString().split('\0').filter(Boolean)),
].filter(
  (file) =>
    existsSync(file) &&
    !/(^|\/)(node_modules|\.next|dist|\.flox|\.website-studio)\//.test(file) &&
    !/lock|next-env\.d\.ts/.test(file),
);
const source = files.filter((file) =>
  ['.go', '.ts', '.tsx', '.js', '.css', '.md', '.yml', '.yaml', '.sh'].includes(
    extname(file),
  ),
);
const errors: string[] = [];
const directories = new Map<string, number>();
for (const file of source) {
  const content = readFileSync(file, 'utf8');
  const lines = content.split('\n').length - Number(content.endsWith('\n'));
  const limit = budgets.files[file]?.limit ?? budgets.default_lines;
  if (lines > limit) errors.push(`${file}: ${lines} lines > budget ${limit}`);
  const directory = dirname(file);
  directories.set(directory, (directories.get(directory) ?? 0) + 1);
  if (file === 'README.md' || file.startsWith('docs/')) {
    for (const match of content.matchAll(/\]\(([^)]+)\)/g)) {
      const link = match[1].split('#')[0];
      if (!link || /^(?:https?:|mailto:)/.test(link)) continue;
      if (!existsSync(`${dirname(file)}/${link}`))
        errors.push(`${file}: broken link ${link}`);
    }
  }
}
for (const [directory, count] of directories) {
  if (count > budgets.default_files)
    errors.push(
      `${directory}: ${count} source files > budget ${budgets.default_files}`,
    );
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(
  `LOC, directory budgets, and Markdown links passed (${source.length} files).`,
);
