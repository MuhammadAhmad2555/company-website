'use client';

import { useEffect } from 'react';

declare global {
  interface Window { __arcxMotion?: boolean }
}

/**
 * Client-side motion layer: scroll reveals, counters, scroll progress,
 * pointer-driven parallax/spotlights and magnetic buttons.
 * `motion-ready` is set on <html> by an inline script in the layout (skipped
 * when the user prefers reduced motion), so hidden "before" states never apply
 * without animation support.
 */
export default function Motion() {
  useEffect(() => {
    window.__arcxMotion = true;
    const root = document.documentElement;
    const animated = root.classList.contains('motion-ready');
    const finePointer = matchMedia('(pointer: fine) and (min-width: 961px)').matches;
    const off: Array<() => void> = [];
    const listen = (target: EventTarget, type: string, fn: EventListener, opts?: AddEventListenerOptions) => {
      target.addEventListener(type, fn, opts);
      off.push(() => target.removeEventListener(type, fn, opts));
    };

    /** Coalesces pointer events into at most one update per animation frame. */
    const onPointerFrame = (el: HTMLElement, fn: (ev: PointerEvent) => void, leave: () => void) => {
      let last: PointerEvent | null = null;
      let raf = 0;
      listen(el, 'pointermove', (e) => {
        last = e as PointerEvent;
        if (!raf) raf = requestAnimationFrame(() => { raf = 0; if (last) fn(last); });
      }, { passive: true });
      listen(el, 'pointerleave', () => { cancelAnimationFrame(raf); raf = 0; last = null; leave(); });
      off.push(() => cancelAnimationFrame(raf));
    };

    // Scroll progress + compact header (writes only to the bar's transform,
    // never to a root CSS variable, so scrolling doesn't restyle the page)
    const bar = document.querySelector<HTMLElement>('.scroll-progress');
    let frame = 0;
    let scrolled: boolean | null = null;
    const update = () => {
      frame = 0;
      const max = root.scrollHeight - innerHeight;
      if (bar) bar.style.transform = `scaleX(${(max > 0 ? scrollY / max : 0).toFixed(4)})`;
      const next = scrollY > 24;
      if (next !== scrolled) { scrolled = next; root.classList.toggle('is-scrolled', next); }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    listen(window, 'scroll', onScroll, { passive: true });
    listen(window, 'resize', onScroll);
    off.push(() => cancelAnimationFrame(frame));

    // Stagger indices
    document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
      Array.from(group.children).forEach((child, i) => (child as HTMLElement).style.setProperty('--i', String(i)));
    });

    // Scroll reveals
    const targets = document.querySelectorAll('[data-reveal],[data-stagger]');
    if (!animated || !('IntersectionObserver' in window)) {
      targets.forEach((t) => t.classList.add('is-visible'));
    } else {
      const io = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
        }
      }, { threshold: 0.05, rootMargin: '0px 0px -4% 0px' });
      targets.forEach((t) => io.observe(t));
      off.push(() => io.disconnect());
    }

    // Pause looping animations in sections that are off-screen
    if (animated && 'IntersectionObserver' in window) {
      const zoneIO = new IntersectionObserver((entries) => {
        for (const entry of entries) entry.target.classList.toggle('is-paused', !entry.isIntersecting);
      });
      document.querySelectorAll('.hero, .ticker, .phone-stage, .contact').forEach((zone) => zoneIO.observe(zone));
      off.push(() => zoneIO.disconnect());
    }

    // Count-up numbers
    if (animated) {
      document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
        const target = Number(el.dataset.count);
        const pad = el.textContent?.length ?? 0;
        const fmt = (n: number) => String(Math.round(n)).padStart(pad, '0');
        let raf = 0;
        el.textContent = fmt(0);
        const io = new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) return;
          io.disconnect();
          const start = performance.now();
          const step = (now: number) => {
            const t = Math.min(1, (now - start) / 1600);
            el.textContent = fmt(target * (1 - Math.pow(2, -10 * t)));
            if (t < 1) raf = requestAnimationFrame(step); else el.textContent = fmt(target);
          };
          raf = requestAnimationFrame(step);
        }, { threshold: 0.6 });
        io.observe(el);
        off.push(() => { io.disconnect(); cancelAnimationFrame(raf); el.textContent = fmt(target); });
      });
    }

    if (animated && finePointer) {
      // Hero spotlight follows the cursor
      const hero = document.querySelector<HTMLElement>('.hero');
      const spot = hero?.querySelector<HTMLElement>('.hero-spotlight');
      if (hero) {
        onPointerFrame(hero, (ev) => {
          const r = hero.getBoundingClientRect();
          const x = ev.clientX - r.left;
          const y = ev.clientY - r.top;
          if (spot) spot.style.transform = `translate3d(${x}px,${y}px,0)`;
          if (!hero.classList.contains('is-pointer')) hero.classList.add('is-pointer');
        }, () => {
          hero.classList.remove('is-pointer');
        });
      }

      // Card spotlight + tilt
      document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
        onPointerFrame(card, (ev) => {
          const r = card.getBoundingClientRect();
          const x = ev.clientX - r.left;
          const y = ev.clientY - r.top;
          card.style.setProperty('--mx', `${x}px`);
          card.style.setProperty('--my', `${y}px`);
          card.style.setProperty('--rx', `${((y / r.height) - 0.5) * -6}deg`);
          card.style.setProperty('--ry', `${((x / r.width) - 0.5) * 8}deg`);
        }, () => {
          card.style.setProperty('--rx', '0deg');
          card.style.setProperty('--ry', '0deg');
        });
      });

      // Magnetic buttons
      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
        onPointerFrame(el, (ev) => {
          const r = el.getBoundingClientRect();
          el.style.translate = `${(ev.clientX - (r.left + r.width / 2)) * 0.22}px ${(ev.clientY - (r.top + r.height / 2)) * 0.3}px`;
        }, () => { el.style.translate = ''; });
      });
    }

    return () => off.forEach((fn) => fn());
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
