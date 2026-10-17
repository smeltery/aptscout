'use client';

import { Search, X, BookOpen } from 'lucide-react';
import { useState, useEffect, type RefObject } from 'react';
import { usePathname } from 'next/navigation';
import { pages, docHref } from '@/lib/catalog';

export function SearchDialog({
  dialogRef,
}: {
  dialogRef: RefObject<HTMLDialogElement | null>;
}) {
  const pathname = usePathname();
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname, dialogRef]);
  const [query, setQuery] = useState('');
  const results = pages.filter((page) =>
    `${page.title} ${page.description}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  return (
    <dialog
      ref={dialogRef}
      className="search-dialog"
      aria-labelledby="search-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
    >
      <div className="overlay-heading">
        <div>
          <p className="eyebrow">The aptscout documentation</p>
          <h2 id="search-title">Find your next step.</h2>
        </div>
        <button
          className="close-overlay"
          aria-label="Close search"
          onClick={() => dialogRef.current?.close()}
        >
          <X />
        </button>
      </div>
      <div className="panel-search">
        <Search className="icon" />
        <input
          autoFocus
          type="search"
          aria-label="Search docs and guides"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search docs and guides"
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              dialogRef.current
                ?.querySelector<HTMLAnchorElement>('.search-result')
                ?.focus();
            }
          }}
        />
      </div>
      <div className="search-results-scroll">
        <p className="search-section-title" role="status">
          {results.length} guides
        </p>
        {results.map((page) => (
          <a
            className="search-result"
            key={page.slug}
            href={docHref(page.slug)}
          >
            <span className="result-icon">
              <BookOpen className="icon" />
            </span>
            <span className="result-copy">
              <strong>{page.title}</strong>
              <small>{page.description}</small>
            </span>
            <span className="result-kind">Guide</span>
          </a>
        ))}
        {!results.length && (
          <div className="search-no-results">
            <h3>No matches this time.</h3>
            <p>Try “install”, “price”, or “database”.</p>
            <button onClick={() => setQuery('')}>Reset search</button>
          </div>
        )}
      </div>
      <div className="search-panel-footer">
        <span>Tab to explore · Enter to open</span>
        <span>esc Close</span>
      </div>
    </dialog>
  );
}
