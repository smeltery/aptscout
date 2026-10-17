import Link from 'next/link';
import {
  ArrowRight,
  Database,
  History,
  SlidersHorizontal,
  Terminal,
} from 'lucide-react';
import { MarketingNav, MarketingFooter } from '@/components/MarketingLayout';
import { CopyButton } from '@/components/CopyButton';
import '@/styles/home.css';
import '@/styles/home-details.css';

export default function Page() {
  return (
    <>
      <MarketingNav />
      <main id="main">
        <section className="hero wrap">
          <div>
            <p className="eyebrow">A little tool for your next big move</p>
            <h1>
              Find your place.
              <br />
              <em>Keep the full picture.</em>
            </h1>
            <p className="hero-description">
              Apartment listings change. Your search shouldn’t start over.
              <br className="desktop-break" /> Track availability and rent, with
              a history that stays with you.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/docs/quick-start">
                Start your search <ArrowRight size={17} />
              </Link>
              <Link className="text-link" href="/docs">
                How it works
              </Link>
            </div>
            <div className="hero-notes">
              <span>Local-first</span>
              <span>Go + SQLite</span>
              <span>No account needed</span>
            </div>
          </div>
          <div
            className="listing-preview"
            aria-label="Illustrative apartment listing preview"
          >
            <div className="preview-top">
              <span className="status-dot" />
              Your search, in focus
              <span className="sample-label">SAMPLE DATA</span>
            </div>
            <div className="preview-heading">
              <div>
                <p className="eyebrow">
                  <span aria-hidden="true">🌵</span> Phoenix, Arizona
                </p>
                <h2>Desert Club</h2>
              </div>
              <span className="listing-icon">
                <SlidersHorizontal size={20} />
              </span>
            </div>
            <div className="preview-filters">
              <span>2 bedrooms</span>
              <span>Under $2,500</span>
              <span>Price: low to high</span>
            </div>
            {[
              ['2146', 'B1 · 2 beds · 2 baths', '$2,145', 'Down $80'],
              ['2078', 'B2 · 2 beds · 2 baths', '$2,290', 'New listing'],
              ['3124', 'B1 · 2 beds · 2 baths', '$2,375', 'Unchanged'],
            ].map(([unit, plan, price, state]) => (
              <div className="preview-unit" key={unit}>
                <div className="unit-mark">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div>
                  <strong>Unit {unit}</strong>
                  <small>{plan}</small>
                </div>
                <div className="unit-price">
                  <strong>
                    {price}
                    <small> / mo</small>
                  </strong>
                  <span>{state}</span>
                </div>
              </div>
            ))}
            <div className="preview-bottom">
              <History size={15} />
              <span>A snapshot today. Context for tomorrow.</span>
            </div>
          </div>
        </section>
        <div className="proof-strip wrap">
          <p>
            Less tab switching.
            <br />
            <strong>More perspective.</strong>
          </p>
          <span>
            <Terminal />
            Collect with a command
          </span>
          <span>
            <SlidersHorizontal />
            Find what fits
          </span>
          <span>
            <History />
            See what changed
          </span>
        </div>
        <section className="section wrap" id="features">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The details that make a decision</p>
              <h2>Go beyond the listing.</h2>
            </div>
            <p>
              One local record of your search.
              <br />
              From first look to the right fit.
            </p>
          </div>
          <div className="feature-grid">
            {[
              [
                Database,
                'Your data. Your device.',
                'Save floor plans, units, and scrape history in SQLite. Browse collected results without another account.',
              ],
              [
                History,
                'Remember yesterday’s rent.',
                'See the prices you captured over time, and spot changes without keeping your own spreadsheet.',
              ],
              [
                SlidersHorizontal,
                'A shortlist on your terms.',
                'Filter by bedrooms, budget, dates, and floor plan. Use the terminal or the built-in local browser.',
              ],
            ].map(([Icon, title, body]) => {
              const FeatureIcon = Icon as typeof Database;
              return (
                <article key={String(title)}>
                  <FeatureIcon size={26} />
                  <h3>{String(title)}</h3>
                  <p>{String(body)}</p>
                </article>
              );
            })}
          </div>
        </section>
        <section className="workflow-section" id="how-it-works">
          <div className="wrap workflow">
            <div>
              <p className="eyebrow">A small, repeatable ritual</p>
              <h2>
                Scrape. Compare.
                <br />
                <em>Come back informed.</em>
              </h2>
              <p>
                Start with Desert Club in Phoenix, the included property
                provider. Scrape again when you want a fresh view. Your previous
                observations stay useful.
              </p>
              <Link className="text-link" href="/docs/providers">
                See supported properties
              </Link>
            </div>
            <ol>
              <li>
                <span>01</span>
                <div>
                  <h3>Collect a fresh snapshot</h3>
                  <p>
                    A property-specific parser turns listings into structured
                    data.
                  </p>
                  <code>aptscout scrape</code>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Make it your search</h3>
                  <p>Set the bedrooms and budget that work for you.</p>
                  <code>aptscout list --beds 2 --max-price 2500</code>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Look a little closer</h3>
                  <p>
                    Open the local browser to explore units and price history.
                  </p>
                  <code>aptscout serve --open</code>
                </div>
              </li>
            </ol>
          </div>
        </section>
        <section className="section wrap start-section" id="quick-start">
          <div>
            <p className="eyebrow">Your next place starts here</p>
            <h2>
              A clearer search.
              <br />
              <em>One command away.</em>
            </h2>
            <p>Install with Go, or download a binary for macOS or Linux.</p>
            <Link className="text-link" href="/docs/quick-start">
              Read the installation guide
            </Link>
          </div>
          <div className="install-card">
            <div className="code-heading">
              <span>TERMINAL · GO 1.26.1+</span>
              <CopyButton text="go install github.com/smeltery/aptscout@latest" />
            </div>
            <pre>
              <code>go install github.com/smeltery/aptscout@latest</code>
            </pre>
            <p>One executable. An embedded browser UI. Your data, locally.</p>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </>
  );
}
