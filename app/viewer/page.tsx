import { PDFViewer } from "@/components/pdf-viewer"

export const metadata = {
  title: "Portfolio Viewer | Pratham Mevada",
  description: "High-resolution PDF portfolio viewer",
}

export default function ViewerPage() {
  return (
    <main className="min-h-screen">
      <PDFViewer />
    </main>
  )
}
