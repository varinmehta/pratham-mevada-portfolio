import { Button } from "@/components/ui/button"
import { ArrowRight, Download } from "lucide-react"
import Link from "next/link"
import { PortfolioInfo } from "@/components/portfolio-info"
import { PDF_URL } from "@/lib/site-config"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-6 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl tracking-tight text-balance">Pratham Mevada</span>
            <span className="text-sm text-muted-foreground">Architecture Portfolio</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/viewer">
              <Button className="bg-accent text-accent-foreground hover:opacity-95">
                View Portfolio
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            {PDF_URL ? (
              <a href={PDF_URL} target="_blank" rel="noopener noreferrer" className="ml-1">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </a>
            ) : null}
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h1 className="font-serif text-4xl md:text-5xl tracking-tight text-pretty">
              Thoughtful, precise, and context-driven architecture.
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-prose">
              A curated selection of academic and conceptual works by Pratham Mevada, presented as a single,
              high-resolution portfolio. Optimized for large-format drawings and detailed review.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/viewer">
                <Button className="bg-accent text-accent-foreground hover:opacity-95">
                  Open Portfolio
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              {PDF_URL ? (
                <a href={PDF_URL} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">Open in New Tab</Button>
                </a>
              ) : null}
            </div>
            <div className="pt-4">
              <PortfolioInfo />
            </div>
          </div>

          <div className="rounded-md border border-border bg-card">
            <img
              src="/architectural-portfolio-cover-mock-up-with-grid-an.png"
              alt="Portfolio preview mock-up with architectural drawings"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-10 text-sm text-muted-foreground flex items-center justify-between">
          <span>© {new Date().getFullYear()} Pratham Mevada</span>
          <span>Made for architecture review</span>
        </div>
      </footer>
    </main>
  )
}
