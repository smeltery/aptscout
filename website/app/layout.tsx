import type { Metadata } from 'next';
import '@fontsource-variable/dm-sans';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@/styles/globals.css';
import '@/styles/overlays.css';
import '@/styles/mobile-menu.css';
import '@/styles/shell.css';

const origin =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);
const socialImage = origin
  ? '/og-image.png'
  : 'https://raw.githubusercontent.com/smeltery/aptscout/master/website/public/og-image.png';
export const metadata: Metadata = {
  ...(origin ? { metadataBase: new URL(origin) } : {}),
  title: 'aptscout — Find your place. Keep the full picture.',
  description:
    'Track apartment availability and rent with a local Go CLI, SQLite history, and a built-in browser. Start with Desert Club in Phoenix.',
  openGraph: {
    title: 'aptscout — Find your place.',
    description:
      'Apartment listings change. Keep the full picture, on your device.',
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: 'aptscout apartment availability tracker',
      },
    ],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', images: [socialImage] },
  icons: { icon: '/favicon.svg' },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="top">{children}</body>
    </html>
  );
}
