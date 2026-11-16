'use client';

import { useEffect, useRef, useState } from 'react';
import { Wordmark } from './brand';

const links = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Capabilities' },
  { href: '#approach', label: 'Approach' },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const close = () => setOpen(false);

  // Scroll-spy: highlight the link whose section crosses the middle of the viewport.
  useEffect(() => {
    const watched = [document.querySelector('.hero'), ...links.map((l) => document.querySelector(l.href))].filter(Boolean) as Element[];
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(entry.target.id ? `#${entry.target.id}` : null);
      }
    }, { rootMargin: '-45% 0px -50% 0px' });
    watched.forEach((el) => io.observe(el));
    const onResize = () => { if (innerWidth > 860) setOpen(false); };
    addEventListener('resize', onResize);
    return () => { io.disconnect(); removeEventListener('resize', onResize); };
  }, []);

  // Sliding pill follows hover, falling back to the active section.
  const target = hovered ?? active;
  useEffect(() => {
    const wrap = linksRef.current;
    const pill = indicatorRef.current;
    if (!wrap || !pill) return;
    const el = target ? wrap.querySelector<HTMLElement>(`a[href="${target}"]`) : null;
    if (!el) { pill.style.opacity = '0'; return; }
    pill.style.opacity = '1';
    pill.style.width = `${el.offsetWidth}px`;
    pill.style.transform = `translateX(${el.offsetLeft}px)`;
  }, [target]);

  return <header className={`topbar${open ? ' is-open' : ''}`} id="top">
    <div className="shell topbar-inner">
      <a className="brand" href="#top" aria-label="ArcX9 home" onClick={close}><Wordmark /></a>
      <nav id="main-navigation" className="topbar-nav" aria-label="Main navigation" onKeyDown={(event) => { if (event.key === 'Escape') { close(); document.querySelector<HTMLButtonElement>('.topbar-toggle')?.focus(); } }}>
        <div className="topbar-links" ref={linksRef} onMouseLeave={() => setHovered(null)}>
          <span className="topbar-indicator" ref={indicatorRef} aria-hidden="true" />
          {links.map((link) => <a key={link.href} href={link.href} className={active === link.href ? 'is-active' : undefined} aria-current={active === link.href ? 'location' : undefined} onMouseEnter={() => setHovered(link.href)} onFocus={() => setHovered(link.href)} onBlur={() => setHovered(null)} onClick={close}>{link.label}</a>)}
        </div>
      </nav>
      <button className="topbar-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}><span /><span /></button>
    </div>
  </header>;
}
