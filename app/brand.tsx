export default function BrandMark() {
  return (
    <span className="brand-symbol" aria-hidden="true">
      <img className="mark-layer" src="/icon.jpg" alt="" />
    </span>
  );
}

export function Wordmark() {
  return <img className="wordmark" src="/brand/arcx9.svg" alt="ArcX9" width="100" height="67" />;
}
