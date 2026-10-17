import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { pages, docHref } from '../../website/src/lib/catalog';

test('install journey, docs links, and accessible pages', async ({ page }) => {
  await page.goto('/');
  await page
    .getByRole('link', { name: 'Start your search', exact: true })
    .click();
  await expect(
    page.getByRole('heading', { name: 'Quick start', exact: true }),
  ).toBeVisible();
  for (const path of [
    '/',
    '/brand',
    ...pages.map((item) => docHref(item.slug)),
  ]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    const links = await page
      .locator('main a[href^="/"]')
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute('href')!),
      );
    for (const href of [...new Set(links)])
      expect((await page.request.get(href)).status(), href).toBe(200);
    for (const image of await page.locator('main img').all()) {
      const source = await image.getAttribute('src');
      expect(source).toBeTruthy();
      expect((await page.request.get(source!)).status(), source!).toBe(200);
      if (!(await image.isVisible())) continue;
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(
          () =>
            image.evaluate(
              (element: HTMLImageElement) =>
                element.complete && element.naturalWidth > 0,
            ),
          { message: (await image.getAttribute('src')) || path },
        )
        .toBe(true);
    }
  }
  expect((await page.goto('/does-not-exist'))?.status()).toBe(404);
});

test('search handles matching, no matches, and keyboard dismissal', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Search documentation' }).click();
  const input = page.getByRole('searchbox');
  await expect(input).toBeFocused();
  await input.fill('backup');
  await expect(
    page.getByRole('link', { name: /Data and history SQLite/ }),
  ).toBeVisible();
  await input.fill('no-such-guide-xyz');
  await expect(page.getByText('No matches this time.')).toBeVisible();
  await page.getByRole('button', { name: 'Reset search' }).click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Search documentation' }),
  ).toBeFocused();
});

for (const width of [320, 390, 768, 1440]) {
  test(`responsive layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    for (const path of ['/', '/docs', '/docs/commands', '/brand']) {
      await page.goto(path);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        path,
      ).toBe(true);
    }
    if (width < 700) {
      await page.goto('/');
      await page.getByRole('button', { name: 'Menu', exact: true }).click();
      await expect(
        page.getByRole('dialog', { name: 'Main menu' }),
      ).toBeVisible();
      await page
        .getByRole('link', { name: /Getting started From install/ })
        .click();
      await expect(
        page.getByRole('heading', { name: 'Quick start', exact: true }),
      ).toBeVisible();
      await page
        .getByRole('button', { name: 'Open documentation navigation' })
        .click();
      await page
        .getByRole('dialog')
        .getByRole('link', { name: 'Data and history', exact: true })
        .click();
      await expect(
        page.getByRole('heading', { name: 'Data and history', exact: true }),
      ).toBeVisible();
    }
  });
}

test('documentation copy and diagram controls work', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/docs/quick-start');
  const code = page.locator('.docs-code').first();
  await code.getByRole('button', { name: 'Copy', exact: true }).click();
  await expect(code.getByRole('button', { name: 'Copied' })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    'go install',
  );
  await page.goto('/docs');
  await page
    .locator('.docs-toc')
    .locator('summary')
    .filter({ hasText: 'Open in chat' })
    .click();
  await expect(page.locator('.docs-toc .chat-providers a')).toHaveCount(6);
  await expect(
    page
      .locator('.docs-toc .chat-providers')
      .getByRole('link', { name: 'ChatGPT' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Expand diagram' }).click();
  await expect(
    page.getByRole('dialog', { name: 'Workflow diagram' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Zoom in' }).click();
  await expect(page.getByRole('status')).toHaveText('125%');
  await page.keyboard.press('Escape');
  await expect(
    page.getByRole('button', { name: 'Expand diagram' }),
  ).toBeFocused();
});

for (const width of [390, 1440]) {
  test(`main navigation reaches distinct destinations at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 844 });
    for (const [label, destination, target] of [
      ['Explore aptscout', '/#features', '#features'],
      ['Getting started', '/docs/quick-start', 'h1'],
      ['Our approach', '/#how-it-works', '#how-it-works'],
    ]) {
      await page.goto('/brand');
      if (width < 700)
        await page.getByRole('button', { name: 'Menu', exact: true }).click();
      const navigation = page.getByRole('navigation', {
        name: width < 700 ? 'Mobile navigation' : 'Main navigation',
        exact: true,
      });
      await navigation.getByRole('link', { name: new RegExp(label) }).click();
      await expect(page).toHaveURL(destination);
      await expect(page.locator(target)).toBeInViewport();
      await expect(
        page.getByRole('dialog', { name: 'Main menu' }),
      ).not.toBeVisible();
    }
  });
}
