import { type NextRequest, NextResponse } from "next/server"

// Mock user database
const users: any[] = []

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email, password, name, phone } = body

  // Check if user exists
  const existingUser = users.find((u) => u.email === email)
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 })
  }

  const user = {
    id: Date.now().toString(),
    email,
    name,
    phone,
    verified: true,
    createdAt: new Date().toISOString(),
    preferences: {
      notifications: true,
      emergencyMode: false,
      autoLocation: true,
    },
  }

  users.push(user)

  return NextResponse.json({ user })
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get("email")

  if (email) {
    const user = users.find((u) => u.email === email)
    if (user) {
      return NextResponse.json({ user })
    }
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  return NextResponse.json({ users })
}
