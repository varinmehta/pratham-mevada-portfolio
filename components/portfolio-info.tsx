export function PortfolioInfo() {
  return (
    <div className="grid gap-3 text-sm">
      <div className="flex items-center justify-between border-b border-[var(--arch-line)] py-2">
        <span className="text-[var(--arch-muted)]">Author</span>
        <span className="font-medium">Pratham Mevada</span>
      </div>
      <div className="flex items-center justify-between border-b border-[var(--arch-line)] py-2">
        <span className="text-[var(--arch-muted)]">Format</span>
        <span className="font-medium">Single PDF (large, high-resolution)</span>
      </div>
      <div className="flex items-center justify-between border-b border-[var(--arch-line)] py-2">
        <span className="text-[var(--arch-muted)]">Best viewing</span>
        <span className="font-medium">Desktop or tablet, landscape</span>
      </div>
    </div>
  )
}
