import { type NextRequest, NextResponse } from "next/server"

const professionals = [
  {
    id: 1,
    name: "Mike Johnson",
    service: "plumber",
    rating: 4.9,
    reviews: 127,
    distance: "0.8 miles",
    eta: "15-20 min",
    hourlyRate: 85,
    verified: true,
    image: "/placeholder.svg?height=40&width=40",
    specialty: "Emergency repairs, drain cleaning",
    experience: "8 years",
    certifications: ["Licensed Plumber", "Emergency Response Certified"],
    availability: "24/7",
    completedJobs: 1247,
  },
  {
    id: 2,
    name: "Sarah Chen",
    service: "electrician",
    rating: 4.8,
    reviews: 89,
    distance: "1.2 miles",
    eta: "20-25 min",
    hourlyRate: 95,
    verified: true,
    image: "/placeholder.svg?height=40&width=40",
    specialty: "Wiring, panel upgrades",
    experience: "6 years",
    certifications: ["Master Electrician", "Smart Home Specialist"],
    availability: "24/7",
    completedJobs: 892,
  },
  {
    id: 3,
    name: "David Rodriguez",
    service: "carpenter",
    rating: 4.9,
    reviews: 156,
    distance: "0.5 miles",
    eta: "10-15 min",
    hourlyRate: 75,
    verified: true,
    image: "/placeholder.svg?height=40&width=40",
    specialty: "Cabinet repair, door installation",
    experience: "12 years",
    certifications: ["Certified Carpenter", "Custom Furniture Specialist"],
    availability: "7 AM - 8 PM",
    completedJobs: 1567,
  },
  {
    id: 4,
    name: "Emily Watson",
    service: "painter",
    rating: 4.7,
    reviews: 203,
    distance: "1.5 miles",
    eta: "25-30 min",
    hourlyRate: 65,
    verified: true,
    image: "/placeholder.svg?height=40&width=40",
    specialty: "Interior painting, touch-ups",
    experience: "5 years",
    certifications: ["Professional Painter", "Color Consultant"],
    availability: "8 AM - 6 PM",
    completedJobs: 756,
  },
  {
    id: 5,
    name: "Robert Kim",
    service: "hvac",
    rating: 4.8,
    reviews: 134,
    distance: "2.1 miles",
    eta: "20-30 min",
    hourlyRate: 110,
    verified: true,
    image: "/placeholder.svg?height=40&width=40",
    specialty: "AC repair, heating systems",
    experience: "10 years",
    certifications: ["HVAC Certified", "EPA Certified"],
    availability: "24/7",
    completedJobs: 1123,
  },
  {
    id: 6,
    name: "Lisa Park",
    service: "locksmith",
    rating: 4.9,
    reviews: 167,
    distance: "1.8 miles",
    eta: "15-25 min",
    hourlyRate: 90,
    verified: true,
    image: "/placeholder.svg?height=40&width=40",
    specialty: "Emergency lockouts, security",
    experience: "7 years",
    certifications: ["Certified Locksmith", "Security Specialist"],
    availability: "24/7",
    completedJobs: 934,
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const service = searchParams.get("service")
  const location = searchParams.get("location")

  let filteredPros = professionals

  if (service) {
    filteredPros = filteredPros.filter((pro) => pro.service === service)
  }

  // Sort by distance and rating
  filteredPros.sort((a, b) => {
    const aDistance = Number.parseFloat(a.distance)
    const bDistance = Number.parseFloat(b.distance)
    return aDistance - bDistance || b.rating - a.rating
  })

  return NextResponse.json({ professionals: filteredPros })
}
