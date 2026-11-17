import Navigation from './navigation';
import { Wordmark } from './brand';
import Motion from './motion';
import HeroScene from './scene';

/** Splits text into masked words for the staggered headline reveal. */
function Words({ text, start, className = '' }: { text: string; start: number; className?: string }) {
  const words = text.split(' ');
  return <>{words.map((word, i) => <span key={`${word}-${i}`}><span className={`word ${className}`.trim()}><span style={{ '--i': start + i } as React.CSSProperties}>{word}</span></span>{i < words.length - 1 ? ' ' : ''}</span>)}</>;
}

type IconName =
  | 'code' | 'cloud' | 'shield' | 'spark' | 'arrow' | 'layers' | 'pulse'
  | 'mobile' | 'globe' | 'palette' | 'lock' | 'key' | 'eye' | 'chip'
  | 'check' | 'building' | 'desktop' | 'server' | 'wrench';

function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    code: <><path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 4l-4 16" /></>,
    cloud: <><path d="M7 18h11a4 4 0 0 0 .4-8A6.5 6.5 0 0 0 6 8.5 4.8 4.8 0 0 0 7 18Z" /><path d="m10 14 2-2 2 2" /></>,
    shield: <><path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z" /><path d="m9 12 2 2 4-4" /></>,
    spark: <><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" /><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
    pulse: <><path d="M3 12h4l3-8 4 16 3-8h4" /></>,
    mobile: <><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.5h2" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" /></>,
    palette: <><path d="M12 21a9 9 0 1 1 9-9c0 2.5-1.5 3.5-3 3.5h-2.2a2.3 2.3 0 0 0-1.8 3.7c.5.7.4 1.8-1 1.8Z" /><circle cx="7.5" cy="11.5" r="1.1" /><circle cx="10.5" cy="7.5" r="1.1" /><circle cx="15" cy="7.5" r="1.1" /><circle cx="17" cy="11.5" r="1.1" /></>,
    lock: <><rect x="4.5" y="10.5" width="15" height="10" rx="2.5" /><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" /><circle cx="12" cy="15.5" r="1.4" /></>,
    key: <><circle cx="8" cy="15.5" r="4.5" /><path d="m11.2 12.3 8.3-8.3M17 6l2.2 2.2M14.5 8.5l2 2" /></>,
    eye: <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="3" /></>,
    chip: <><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="9.5" y="9.5" width="5" height="5" rx="1" /><path d="M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5" /></>,
    desktop: <><rect x="2.5" y="4" width="19" height="12.5" rx="2" /><path d="M9 20.5h6M12 16.5v4" /></>,
    server: <><rect x="3" y="4" width="18" height="7" rx="2" /><rect x="3" y="13" width="18" height="7" rx="2" /><path d="M7 7.5h.01M7 16.5h.01" /></>,
    wrench: <><path d="M14.5 6.5a4.5 4.5 0 0 0-6 6L3 18l3 3 5.5-5.5a4.5 4.5 0 0 0 6-6L14 13l-3-3 3.5-3.5Z" /></>,
    check: <><path d="m4.5 12.5 5 5 10-11" /></>,
    building: <><path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M16 9h3a1.5 1.5 0 0 1 1.5 1.5V21M3 21h18" /><path d="M8 7h4M8 11h4M8 15h4" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 384 512" fill="currentColor" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#EA4335" d="M3.6 1.8 13.7 12 3.6 22.2c-.4-.3-.6-.8-.6-1.4V3.2c0-.6.2-1.1.6-1.4Z" />
      <path fill="#FBBC04" d="m17.4 8.3-3.7 3.7L4.2 1.4c.4-.2.9-.2 1.4 0l11.8 6.9Z" />
      <path fill="#4285F4" d="m17.4 15.7-11.8 6.9c-.5.2-1 .2-1.4 0l9.5-10.6 3.7 3.7Z" />
      <path fill="#34A853" d="m17.4 8.3 3.2 1.9c1 .6 1 1.9 0 2.5l-3.2 1.9-3.7-2.6v-.1l3.7-3.6Z" />
    </svg>
  );
}

