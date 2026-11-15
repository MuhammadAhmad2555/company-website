type BrandMarkProps = { compact?: boolean; bare?: boolean };

export default function BrandMark({ compact = false, bare = false }: BrandMarkProps) {
  return (
    <span className={compact ? 'brand-symbol compact' : 'brand-symbol'} aria-hidden="true">
      <img className="mark-layer" src={bare ? '/brand/symbol.svg' : '/icon.svg'} alt="" />
    </span>
  );
}

export function Wordmark() {
  return <img className="wordmark" src="/brand/arcx9.svg" alt="ArcX9" width="194" height="60" />;
}
