"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, LinkIcon, AlertTriangle } from "lucide-react"
import { PDF_URL } from "@/lib/site-config"
import { useSearchParams } from "next/navigation" // add search params import

export function PDFViewer() {
  const [copied, setCopied] = useState(false)
  const searchParams = useSearchParams() // read query params
  const paramUrl = searchParams.get("url") || "" // get ?url=
  const url = useMemo(() => (paramUrl ? paramUrl : PDF_URL || "/portfolio.pdf"), [paramUrl]) // prefer ?url

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // no-op
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="border-b border-[var(--arch-line)] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <h1 className="font-serif text-xl">Pratham Mevada</h1>
            <span className="text-sm text-[var(--arch-muted)]">Portfolio Viewer</span>
          </div>
          <div className="flex items-center gap-2">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <ExternalLink className="mr-2 h-4 w-4" />
                Open in new tab
              </Button>
            </a>
            <a href={url} download>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </a>
            <Button onClick={copyLink} className="bg-[var(--arch-accent)] hover:opacity-95 text-white">
              <LinkIcon className="mr-2 h-4 w-4" />
              {copied ? "Copied!" : "Copy link"}
            </Button>
          </div>
        </div>
      </div>

      {!PDF_URL && !paramUrl && (
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="mx-auto max-w-6xl px-4 py-3 text-amber-800 text-sm flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            No PDF URL configured. Set NEXT_PUBLIC_PDF_URL in Project Settings, or upload portfolio.pdf into /public to
            use the local file.
          </div>
        </div>
      )}

      <div className="flex-1 bg-[var(--arch-bg)]">
        <div className="mx-auto max-w-[1200px] px-2 py-4">
          <div className="rounded-md border border-[var(--arch-line)] overflow-hidden bg-white">
            <iframe
              title="Architecture Portfolio PDF"
              src={`${url}#view=FitH`}
              className="w-full h-[calc(100vh-200px)]"
              style={{ border: "none" }}
            />
          </div>
          <p className="text-xs text-[var(--arch-muted)] mt-3">
            Tip: For fastest loading, host the PDF on a service that supports HTTP range requests (e.g., Vercel Blob)
            and has CORS enabled.
          </p>
        </div>
      </div>
    </div>
  )
}
