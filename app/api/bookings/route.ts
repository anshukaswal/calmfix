import { type NextRequest, NextResponse } from "next/server"

// Mock database for bookings
const bookings: any[] = []

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { professionalId, serviceType, location, urgency, description, userId } = body

  const booking = {
    id: `CF-${Date.now()}`,
    professionalId,
    serviceType,
    location,
    urgency,
    description,
    userId,
    status: "confirmed",
    createdAt: new Date().toISOString(),
    estimatedArrival: new Date(Date.now() + 20 * 60 * 1000).toISOString(), // 20 minutes from now
    updates: [
      {
        status: "confirmed",
        timestamp: new Date().toISOString(),
        message: "Booking confirmed. Professional is preparing to head your way.",
      },
    ],
  }

  bookings.push(booking)

  // Simulate real-time updates
  setTimeout(() => {
    booking.status = "en_route"
    booking.updates.push({
      status: "en_route",
      timestamp: new Date().toISOString(),
      message: "Professional is on the way to your location.",
    })
  }, 5000)

  return NextResponse.json({ booking })
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  const userBookings = userId ? bookings.filter((b) => b.userId === userId) : bookings

  return NextResponse.json({ bookings: userBookings })
}
