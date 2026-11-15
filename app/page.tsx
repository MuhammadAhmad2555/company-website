import Navigation from './navigation';
import BrandMark, { Wordmark } from './brand';
import Motion from './motion';

/** Splits text into masked words for the staggered headline reveal. */
function Words({ text, start, className = '' }: { text: string; start: number; className?: string }) {
  const words = text.split(' ');
  return <>{words.map((word, i) => <span key={`${word}-${i}`}><span className={`word ${className}`.trim()}><span style={{ '--i': start + i } as React.CSSProperties}>{word}</span></span>{i < words.length - 1 ? ' ' : ''}</span>)}</>;
}

type IconName = 'code' | 'cloud' | 'shield' | 'spark' | 'arrow' | 'layers' | 'pulse';

function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    code: <><path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 4l-4 16" /></>,
    cloud: <><path d="M7 18h11a4 4 0 0 0 .4-8A6.5 6.5 0 0 0 6 8.5 4.8 4.8 0 0 0 7 18Z" /><path d="m10 14 2-2 2 2" /></>,
    shield: <><path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z" /><path d="m9 12 2 2 4-4" /></>,
    spark: <><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" /><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
    pulse: <><path d="M3 12h4l3-8 4 16 3-8h4" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

const services: { icon: IconName; number: string; title: string; text: string; tag: string }[] = [
  { icon: 'code', number: '01', title: 'Software & products', text: 'Custom platforms and applications engineered around how your business really works.', tag: 'Web · Mobile · Platforms' },
  { icon: 'cloud', number: '02', title: 'Cloud & infrastructure', text: 'Secure, resilient cloud foundations that help teams move faster and scale confidently.', tag: 'Cloud · DevOps · Modernization' },
  { icon: 'shield', number: '03', title: 'Cybersecurity', text: 'Practical security built into your systems, processes, and everyday decisions.', tag: 'Security · Risk · Resilience' },
  { icon: 'spark', number: '04', title: 'AI & intelligent automation', text: 'Turn repetitive work and untapped data into useful, measurable business outcomes.', tag: 'AI · Data · Automation' },
];

