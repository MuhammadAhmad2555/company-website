export default function BrandMark({ compact = false }: { compact?: boolean }) {
  return <svg className={compact ? 'brand-symbol compact' : 'brand-symbol'} viewBox="0 0 44 44" fill="none" aria-hidden="true"><path d="M8 10h13v9H8zM23 10h13v9H23zM8 21h13v13H8z" fill="currentColor" /><path d="m24 31 6-11 6 11h-4l-2-4-2 4h-4Z" fill="#c7fb72" /><path d="M24 34h12" stroke="#c7fb72" strokeWidth="2" strokeLinecap="round" /></svg>;
}
