"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Wrench,
  Zap,
  Hammer,
  Paintbrush,
  Thermometer,
  Key,
  Settings,
  Home,
  Clock,
  Star,
  Shield,
  ArrowRight,
  Sparkles,
} from "lucide-react"

interface Service {
  id: string
  name: string
  icon: string
  description: string
  basePrice: number
  emergencyPrice: number
  avgResponseTime: string
  available24x7: boolean
  subcategories: string[]
}

interface PremiumServiceCardProps {
  service: Service
  onQuickBook: (serviceId: string, isEmergency?: boolean) => void
  featured?: boolean
}

const iconMap = {
  wrench: Wrench,
  zap: Zap,
  hammer: Hammer,
  paintbrush: Paintbrush,
  thermometer: Thermometer,
  key: Key,
  settings: Settings,
  home: Home,
}

export default function PremiumServiceCard({ service, onQuickBook, featured = false }: PremiumServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = iconMap[service.icon as keyof typeof iconMap] || Settings

  return (
    <Card
      className={`group relative overflow-hidden transition-all duration-300 cursor-pointer ${
        featured
          ? "bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 shadow-lg"
          : "bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-blue-300"
      } ${isHovered ? "shadow-2xl scale-105" : "shadow-md hover:shadow-xl"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
            <Sparkles className="w-3 h-3 mr-1" />
            Popular
          </Badge>
        </div>
      )}

      {/* 24/7 Badge */}
      {service.available24x7 && (
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-green-500 text-white border-0 text-xs">24/7</Badge>
        </div>
      )}

      <CardContent className="p-6 relative z-10">
        {/* Icon and Title */}
        <div className="flex items-center space-x-4 mb-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              featured
                ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white"
                : "bg-blue-100 text-blue-600 group-hover:bg-blue-500 group-hover:text-white"
            }`}
          >
            <Icon className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
              {service.name}
            </h3>
            <p className="text-sm text-gray-600">{service.description}</p>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">${service.basePrice}</p>
              <p className="text-xs text-gray-500">Regular</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">${service.emergencyPrice}</p>
              <p className="text-xs text-red-500">Emergency</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center text-green-600 mb-1">
              <Clock className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">{service.avgResponseTime}</span>
            </div>
            <div className="flex items-center text-yellow-600">
              <Star className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">4.8+ Rating</span>
            </div>
          </div>
        </div>

        {/* Subcategories */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">Services Include:</p>
          <div className="flex flex-wrap gap-1">
            {service.subcategories.slice(0, 3).map((sub, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                {sub}
              </Badge>
            ))}
            {service.subcategories.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                +{service.subcategories.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => onQuickBook(service.id, false)}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 transition-all duration-200"
          >
            <Shield className="w-4 h-4 mr-2" />
            Book Now - ${service.basePrice}/hr
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          {service.available24x7 && (
            <Button
              onClick={() => onQuickBook(service.id, true)}
              variant="outline"
              className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-medium py-3 transition-all duration-200"
            >
              <Clock className="w-4 h-4 mr-2" />
              Emergency - ${service.emergencyPrice}/hr
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