const services: { icon: IconName; number: string; title: string; text: string; tag: string }[] = [
  { icon: 'mobile', number: '01', title: 'Mobile applications', text: 'Native-quality iOS and Android apps — designed, engineered, and shipped to the App Store and Google Play, just like KyberQ.', tag: 'iOS · ANDROID · CROSS-PLATFORM' },
  { icon: 'desktop', number: '02', title: 'Desktop applications', text: 'macOS and Windows apps with real native feel — signed, auto-updating, and distributed through stores or direct download.', tag: 'MACOS · WINDOWS' },
  { icon: 'globe', number: '03', title: 'Websites & web apps', text: 'Company sites, portals, and full web applications built on modern stacks — fast, responsive, and SEO-ready from day one.', tag: 'NEXT.JS · REACT · CMS' },
  { icon: 'palette', number: '04', title: 'Product design', text: 'Interfaces people understand instantly. Research, wireframes, design systems, and motion that make complex products feel simple.', tag: 'UI/UX · DESIGN SYSTEMS · MOTION' },
  { icon: 'cloud', number: '05', title: 'Cloud & DevOps', text: 'Cloud architecture, CI/CD pipelines, and infrastructure as code — environments that deploy themselves and scale on demand.', tag: 'AWS · CLOUDFLARE · KUBERNETES' },
  { icon: 'shield', number: '06', title: 'Security & encryption', text: 'From audits to post-quantum cryptography — we build systems that protect data today and against the quantum computers of tomorrow.', tag: 'PQC · AUDITS · ZERO-TRUST' },
  { icon: 'spark', number: '07', title: 'AI & automation', text: 'Practical AI features and workflow automation wired into your product — with human review where decisions need judgment.', tag: 'LLM APPS · AGENTS · PIPELINES' },
  { icon: 'server', number: '08', title: 'API & backend systems', text: 'APIs, databases, and business logic that scale — auth, payments, and third-party integrations on solid architecture.', tag: 'REST · GRAPHQL · DATABASES' },
  { icon: 'wrench', number: '09', title: 'Support & maintenance', text: 'We stay after launch — monitoring, security patches, dependency updates, and feature iterations on a steady cadence.', tag: 'SLA · UPDATES · MONITORING' },
];

const tickerItems = ['APPLICATIONS', 'WEBSITES', 'UI/UX DESIGN', 'CLOUD & DEVOPS', 'POST-QUANTUM SECURITY', 'AI & AUTOMATION', 'iOS & ANDROID', 'MADE IN PAKISTAN'];

const siteShowcase = [
  { title: 'Corporate & company sites', text: 'A sharp, credible home for your business — built to convert visitors into conversations.', accent: 'linear-gradient(135deg, rgba(146,120,250,.35), rgba(146,120,250,.05))', domain: 'yourcompany.com' },
  { title: 'E-commerce storefronts', text: 'Storefronts with fast checkouts, product management, and payment integration baked in.', accent: 'linear-gradient(135deg, rgba(107,212,239,.3), rgba(107,212,239,.04))', domain: 'yourstore.shop' },
  { title: 'Web apps & dashboards', text: 'Internal tools, client portals, and data dashboards your team will actually enjoy using.', accent: 'linear-gradient(135deg, rgba(185,166,255,.32), rgba(107,212,239,.05))', domain: 'app.yourproduct.io' },
];




