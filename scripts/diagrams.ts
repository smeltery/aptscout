import { chromium } from '@playwright/test';
import {
  readdir,
  readFile,
  mkdir,
  mkdtemp,
  writeFile,
  rm,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dir, '..');
const output = join(root, 'website/public/diagrams');
await mkdir(output, { recursive: true });
const temporary = await mkdtemp(join(tmpdir(), 'aptscout-diagrams-'));
try {
  const config = join(temporary, 'puppeteer.json');
  await writeFile(
    config,
    JSON.stringify({
      args: ['--no-sandbox'],
      executablePath:
        process.env.PUPPETEER_EXECUTABLE_PATH || chromium.executablePath(),
    }),
  );
  for (const file of await readdir(join(root, 'docs'))) {
    if (!file.endsWith('.md')) continue;
    const markdown = await readFile(join(root, 'docs', file), 'utf8');
    let index = 0;
    for (const match of markdown.matchAll(/^```mermaid\r?\n([\s\S]*?)^```/gm)) {
      const input = join(temporary, 'diagram.mmd');
      await writeFile(input, match[1]);
      const result = Bun.spawnSync(
        [
          join(root, 'node_modules/.bin/mmdc'),
          '-i',
          input,
          '-o',
          join(output, `${file.slice(0, -3)}-${index++}.svg`),
          '-b',
          'transparent',
          '-t',
          'neutral',
          '-p',
          config,
        ],
        { stdout: 'inherit', stderr: 'inherit' },
      );
      if (result.exitCode)
        throw new Error(`Invalid Mermaid diagram in ${file}`);
    }
  }
} finally {
  await rm(temporary, { recursive: true, force: true });
}
