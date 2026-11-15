/**
 * ArcX9 mark: a geometric "9" built from an arc and a sweeping tail, with an
 * orbiting node. `bare` drops the tile for use inside already-framed surfaces.
 */
export default function BrandMark({ compact = false, bare = false }: { compact?: boolean; bare?: boolean }) {
  return <svg className={compact ? 'brand-symbol compact' : 'brand-symbol'} viewBox="0 0 44 44" fill="none" aria-hidden="true">
    {!bare && <rect x="2" y="2" width="40" height="40" rx="12" style={{ fill: 'var(--primary)' }} />}
    <g strokeWidth="4" strokeLinecap="round" style={{ stroke: bare ? 'currentColor' : 'var(--on-primary)' }}>
      <circle cx="21" cy="18" r="7" />
      <path d="M28 18v3.5C28 29 23 33.5 15.5 33.5" />
    </g>
    <circle cx="31.5" cy="10.5" r="2.8" style={{ fill: bare ? 'var(--accent)' : '#ffffff' }} />
  </svg>;
}
