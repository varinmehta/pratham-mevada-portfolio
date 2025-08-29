// Central place to configure the PDF location.
// Prefer a public, CORS-enabled URL that supports HTTP Range Requests.
// Example: set NEXT_PUBLIC_PDF_URL in Project Settings.
export const PDF_URL =
  (typeof process !== "undefined" && typeof process.env !== "undefined" && process.env.NEXT_PUBLIC_PDF_URL) || ""
