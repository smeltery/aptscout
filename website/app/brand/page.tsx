import Link from 'next/link';
import { MarketingNav, MarketingFooter } from '@/components/MarketingLayout';
import Image from 'next/image';
import '@/styles/home.css';
import '@/styles/home-details.css';
export const metadata = { title: 'Brand & assets — aptscout' };
export default function BrandPage() {
  return (
    <>
      <MarketingNav />
      <main id="main" className="brand-page wrap">
        <p className="eyebrow">Made for a clearer search</p>
        <h1>Brand & assets</h1>
        <p>
          The aptscout mark pairs a stepped apartment facade with an open
          doorway. Its terracotta palette nods to the project’s first home in
          Phoenix. Download assets for linking to the project.
        </p>
        <div className="brand-assets">
          <Link href="/logo.svg" download>
            <Image
              src="/logo.svg"
              alt="aptscout apartment mark"
              width={96}
              height={96}
            />
            <p>Download SVG logo</p>
          </Link>
          <Link href="/og-image.png" download>
            <Image
              src="/og-image.png"
              alt="aptscout social preview"
              width={600}
              height={315}
            />
            <p>Download social image · 1200 × 630</p>
          </Link>
        </div>
      </main>
      <MarketingFooter />
    </>
  );
}
