import fs from 'node:fs';
import path from 'node:path';
import { marked, Renderer } from 'marked';
import { pages } from './catalog';

export const headingId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export function readDoc(slug: string) {
  const page = pages.find((item) => item.slug === slug);
  if (!page) return undefined;
  const markdown = fs.readFileSync(
    path.join(process.cwd(), '../docs', `${page.file}.md`),
    'utf8',
  );
  const headings: { id: string; text: string }[] = [];
  let diagram = 0;
  const renderer = new Renderer();
  renderer.heading = function ({ depth, text, tokens }) {
    if (depth === 1) return '';
    const id = headingId(text);
    if (depth === 2) headings.push({ id, text });
    return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>`;
  };
  renderer.link = function ({ href, tokens }) {
    const target = href.replace(/^(?:\.\/)?([\w-]+)\.md(?=#|$)/, (_, file) =>
      file === 'README' ? '/docs' : `/docs/${file}`,
    );
    return `<a href="${target}">${this.parser.parseInline(tokens)}</a>`;
  };
  const defaultCode = renderer.code.bind(renderer);
  renderer.code = (token) =>
    token.lang === 'mermaid'
      ? `<figure class="diagram"><button class="diagram-expand" data-diagram="/diagrams/${page.file}-${diagram}.svg">Expand diagram</button><img src="/diagrams/${page.file}-${diagram++}.svg" alt="${page.title}: workflow diagram" /><details><summary>Diagram source</summary><pre>${token.text.replaceAll('&', '&amp;').replaceAll('<', '&lt;')}</pre></details></figure>`
      : `<div class="docs-code"><div class="docs-code-heading"><span>Code</span><button data-copy aria-live="polite">Copy</button></div>${defaultCode(token)}</div>`;
  const html = marked.parse(markdown, { renderer, async: false }) as string;
  return { ...page, markdown, headings, html };
}
