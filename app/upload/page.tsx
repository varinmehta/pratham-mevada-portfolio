"use client"

import type React from "react"

import { useCallback, useState } from "react"

export default function UploadPage() {
  const [status, setStatus] = useState<"idle" | "getting" | "uploading" | "done" | "error">("idle")
  const [error, setError] = useState<string>("")
  const [file, setFile] = useState<File | null>(null)
  const [publicUrl, setPublicUrl] = useState<string>("")

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null
    setFile(f || null)
    setPublicUrl("")
    setError("")
    setStatus("idle")
  }, [])

  const upload = useCallback(async () => {
    if (!file) return
    if (file.type !== "application/pdf") {
      setError("Please select a PDF file.")
      return
    }
    try {
      setStatus("getting")
      const res = await fetch("/api/blob/upload-url", { method: "POST" })
      if (!res.ok) throw new Error("Could not get upload URL")
      const { uploadUrl } = await res.json()

      setStatus("uploading")
      // PUT directly to Vercel Blob
      const putRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "content-type": file.type,
          // x-vercel-blob-* headers are set automatically by the signed URL
        },
        body: file,
      })
      if (!putRes.ok) throw new Error("Upload failed")

      // The Location header contains the final public URL
      const location = putRes.headers.get("Location")
      if (!location) throw new Error("Missing Location header with public URL")
      setPublicUrl(location)
      setStatus("done")
    } catch (e: any) {
      setError(e?.message || "Upload failed")
      setStatus("error")
    }
  }, [file])

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-2xl font-semibold text-balance">Upload Portfolio PDF (Vercel Blob)</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Select the 100 MB PDF and upload directly to Vercel Blob. You’ll get a public URL to use in the viewer or as
          NEXT_PUBLIC_PDF_URL.
        </p>

        <div className="mt-6 flex flex-col gap-4">
          <input
            type="file"
            accept="application/pdf"
            onChange={onFileChange}
            className="block w-full text-sm file:mr-3 file:rounded-md file:border file:border-border file:bg-muted file:px-3 file:py-2 file:hover:bg-accent file:hover:text-accent-foreground"
          />
          <div className="flex items-center gap-3">
            <button
              onClick={upload}
              disabled={!file || status === "getting" || status === "uploading"}
              className="px-4 py-2 rounded-md bg-foreground text-background disabled:opacity-50"
            >
              {status === "getting" ? "Preparing…" : status === "uploading" ? "Uploading…" : "Upload"}
            </button>
            {status === "error" && <span className="text-sm text-red-600">{error}</span>}
          </div>

          {status === "done" && publicUrl && (
            <div className="mt-4 rounded-md border border-border p-4">
              <p className="text-sm">Public URL</p>
              <p className="mt-1 break-all text-sm font-mono">{publicUrl}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <a
                  className="px-3 py-2 rounded-md border border-border hover:bg-accent hover:text-accent-foreground"
                  href={publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open PDF
                </a>
                <a
                  className="px-3 py-2 rounded-md border border-border hover:bg-accent hover:text-accent-foreground"
                  href={`/viewer?url=${encodeURIComponent(publicUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Viewer
                </a>
                <button
                  className="px-3 py-2 rounded-md bg-foreground text-background"
                  onClick={async () => {
                    await navigator.clipboard.writeText(publicUrl)
                  }}
                >
                  Copy URL
                </button>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                To make this the default, set NEXT_PUBLIC_PDF_URL in Project Settings to the URL above.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
