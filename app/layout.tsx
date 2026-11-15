import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'ArcX9 — Technology that moves business forward',
  description: 'ArcX9 is an independent technology partner helping ambitious teams design, build, and secure the systems behind their next stage of growth.',
  metadataBase: new URL('https://arcx9.com'),
  openGraph: {
    title: 'ArcX9 — Technology that moves business forward',
    description: 'Strategy, engineering, and design for what’s next.',
    url: 'https://arcx9.com',
    siteName: 'ArcX9',
    type: 'website',
  },
};

// Enables entrance animations before first paint (skipped for reduced motion).
// Falls back to fully visible content if the motion script never boots.
const motionBoot = `(function(){try{var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion-ready');setTimeout(function(){if(!window.__arcxMotion)d.classList.remove('motion-ready')},6000)}}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: motionBoot }} /></head><body>{children}</body></html>;
}
