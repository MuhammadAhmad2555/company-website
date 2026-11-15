import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Arcx9 — Technology that moves business forward',
  description: 'Arcx9 is an independent technology partner helping ambitious teams design, build, and secure the systems behind their next stage of growth.',
  metadataBase: new URL('https://arcx9.com'),
  openGraph: {
    title: 'Arcx9 — Technology that moves business forward',
    description: 'Strategy, engineering, and design for what’s next.',
    url: 'https://arcx9.com',
    siteName: 'Arcx9',
    type: 'website',
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
