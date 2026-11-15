import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Company — Ideas into impact', description: 'A company website starter for a team building thoughtful digital experiences.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
