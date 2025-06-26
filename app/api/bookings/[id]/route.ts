import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // Mock booking data - in production, fetch from database
  const booking = {
    id: params.id,
    status: "en_route",
    professional: {
      name: "Mike Johnson",
      phone: "(555) 123-4567",
      rating: 4.9,
      image: "/placeholder.svg?height=40&width=40",
    },
    service: "Plumber",
    location: "Downtown",
    estimatedArrival: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    updates: [
      {
        status: "confirmed",
        timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        message: "Booking confirmed",
      },
      {
        status: "en_route",
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        message: "Professional is on the way",
      },
    ],
  }

  return NextResponse.json({ booking })
}
