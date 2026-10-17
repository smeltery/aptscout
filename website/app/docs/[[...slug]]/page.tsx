import { DocArticle } from '@/components/DocArticle';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { readDoc } from '@/lib/docs';
import { pages, docHref } from '@/lib/catalog';
import { DocsHeader, DocsSidebar, DocActions } from '@/components/DocsLayout';
import '@/styles/docs.css';
import '@/styles/docs-content.css';
import '@/styles/doc-actions.css';

type Props = { params: Promise<{ slug?: string[] }> };
export function generateStaticParams() {
  return pages.map((page) => ({ slug: page.slug ? [page.slug] : [] }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doc = readDoc((await params).slug?.join('/') || '');
  return {
    title: doc ? `${doc.title} — aptscout docs` : 'Page not found',
    description: doc?.description,
  };
}
export default async function DocsPage({ params }: Props) {
  const doc = readDoc((await params).slug?.join('/') || '');
  if (!doc) notFound();
  const index = pages.findIndex((page) => page.slug === doc.slug);
  return (
    <>
      <DocsHeader />
      <div className="docs-layout">
        <aside className="docs-sidebar" aria-label="Documentation navigation">
          <DocsSidebar current={doc.slug} />
        </aside>
        <main id="main" className="docs-main">
          <p className="docs-breadcrumb">{doc.group}</p>
          <h1>{doc.title}</h1>
          <p className="docs-lead">{doc.description}</p>
          <details className="mobile-toc">
            <summary>On this page</summary>
            {doc.headings.map((heading) => (
              <Link key={heading.id} href={`#${heading.id}`}>
                {heading.text}
              </Link>
            ))}
          </details>
          <DocArticle html={doc.html} />
          <nav className="docs-pagination" aria-label="Adjacent pages">
            {index > 0 && (
              <Link href={docHref(pages[index - 1].slug)}>
                Previous<span>{pages[index - 1].title}</span>
              </Link>
            )}
            {index < pages.length - 1 && (
              <Link href={docHref(pages[index + 1].slug)}>
                Next<span>{pages[index + 1].title}</span>
              </Link>
            )}
          </nav>
          <div className="docs-mobile-actions">
            <DocActions
              markdown={doc.markdown}
              file={doc.file}
              title={doc.title}
            />
          </div>
          <footer className="docs-bottom">
            aptscout · Local tools for a more thoughtful search.
          </footer>
        </main>
        <aside className="docs-toc" aria-label="Page tools">
          <p>On this page</p>
          <nav aria-label="On this page">
            {doc.headings.map((heading) => (
              <Link key={heading.id} href={`#${heading.id}`}>
                {heading.text}
              </Link>
            ))}
          </nav>
          <DocActions
            markdown={doc.markdown}
            file={doc.file}
            title={doc.title}
          />
        </aside>
      </div>
    </>
  );
}
