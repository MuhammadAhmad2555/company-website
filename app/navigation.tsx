'use client';

import { useState } from 'react';

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav wrap">
      <a className="brand" href="#home" aria-label="Company home" onClick={() => setOpen(false)}>
        <span className="mark">c</span>company<span className="dot">.</span>
      </a>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>
        {open ? 'Close ×' : 'Menu +'}
      </button>
      <nav id="main-navigation" aria-label="Main navigation" className={open ? 'is-open' : ''} onKeyDown={(event) => { if (event.key === 'Escape') { setOpen(false); document.querySelector<HTMLButtonElement>('.menu-toggle')?.focus(); } }}>
        <a href="#services" onClick={() => setOpen(false)}>What we do</a>
        <a href="#approach" onClick={() => setOpen(false)}>Our approach</a>
        <a className="button small" href="#contact" onClick={() => setOpen(false)}>Let’s talk <span>↗</span></a>
      </nav>
    </header>
  );
}
