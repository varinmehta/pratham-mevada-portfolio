import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Montserrat, Open_Sans } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"

const prathamSerif = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "900"], // strong headings; includes Black (900)
  variable: "--font-montserrat",
})

const prathamSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-open-sans",
})

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${prathamSans.variable} ${prathamSerif.variable} antialiased`}>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