const capabilities = ['Product strategy', 'Experience design', 'Full-stack engineering', 'Cloud architecture', 'Security engineering', 'AI enablement'];

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Motion />
    <Navigation />
    <main id="main">
      <section className="hero shell">
        <div className="hero-spotlight" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> INDEPENDENT TECHNOLOGY PARTNER <span className="eyebrow-line" /></p>
          <h1 className="split-title"><span className="line"><Words text="Technology that" start={0} /></span> <span className="line"><Words text="moves" start={2} /> <Words text="business" start={3} className="accent" /></span> <span className="line"><span className="word"><span style={{ '--i': 4 } as React.CSSProperties}>forward<span className="period">.</span></span></span></span></h1>
          <p className="hero-lede">ArcX9 helps ambitious teams design, build, and secure the systems behind their next stage of growth.</p>
          <div className="hero-actions"><a className="button button-primary" href="#contact" data-magnetic>Start a conversation <Icon name="arrow" size={18} /></a><a className="quiet-link" href="#services">Explore our capabilities <span>↓</span></a></div>
          <div className="hero-proof"><div className="proof-avatars"><span>A</span><span>9</span><span>+</span></div><p><strong>Built for real-world impact</strong><br />Clear thinking. Strong execution.</p><div className="proof-rule" /><p className="proof-index">ARCX9 <span>/</span> 001</p></div>
        </div>
        <div className="hero-visual" aria-label="Abstract ArcX9 technology systems visualization" role="img">
          <div className="visual-noise" /><div className="visual-grid" />
          <div className="visual-top"><span><i /> SYSTEMS / 01</span><span>DESIGNED TO ADAPT</span></div>
          <div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="orbit orbit-c" />
          <div className="core-mark"><BrandMark bare /></div>
          <div className="signal signal-a"><span className="signal-icon"><Icon name="layers" size={17} /></span><span><b>Connected systems</b><small>One clear direction</small></span><i className="signal-check">↗</i></div>
          <div className="signal signal-b"><span className="signal-pulse"><Icon name="pulse" size={18} /></span><span><b>Always moving</b><small>Reliable by design</small></span></div>
          <div className="visual-caption"><span>THE ARCX9 APPROACH</span><span>PEOPLE + PROCESS + TECHNOLOGY</span></div>
        </div>
        <div className="hero-bottom"><span>SCROLL TO EXPLORE <b>↓</b></span><span>STRATEGY / ENGINEERING / SECURITY</span><span>EST. FOR WHAT'S NEXT</span></div>
      </section>

      <section className="intro section shell" id="about">
        <div className="section-kicker" data-reveal><span>01</span><i /> WHO WE ARE</div>
        <div className="intro-content"><h2 data-reveal>Good technology should make the complex <em>feel clear.</em></h2><div className="intro-copy" data-reveal style={{ '--d': '.15s' } as React.CSSProperties}><p>We bring strategy, engineering, and design together to solve the problems that matter. From first idea to dependable delivery, we make technology work for your people and your goals.</p><a className="under-link" href="#approach">Get to know ArcX9 <Icon name="arrow" size={16} /></a></div></div>
        <div className="metrics" data-reveal><div><strong><em className="count" data-count="1">01</em><span>—</span></strong><small>Partner, from day one</small></div><div><strong><em className="count" data-count="360">360</em><span>°</span></strong><small>Thoughtful end-to-end view</small></div><div><strong>∞</strong><small>Room to grow and adapt</small></div></div>
      </section>

      <section className="services section" id="services"><div className="shell">
        <div className="section-kicker" data-reveal><span>02</span><i /> WHAT WE DO</div>
        <div className="section-heading"><h2 data-reveal>Built around your<br /><em>next big move.</em></h2><p data-reveal style={{ '--d': '.15s' } as React.CSSProperties}>From core infrastructure to customer-facing products, we help you make the right technology choices—and make them work.</p></div>
        <div className="service-grid" data-stagger>{services.map((service) => <article className="service-card" key={service.number}><div className="service-meta"><span>{service.number} / CAPABILITY</span><span className="service-icon"><Icon name={service.icon} size={21} /></span></div><h3>{service.title}</h3><p>{service.text}</p><div className="service-footer"><span>{service.tag}</span><a href="#contact" aria-label={`Discuss ${service.title}`}><Icon name="arrow" size={18} /></a></div></article>)}</div>
        <div className="capability-bar"><span>ALSO IN OUR TOOLKIT</span><div data-reveal>{capabilities.map((item) => <span key={item}>{item}</span>)}</div></div>
      </div></section>

      <section className="approach section shell" id="approach">
        <div className="section-kicker" data-reveal><span>03</span><i /> HOW WE WORK</div>
        <div className="approach-layout"><div className="approach-lead" data-reveal><h2>Small steps.<br /><em>Meaningful progress.</em></h2><p>Senior attention, honest advice, and a process that keeps the work moving.</p><a className="button button-dark" href="#contact" data-magnetic>See what we can do together <Icon name="arrow" size={18} /></a></div>
          <div className="approach-steps" data-stagger>{[['01', 'Understand the opportunity', 'We listen, ask better questions, and get to the heart of the challenge.'], ['02', 'Set a clear direction', 'A focused plan that aligns people, priorities, and the right technology.'], ['03', 'Build, learn, improve', 'We deliver in the open, adapt with feedback, and stay accountable to the outcome.']].map(([n, title, copy]) => <article key={n}><span className="step-number">{n}</span><div><h3>{title}</h3><p>{copy}</p></div><span className="step-arrow">↗</span></article>)}</div></div>
      </section>

      <section className="manifesto"><div className="shell manifesto-inner" data-reveal><span className="manifesto-stamp"><BrandMark compact bare /></span><p>Make technology<br />your <em>unfair advantage.</em></p><span className="manifesto-aside">THE NEXT CHAPTER<br />IS YOURS TO BUILD.</span></div></section>

      <section className="contact section shell" id="contact"><div className="contact-top"><div className="section-kicker" data-reveal><span>04</span><i /> LET'S TALK</div><span className="contact-code" data-reveal>ARCX9 / OPEN CHANNEL</span></div><div className="contact-body"><h2 data-reveal>Have a challenge<br />worth <em>solving?</em></h2><div data-reveal style={{ '--d': '.15s' } as React.CSSProperties}><p>Tell us where you want to go. We’ll help you map the way forward.</p><a className="button button-primary" data-magnetic href="mailto:hello@arcx9.com?subject=Let%E2%80%99s%20talk%20technology">Let’s talk about it <Icon name="arrow" size={18} /></a></div></div></section>
    </main>
    <footer className="footer"><div className="shell footer-main"><a className="brand" href="#top" aria-label="ArcX9 home"><Wordmark /></a><p>Technology that moves business forward.</p><div className="footer-nav"><a href="#services">Services</a><a href="#approach">Approach</a><a href="#contact">Contact</a></div><a className="back-top" href="#top" aria-label="Back to top" data-magnetic>↑</a></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} ArcX9 Technologies</span><span>INDEPENDENT BY DESIGN. BUILT FOR WHAT'S NEXT.</span><a href="mailto:hello@arcx9.com">HELLO@ARCX9.COM</a></div></footer>
  </>;
}
