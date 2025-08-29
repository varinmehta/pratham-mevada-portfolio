import type { NextRequest } from "next/server"
import { generateUploadURL } from "@vercel/blob"

export const dynamic = "force-dynamic"

// Only allow PDF uploads, make them public so the viewer can load the file directly
export async function POST(_req: NextRequest) {
  try {
    const { url } = await generateUploadURL({
      // public access so it can be viewed and embedded
      access: "public",
      // optional: enforce content type; the browser will send content-type on PUT
      allowedContentTypes: ["application/pdf"],
    })
    return Response.json({ uploadUrl: url })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || "Failed to create upload URL" }), { status: 500 })
  }
}
