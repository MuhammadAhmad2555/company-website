export default function BrandMark() {
  return (
    <span className="brand-symbol" aria-hidden="true">
      <img className="mark-layer" src="/icon.jpg" alt="" />
    </span>
  );
}

export function Wordmark() {
  return <img className="wordmark" src="/icon.jpg" alt="ArcX9" width="44" height="44" />;
}
