import { chromium } from '@playwright/test';
import {
  readdir,
  readFile,
  mkdir,
  mkdtemp,
  writeFile,
  rm,
} from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

type Entry = { source: string; image: string };
const root = resolve(import.meta.dir, '..');
const output = join(root, 'website/public/diagrams');
const check = process.argv.includes('--check');
const digest = (value: string) =>
  createHash('sha256').update(value).digest('hex');
const manifestPath = join(output, 'manifest.json');
let previous: Record<string, Entry> = {};
try {
  previous = JSON.parse(await readFile(manifestPath, 'utf8'));
} catch (error) {
  if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
}
const manifest: Record<string, Entry> = {};
const temporary = await mkdtemp(join(tmpdir(), 'aptscout-diagrams-'));
try {
  await mkdir(output, { recursive: true });
  const config = join(temporary, 'puppeteer.json');
  await writeFile(
    config,
    JSON.stringify({
      args: ['--no-sandbox'],
      executablePath:
        process.env.PUPPETEER_EXECUTABLE_PATH || chromium.executablePath(),
    }),
  );
  for (const file of (await readdir(join(root, 'docs'))).sort()) {
    if (!file.endsWith('.md')) continue;
    const markdown = await readFile(join(root, 'docs', file), 'utf8');
    let index = 0;
    for (const match of markdown.matchAll(/^```mermaid\r?\n([\s\S]*?)^```/gm)) {
      const name = `${file.slice(0, -3)}-${index++}.svg`;
      const source = digest(match[1]);
      let saved = '';
      try {
        saved = await readFile(join(output, name), 'utf8');
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
      }
      const current =
        previous[name]?.source === source &&
        previous[name]?.image === digest(saved) &&
        saved.length > 0;
      if (check) {
        if (!current)
          throw new Error(
            `${name} is stale or missing. Run bun run docs and commit the generated diagrams.`,
          );
        manifest[name] = previous[name];
        continue;
      }
      const input = join(temporary, 'diagram.mmd');
      const rendered = join(temporary, 'diagram.svg');
      await writeFile(input, match[1]);
      const result = Bun.spawnSync(
        [
          join(root, 'node_modules/.bin/mmdc'),
          '-i',
          input,
          '-o',
          rendered,
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
        throw new Error(
          `Could not render Mermaid in ${file}; inspect the renderer error above.`,
        );
      if (current) {
        manifest[name] = previous[name];
        continue;
      }
      const image = await readFile(rendered, 'utf8');
      await writeFile(join(output, name), image);
      manifest[name] = { source, image: digest(image) };
    }
  }
  if (check) {
    if (
      Object.keys(previous).sort().join() !==
      Object.keys(manifest).sort().join()
    )
      throw new Error('Diagram manifest is stale. Run bun run docs.');
  } else {
    for (const name of Object.keys(previous)) {
      if (!manifest[name] && /^[\w-]+\.svg$/.test(name))
        await rm(join(output, name), { force: true });
    }
    await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  }
  console.log(
    `${Object.keys(manifest).length} Mermaid diagrams ${check ? 'verified' : 'rendered and validated'}.`,
  );
} finally {
  await rm(temporary, { recursive: true, force: true });
}
