import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const imageUrl = searchParams.get("url")

  if (!imageUrl) {
    return new NextResponse("Missing image url query parameter", { status: 400 })
  }

  try {
    // 1. Fetch the remote image from the scraped database url
    const response = await fetch(imageUrl, {
      headers: {
        // Some CDNs block scraping requests unless a browser User-Agent is present
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    })

    if (!response.ok) {
      return new NextResponse("Failed to fetch remote source image", { status: response.status })
    }

    // 2. Read the image binary data stream
    const imageBuffer = await response.arrayBuffer()
    const contentType = response.headers.get("content-type") || "image/jpeg"

    // 3. Return the exact binary stream back to the client browser 
    // Cache the image for 1 day (86400 seconds) so it loads instantly next time
    return new NextResponse(Buffer.from(imageBuffer), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600",
      },
    })
  } catch (error) {
    console.error("Image proxy endpoint error:", error)
    return new NextResponse("Internal Server Error processing image", { status: 500 })
  }
}