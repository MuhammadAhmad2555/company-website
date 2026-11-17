import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'ArcX9 — Software, applications & systems engineering',
  description:
    'ArcX9 Technologies is an SECP-registered software company building applications, websites, and secure systems — including KyberQ, the post-quantum encrypted vault for iOS and Android.',
  metadataBase: new URL('https://arcx9.com'),
  openGraph: {
    title: 'ArcX9 — Software, applications & systems engineering',
    description: 'We design and ship applications, websites, and secure systems. Makers of KyberQ.',
    url: 'https://arcx9.com',
    siteName: 'ArcX9',
    type: 'website',
  },
};

// Enables entrance animations before first paint (skipped for reduced motion).
// Falls back to fully visible content if the motion script never boots.
const motionBoot = `(function(){try{var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion-ready');setTimeout(function(){if(!window.__arcxMotion)d.classList.remove('motion-ready')},6000)}}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
