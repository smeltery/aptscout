'use client';

import Link from 'next/link';

import {
  BookOpen,
  Compass,
  Database,
  Grid2X2,
  Menu,
  Search,
  Terminal,
  X,
} from 'lucide-react';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { BrandIcon } from './BrandIcon';
import { Brand, repository } from './Brand';
import { SearchDialog } from './SearchDialog';

export function MarketingNav() {
  const menu = useRef<HTMLDialogElement>(null);
  const search = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    menu.current?.close();
  }, [pathname]);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        menu.current?.close();
        search.current?.showModal();
      }
    };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, []);
  const openSearch = () => {
    menu.current?.close();
    search.current?.showModal();
  };
  return (
    <>
      <Link className="skip" href="#main">
        Skip to content
      </Link>
      <header className="site-header">
        <div className="wrap header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link href="/" aria-current={pathname === '/' ? 'page' : undefined}>
              Explore aptscout
            </Link>
            <Link href="/docs/quick-start">Getting started</Link>
            <Link href="/docs">Our approach</Link>
          </nav>
          <button
            className="header-search-trigger"
            onClick={openSearch}
            aria-label="Search documentation"
          >
            <Search className="icon" />
            <span>Search</span>
            <kbd>⌘ K</kbd>
          </button>
          <Link className="github-link" href={repository}>
            <BrandIcon name="github" />
            <span>GitHub</span>
          </Link>
          <button
            className="menu-toggle"
            onClick={() => menu.current?.showModal()}
            aria-haspopup="dialog"
          >
            Menu <Menu className="icon" />
          </button>
        </div>
      </header>
      <dialog ref={menu} className="mobile-dialog" aria-label="Main menu">
        <div className="mobile-panel-heading">
          <Brand />
          <button
            className="close-overlay"
            aria-label="Close menu"
            onClick={() => menu.current?.close()}
          >
            <X />
          </button>
        </div>
        <div className="mobile-panel-body">
          <p className="eyebrow">A little clarity goes a long way</p>
          <h2>What’s next?</h2>
          <button className="mobile-search-trigger" onClick={openSearch}>
            <Search className="icon" />
            Search docs & guides<kbd>⌘ K</kbd>
          </button>
          <nav className="mobile-primary" aria-label="Mobile navigation">
            <Link className="mobile-feature-card" href="/docs">
              <span className="nav-card-icon">
                <Grid2X2 />
              </span>
              <span>
                <strong>Explore aptscout</strong>
                <small>A clearer view of your apartment search.</small>
              </span>
            </Link>
            <div className="mobile-resource-grid">
              <Link href="/docs/quick-start">
                <BookOpen />
                <strong>Getting started</strong>
                <small>From install to your first listing.</small>
              </Link>
              <Link href="/docs/data">
                <Compass />
                <strong>Our approach</strong>
                <small>Your search, stored on your device.</small>
              </Link>
            </div>
          </nav>
          <div className="mobile-tasks">
            <div className="mobile-section-label">
              <h3>Browse by task</h3>
              <span>Start with a question</span>
            </div>
            <nav aria-label="Tasks">
              <Link href="/docs/commands">
                <Terminal />
                Use the CLI
              </Link>
              <Link href="/docs/web-ui">
                <Grid2X2 />
                Browse apartments
              </Link>
              <Link href="/docs/data">
                <Database />
                Understand your data
              </Link>
              <Link href="/docs/providers">
                <Compass />
                Explore providers
              </Link>
            </nav>
          </div>
          <div className="mobile-starter">
            <p className="eyebrow">Not sure where to begin?</p>
            <h3>Your next place starts here.</h3>
            <p>Collect listings, set your budget, and see what fits.</p>
            <Link href="/docs/quick-start">Start your first search</Link>
          </div>
        </div>
        <div className="mobile-panel-footer">
          <Link className="icon-link" href={repository}>
            <BrandIcon name="github" />
            GitHub
          </Link>
          <Link href={`${repository}/issues`}>Feedback & issues</Link>
        </div>
      </dialog>
      <SearchDialog dialogRef={search} />
    </>
  );
}

export function MarketingFooter() {
  const groups = [
    [
      'The project',
      [
        ['Overview', '/docs'],
        ['Commands', '/docs/commands'],
        ['Properties', '/docs/providers'],
      ],
    ],
    [
      'Resources',
      [
        ['Brand & assets', '/brand'],
        ['Getting started', '/docs/quick-start'],
        ['Data and history', '/docs/data'],
        ['Troubleshooting', '/docs/troubleshooting'],
        ['Contributing', '/docs/development'],
      ],
    ],
    [
      'In the open',
      [
        ['About Smeltery', 'https://github.com/smeltery'],
        ['GitHub repository', repository],
        ['Feedback & issues', `${repository}/issues`],
        ['Releases', `${repository}/releases`],
        ['License', `${repository}/blob/master/LICENSE`],
      ],
    ],
  ] as const;
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand />
            <p>
              A little clarity.
              <br />A better place to call home.
            </p>
            <span>Local tools for a more thoughtful apartment search.</span>
          </div>
          {groups.map(([title, links]) => (
            <nav key={title} aria-label={title}>
              <h2>{title}</h2>
              {links.map(([label, href]) => (
                <Link key={label} href={href}>
                  {label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Smeltery Labs</span>
          <Link href={`${repository}/blob/master/LICENSE`}>
            PolyForm Shield license
          </Link>
          <span className="footer-note">Built for the way you search.</span>
          <Link href="#top">Back to top ↑</Link>
        </div>
      </div>
    </footer>
  );
}
