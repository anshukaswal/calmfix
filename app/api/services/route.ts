import { type NextRequest, NextResponse } from "next/server"

// Mock database - in production, use a real database
const services = [
  {
    id: "plumber",
    name: "Plumber",
    icon: "wrench",
    description: "Emergency plumbing repairs",
    basePrice: 85,
    emergencyPrice: 120,
    avgResponseTime: "15-20 min",
    available24x7: true,
    subcategories: ["Leak Repair", "Drain Cleaning", "Pipe Installation", "Water Heater", "Toilet Repair"],
  },
  {
    id: "electrician",
    name: "Electrician",
    icon: "zap",
    description: "Electrical repairs & installations",
    basePrice: 95,
    emergencyPrice: 140,
    avgResponseTime: "20-25 min",
    available24x7: true,
    subcategories: ["Wiring", "Panel Upgrade", "Outlet Installation", "Lighting", "Smart Home"],
  },
  {
    id: "carpenter",
    name: "Carpenter",
    icon: "hammer",
    description: "Wood repairs & installations",
    basePrice: 75,
    emergencyPrice: 110,
    avgResponseTime: "25-30 min",
    available24x7: false,
    subcategories: ["Door Repair", "Cabinet Installation", "Trim Work", "Furniture Repair", "Custom Build"],
  },
  {
    id: "painter",
    name: "Painter",
    icon: "paintbrush",
    description: "Interior & exterior painting",
    basePrice: 65,
    emergencyPrice: 95,
    avgResponseTime: "30-35 min",
    available24x7: false,
    subcategories: ["Interior Painting", "Exterior Painting", "Touch-ups", "Wallpaper", "Color Consultation"],
  },
  {
    id: "hvac",
    name: "HVAC Technician",
    icon: "thermometer",
    description: "Heating & cooling systems",
    basePrice: 110,
    emergencyPrice: 160,
    avgResponseTime: "20-30 min",
    available24x7: true,
    subcategories: ["AC Repair", "Heating Repair", "Duct Cleaning", "Installation", "Maintenance"],
  },
  {
    id: "locksmith",
    name: "Locksmith",
    icon: "key",
    description: "Lock & security services",
    basePrice: 90,
    emergencyPrice: 130,
    avgResponseTime: "15-25 min",
    available24x7: true,
    subcategories: ["Lockout Service", "Lock Installation", "Key Duplication", "Security Systems", "Safe Services"],
  },
  {
    id: "appliance",
    name: "Appliance Repair",
    icon: "settings",
    description: "Home appliance repairs",
    basePrice: 80,
    emergencyPrice: 115,
    avgResponseTime: "25-35 min",
    available24x7: false,
    subcategories: ["Refrigerator", "Washer/Dryer", "Dishwasher", "Oven/Stove", "Microwave"],
  },
  {
    id: "roofing",
    name: "Roofing",
    icon: "home",
    description: "Roof repairs & maintenance",
    basePrice: 120,
    emergencyPrice: 180,
    avgResponseTime: "30-45 min",
    available24x7: false,
    subcategories: ["Leak Repair", "Shingle Replacement", "Gutter Cleaning", "Inspection", "Emergency Tarping"],
  },
]

export async function GET() {
  return NextResponse.json({ services })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { serviceId, location, urgency } = body

  // Find service
  const service = services.find((s) => s.id === serviceId)
  if (!service) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 })
  }

  // Calculate pricing based on urgency
  const price = urgency === "emergency" ? service.emergencyPrice : service.basePrice

  return NextResponse.json({
    service,
    estimatedPrice: price,
    responseTime: service.avgResponseTime,
    available: service.available24x7 || (new Date().getHours() >= 7 && new Date().getHours() <= 22),
  })
}
