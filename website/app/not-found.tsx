import Link from 'next/link';
import { MarketingNav, MarketingFooter } from '@/components/MarketingLayout';
import '@/styles/home.css';
import '@/styles/home-details.css';
export default function NotFound() {
  return (
    <>
      <MarketingNav />
      <main id="main" className="brand-page wrap">
        <p className="eyebrow">404 · Page not found</p>
        <h1>Let’s find your way back.</h1>
        <p>This page isn’t here. The documentation is a good place to start.</p>
        <Link className="button" href="/docs">
          Open documentation
        </Link>
      </main>
      <MarketingFooter />
    </>
  );
}
