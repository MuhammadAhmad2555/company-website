'use client';

import { useState } from 'react';
import BrandMark from './brand';

export default function Navigation() {
  const [open, setOpen] = useState(false);
  return <header className="site-header" id="top"><div className="shell nav">
    <a className="brand" href="#top" aria-label="ArcX9 home" onClick={() => setOpen(false)}><BrandMark /><span>ArcX<span className="brand-nine">9</span></span></a>
    <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? 'Close ×' : 'Menu +'}</button>
    <nav id="main-navigation" aria-label="Main navigation" className={open ? 'is-open' : ''} onKeyDown={(event) => { if (event.key === 'Escape') { setOpen(false); document.querySelector<HTMLButtonElement>('.menu-toggle')?.focus(); } }}>
      <a href="#about" onClick={() => setOpen(false)}>About</a><a href="#services" onClick={() => setOpen(false)}>Services</a><a href="#approach" onClick={() => setOpen(false)}>Our approach</a><a className="nav-cta" href="#contact" data-magnetic onClick={() => setOpen(false)}>Let’s talk <span>↗</span></a>
    </nav>
  </div></header>;
}
