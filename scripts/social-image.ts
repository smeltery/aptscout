import { chromium } from '@playwright/test';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const publicDir = resolve(import.meta.dir, '../website/public');
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(
    `<style>body{margin:0}</style>${await readFile(`${publicDir}/og-image.svg`, 'utf8')}`,
  );
  await writeFile(`${publicDir}/og-image.png`, await page.screenshot());
} finally {
  await browser.close();
}