const steps: [string, string, string][] = [
  ['01', 'Discover', 'We map your goals, users, and constraints — then define what "done" actually looks like.'],
  ['02', 'Design', 'Flows, prototypes, and a design system validated against real use cases before a line of code.'],
  ['03', 'Build', 'Iterative engineering in the open — you see progress every week, not at the end.'],
  ['04', 'Ship & scale', 'Store submissions, deployments, monitoring, and a roadmap for what comes next.'],
];

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Motion />
    <Navigation />
    <main id="main">

      {/* ================= HERO ================= */}
      <section className="hero" id="top">
        <HeroScene />
        <div className="hero-spotlight" aria-hidden="true" />
        <div className="hero-fade" aria-hidden="true" />
        <div className="shell">
          <div className="hero-inner">
            <p className="eyebrow"><span className="status-dot" /> ARCX9 TECHNOLOGIES — SOFTWARE COMPANY</p>
            <h1 className="split-title">
              <span className="line"><Words text="We build software" start={0} /></span>
              <span className="line"><Words text="people trust" start={3} className="accent" /></span>
              <span className="line"><Words text="with everything." start={5} /></span>
            </h1>
            <p className="hero-lede">
              Applications, websites, and secure systems — engineered end-to-end by a team that ships.
              Makers of <b>KyberQ</b>, the post-quantum encrypted vault for iOS and Android.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact" data-magnetic>Start a project <Icon name="arrow" size={15} /></a>
              <a className="button button-ghost" href="#products" data-magnetic>Explore our work <span aria-hidden="true">↓</span></a>
            </div>
            <div className="hero-badges">
              <span><Icon name="building" size={13} /> SECP-REGISTERED · PAKISTAN</span>
              <span><Icon name="shield" size={13} /> POST-QUANTUM SECURITY</span>
              <span><Icon name="mobile" size={13} /> iOS · ANDROID · WEB</span>
            </div>
          </div>
        </div>
        <div className="hero-scroll" aria-hidden="true"><span>SCROLL</span><i /></div>
      </section>

      {/* ================= TICKER ================= */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((item, i) => <span key={i}>{item}</span>)}
        </div>
      </div>

      {/* ================= ABOUT ================= */}
      <section className="intro section shell" id="about">
        <div className="section-kicker" data-reveal><span>01</span><i /> WHO WE ARE</div>
        <div className="intro-content">
          <h2 data-reveal>A software company built for the <em>post-quantum era.</em></h2>
          <div className="intro-copy" data-reveal style={{ '--d': '.15s' } as React.CSSProperties}>
            <p><b>ArcX9 Technologies</b> designs, engineers, and ships digital products — from consumer apps hardened with post-quantum encryption to the websites and cloud platforms businesses run on.</p>
            <p>We are engineers first: every interface we design is one we can build, secure, and operate.</p>
            <a className="under-link" href="#services">What we do <Icon name="arrow" size={15} /></a>
          </div>
        </div>
        <div className="stats" data-stagger>
          <div><strong><span data-count="3">3</span><span>+</span></strong><small>Product live </small></div>
          <div><strong><span data-count="3">3</span></strong><small>Store platforms — iOS &amp; Android &amp; Mac OS</small></div>
          <div><strong><span data-count="9">9</span></strong><small>Languages shipped in our apps</small></div>
          <div><strong><span data-count="100">100</span><span>%</span></strong><small>On-device privacy, by design</small></div>
        </div>
        <div className="secp-strip" data-reveal>
          <span className="secp-stamp"><Icon name="building" size={22} /></span>
          <p><b>Registered &amp; accountable.</b> ArcX9 Technologies is a private limited company incorporated with the <b>Securities &amp; Exchange Commission of Pakistan (SECP)</b> — a real legal entity behind every line of code we ship.</p>
          <span className="mono">SECP · PK</span>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="services section" id="services"><div className="shell">
        <div className="section-kicker" data-reveal><span>02</span><i /> SERVICES</div>
        <div className="section-heading">
          <h2 data-reveal>Everything a product needs, <em>under one roof.</em></h2>
          <p data-reveal style={{ '--d': '.15s' } as React.CSSProperties}>Six disciplines, one team — from the first sketch to a hardened production release.</p>
        </div>
        <div className="service-grid" data-stagger>
          {services.map((service) => (
            <article className="service-card" key={service.number} data-tilt>
              <div className="service-meta"><span>{service.number} / SERVICE</span><span className="service-icon"><Icon name={service.icon} size={21} /></span></div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <div className="service-footer"><span>{service.tag}</span><i>→</i></div>
            </article>
          ))}
        </div>
      </div></section>

      {/* ================= APPLICATIONS ================= */}
      <section className="section shell" id="products">
        <div className="section-kicker" data-reveal><span>03</span><i /> APPLICATIONS</div>
        <div className="section-heading">
          <h2 data-reveal>Products we ship <em>ourselves.</em></h2>
          <p data-reveal style={{ '--d': '.15s' } as React.CSSProperties}>We hold ourselves to the same standard we sell — here is the proof, live on both app stores.</p>
        </div>

        <div className="product-feature" data-reveal>
          <div className="product-info">
            <span className="product-tag"><Icon name="lock" size={12} /> FLAGSHIP APP · LIVE NOW</span>
            <h3>KyberQ —<br /><span>post-quantum vault.</span></h3>
            <p>
              Hide photos and encrypt files in a private vault secured by <b>Kyber512 post-quantum
              encryption</b>, biometrics, and PIN. Everything stays on your device — no cloud, no
              account, no exceptions.
            </p>
            <div className="product-points">
              <span>Kyber512 encryption</span>
              <span>Secret second vault</span>
              <span>Intruder detection</span>
              <span>9 languages</span>
              <span>Zero cloud</span>
            </div>
            <div className="store-row">
              <a className="store-badge" href="https://apps.apple.com/pk/app/kyberq/id6772250439" target="_blank" rel="noopener noreferrer" aria-label="Download KyberQ on the App Store">
                <AppleIcon />
                <span><small>Download on the</small><b>App Store</b></span>
              </a>
              <a className="store-badge" href="https://play.google.com/store/apps/details?id=com.ark.kyberq" target="_blank" rel="noopener noreferrer" aria-label="Get KyberQ on Google Play">
                <PlayIcon />
                <span><small>Get it on</small><b>Google Play</b></span>
              </a>
              <a className="product-site" href="https://kyberquantum.site/" target="_blank" rel="noopener noreferrer">
                kyberquantum.site <Icon name="arrow" size={14} />
              </a>
            </div>
          </div>

          <div className="phone-stage" aria-hidden="true">
            <div className="phone-glow" />
            <div className="phone">
              <div className="phone-notch" />
              <div className="phone-screen">
                <div className="phone-ui">
                  <span className="phone-lock"><Icon name="lock" size={22} /></span>
                  <h5>KyberQ Vault</h5>
                  <small>KYBER512 · SECURED</small>
                  <div className="phone-albums">
                    <span className="phone-album"><i>◆</i>Photos</span>
                    <span className="phone-album"><i>◆</i>Documents</span>
                    <span className="phone-album"><i>◆</i>Secret</span>
                    <span className="phone-album"><i>◆</i>Backups</span>
                  </div>
                  <div className="phone-keys">
                    <i>1</i><i>2</i><i>3</i><i>4</i><i>5</i><i>6</i><i>7</i><i>8</i><i>9</i><i /><i>0</i><i>⌫</i>
                  </div>
                </div>
              </div>
            </div>
            <div className="orbit-chip chip-1"><Icon name="shield" size={16} /><span>Post-quantum<small>Kyber512 hybrid</small></span></div>
            <div className="orbit-chip chip-2"><Icon name="eye" size={16} /><span>Biometric + PIN<small>Face ID unlock</small></span></div>
            <div className="orbit-chip chip-3"><Icon name="cloud" size={16} /><span>100% on-device<small>No cloud, ever</small></span></div>
          </div>
        </div>
      </section>

      {/* ================= WEBSITES ================= */}
      <section className="section shell" id="websites">
        <div className="section-kicker" data-reveal><span>04</span><i /> WEBSITES</div>
        <div className="section-heading">
          <h2 data-reveal>Websites that work as hard <em>as they look.</em></h2>
          <p data-reveal style={{ '--d': '.15s' } as React.CSSProperties}>From company sites to full platforms — engineered for speed, search, and conversion.</p>
        </div>
        <div className="sites-grid" data-stagger>
          <a className="site-card featured" href="https://estatelineproperties.com" target="_blank" rel="noopener noreferrer" data-tilt>
            <div className="site-shot">
              <div className="site-chrome"><i /><i /><i /><b>estatelineproperties.com</b></div>
              <div className="site-body estate-shot">
                <div className="estate-nav">
                  <span className="estate-logo">Estate <em>Line</em></span>
                  <span className="estate-links"><i>Home</i><i>Listings</i><i>About</i><i>Contact</i></span>
                  <span className="estate-book">Book a Visit</span>
                </div>
                <div className="estate-hero">
                  <span className="estate-eyebrow">TRUSTED REAL ESTATE · SINCE 2001</span>
                  <span className="estate-title">Find your home<br />in the last light of <em>dusk.</em></span>
                  <div className="estate-ctas"><span>Explore Listings</span><span>Talk to an Agent</span></div>
                </div>
                <div className="estate-search">
                  <div><small>MAIN AREA</small><b>All areas</b></div>
                  <div><small>TYPE</small><b>All types</b></div>
                  <div><small>BUDGET</small><b>Any budget</b></div>
                  <span>Search</span>
                </div>
              </div>
            </div>
            <div className="site-info featured-info">
              <span className="live-badge"><span className="status-dot" /> LIVE PROJECT</span>
              <h3>EstateLine Properties</h3>
              <p>A real estate platform showcasing live client projects, property listings, and a property blog — built for search and designed to sell.</p>
              <span className="featured-domain">ESTATELINEPROPERTIES.COM</span>
            </div>
          </a>
          {siteShowcase.map((site) => (
            <article className="site-card" key={site.title} data-tilt>
              <div className="site-shot">
                <div className="site-chrome"><i /><i /><i /><b>{site.domain}</b></div>
                <div className="site-body">
                  <div className="site-hero-bar" style={{ background: site.accent }}><i /><i /></div>
                  <div className="site-rows"><i /><i /><i /></div>
                </div>
              </div>
              <div className="site-info">
                <div><h3>{site.title}</h3><p>{site.text}</p></div>
              </div>
            </article>
          ))}
          <a className="site-card cta" href="#contact">
            <div><h3>Your website could be next.</h3>
            <p>Tell us what you are building — we will design and ship it end-to-end.</p></div>
            <span className="button button-primary">Get a quote <Icon name="arrow" size={15} /></span>
          </a>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="process section" id="process"><div className="shell">
        <div className="section-kicker" data-reveal><span>05</span><i /> HOW WE WORK</div>
        <div className="process-layout">
          <div className="process-lead" data-reveal>
            <h2>From idea to app store, <em>without the chaos.</em></h2>
            <p>A tight loop of discovery, design, and engineering — you always know what is shipping and when.</p>
          </div>
          <div className="process-steps" data-stagger>
            {steps.map(([n, title, copy]) => (
              <article key={n}>
                <span className="step-number">{n}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
                <span className="step-arrow">↗</span>
              </article>
            ))}
          </div>
        </div>
      </div></section>

      {/* ================= CONTACT ================= */}
      <section className="contact section shell" id="contact">
        <div className="contact-inner" data-reveal>
          <div className="section-kicker"><span>06</span><i /> LET'S BUILD</div>
          <h2 style={{ marginTop: 36 }}>Have something<br /><em>worth building?</em></h2>
          <p>Apps, websites, security-hardened systems — tell us where you are headed and we will engineer the way there.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="mailto:support@arcx9.com" data-magnetic>Start a project <Icon name="arrow" size={15} /></a>
            <a className="button button-ghost" href="https://kyberquantum.site/" target="_blank" rel="noopener noreferrer" data-magnetic>See KyberQ in action</a>
          </div>
          <p className="contact-mail">OR WRITE TO US — <a href="mailto:support@arcx9.com">SUPPORT@ARCX9.COM</a></p>
        </div>
      </section>

    </main>

    {/* ================= FOOTER ================= */}
    <footer className="footer">
      <div className="shell footer-main">
        <a href="#top" aria-label="ArcX9 home"><Wordmark /></a>
        <p>Software, applications &amp; systems engineering — designed and built in Pakistan, shipped worldwide.</p>
        <div className="footer-nav">
          <a href="#services">Services</a>
          <a href="#products">Applications</a>
          <a href="#websites">Websites</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="back-top" href="#top" aria-label="Back to top" data-magnetic>↑</a>
      </div>
      <div className="shell footer-legal">
        <Icon name="shield" size={14} />
        <span>ARCX9 TECHNOLOGIES (PVT.) LTD. — REGISTERED WITH THE SECURITIES &amp; EXCHANGE COMMISSION OF PAKISTAN (SECP)</span>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} ArcX9 Technologies. All rights reserved.</span>
        <span>MADE IN PAKISTAN · BUILT FOR THE WORLD</span>
        <a href="mailto:support@arcx9.com">SUPPORT@ARCX9.COM</a>
      </div>
    </footer>
  </>;
}
