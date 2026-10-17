'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import {
  ArrowUp,
  ExternalLink,
  Menu,
  Search,
  X,
  MessageSquare,
} from 'lucide-react';
import { BrandIcon } from './BrandIcon';
import { Brand, repository } from './Brand';
import { pages, docHref } from '@/lib/catalog';
import { SearchDialog } from './SearchDialog';
import { CopyButton } from './CopyButton';
import { usePathname } from 'next/navigation';

export function DocsSidebar({ current }: { current: string }) {
  return (
    <nav aria-label="Documentation pages">
      <Link href="/docs/commands">Command reference</Link>
      {['Start here', 'Guides', 'Reference', 'Contributing'].map((group) => (
        <div key={group}>
          <p>{group}</p>
          {pages
            .filter((page) => page.group === group)
            .map((page) => (
              <Link
                key={page.slug}
                href={docHref(page.slug)}
                aria-current={current === page.slug ? 'page' : undefined}
              >
                {page.title}
              </Link>
            ))}
        </div>
      ))}
      <Link className="docs-home" href="/">
        Back to aptscout
      </Link>
    </nav>
  );
}
export function DocsHeader() {
  const search = useRef<HTMLDialogElement>(null);
  const menu = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    menu.current?.close();
  }, [pathname]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        search.current?.showModal();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);
  return (
    <>
      <Link className="skip" href="#main">
        Skip to content
      </Link>
      <header className="docs-header">
        <button
          className="docs-menu-toggle"
          aria-label="Open documentation navigation"
          onClick={() => menu.current?.showModal()}
        >
          <Menu />
        </button>
        <Brand docs />
        <span className="docs-header-label">Documentation</span>
        <nav aria-label="Documentation">
          <Link href="/docs/commands">Command reference</Link>
          <Link href="/docs/quick-start">Quick start</Link>
          <Link className="icon-link" href={repository}>
            <BrandIcon name="github" size={16} />
            GitHub
          </Link>
        </nav>
        <button
          className="header-search-trigger"
          aria-label="Search documentation"
          onClick={() => search.current?.showModal()}
        >
          <Search size={16} />
          <span>Search docs</span>
          <kbd>⌘ K</kbd>
        </button>
      </header>
      <dialog
        className="docs-drawer"
        ref={menu}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest('a')) menu.current?.close();
        }}
        aria-label="Documentation navigation"
      >
        <div className="mobile-panel-heading">
          <Brand docs />
          <button
            className="close-overlay"
            aria-label="Close navigation"
            onClick={() => menu.current?.close()}
          >
            <X />
          </button>
        </div>
        <div className="docs-sidebar">
          <DocsSidebar current={pathname.replace(/^\/docs\/?/, '')} />
        </div>
      </dialog>
      <SearchDialog dialogRef={search} />
    </>
  );
}
export function DocActions({
  markdown,
  file,
  title,
}: {
  markdown: string;
  file: string;
  title: string;
}) {
  const prompt = encodeURIComponent(
    `Help me use aptscout. Here is the ${title} documentation:\n\n${markdown}`,
  );
  return (
    <div className="doc-actions">
      <Link
        className="icon-link"
        href={`${repository}/edit/master/docs/${file}.md`}
      >
        <BrandIcon name="github" size={17} />
        Edit on GitHub
      </Link>
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}>
        <ArrowUp size={17} />
        Scroll to top
      </button>
      <CopyButton text={markdown} label="Copy as Markdown" />
      <details>
        <summary>
          <MessageSquare size={17} />
          Open in chat
          <span className="action-chevron" aria-hidden="true">
            ⌄
          </span>
        </summary>
        <div className="chat-providers">
          {[
            ['chatgpt', 'ChatGPT', `https://chatgpt.com/?q=${prompt}`],
            ['claude', 'Claude', `https://claude.ai/new?q=${prompt}`],
            ['v0', 'v0', `https://v0.app/?q=${prompt}`],
            ['t3', 'T3 Chat', `https://t3.chat/new?q=${prompt}`],
            ['scira', 'Scira', `https://scira.ai/?q=${prompt}`],
            [
              'cursor',
              'Cursor',
              `https://cursor.com/link/prompt?text=${prompt}`,
            ],
          ].map(([icon, label, href]) => (
            <Link
              className="icon-link"
              key={icon}
              href={href}
              target="_blank"
              rel="noreferrer"
            >
              <BrandIcon name={icon} />
              <span>{label}</span>
              <ExternalLink size={14} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          ))}
        </div>
        <p className="chat-note">
          Opens with this page’s documentation in the prompt.
        </p>
      </details>
    </div>
  );
}
