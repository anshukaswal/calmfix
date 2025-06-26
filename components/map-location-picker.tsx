"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Search, Navigation, Target, X } from "lucide-react"

interface MapLocationPickerProps {
  onLocationSelect: (location: string, coordinates?: { lat: number; lng: number }) => void
  onClose: () => void
}

export default function MapLocationPicker({ onLocationSelect, onClose }: MapLocationPickerProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<{
    name: string
    address: string
    coordinates: { lat: number; lng: number }
  } | null>(null)

  const nearbyPlaces = [
    {
      name: "Downtown Plaza",
      address: "123 Main St, Downtown",
      coordinates: { lat: 40.7128, lng: -74.006 },
      type: "landmark",
    },
    {
      name: "Central Park Area",
      address: "Central Park West, Midtown",
      coordinates: { lat: 40.7829, lng: -73.9654 },
      type: "park",
    },
    {
      name: "Business District",
      address: "Financial District, Downtown",
      coordinates: { lat: 40.7074, lng: -74.0113 },
      type: "business",
    },
    {
      name: "Riverside Commons",
      address: "Riverside Dr, West Side",
      coordinates: { lat: 40.7589, lng: -73.9851 },
      type: "residential",
    },
    {
      name: "University Campus",
      address: "College Ave, North Hills",
      coordinates: { lat: 40.7505, lng: -73.9934 },
      type: "education",
    },
  ]

  const handleLocationClick = (place: (typeof nearbyPlaces)[0]) => {
    setSelectedLocation(place)
  }

  const handleConfirmLocation = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation.address, selectedLocation.coordinates)
    }
  }

  const handleCurrentLocation = () => {
    // Simulate getting current location
    const currentLoc = {
      name: "Current Location",
      address: "Your current location",
      coordinates: { lat: 40.758, lng: -73.9855 },
    }
    setSelectedLocation(currentLoc)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[80vh] bg-white shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-600" />
            Choose Your Location
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0 h-full">
          <div className="flex h-full">
            {/* Map Area */}
            <div className="flex-1 relative bg-gradient-to-br from-green-100 to-blue-100">
              {/* Simulated Map Interface */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50">
                <div className="absolute inset-4 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                  <div className="flex items-center justify-center h-full text-gray-600">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                      <p className="text-lg font-medium">Interactive Map</p>
                      <p className="text-sm">Click on locations below to see them on the map</p>
                    </div>
                  </div>
                </div>

                {/* Map Markers */}
                {nearbyPlaces.map((place, index) => (
                  <div
                    key={index}
                    className={`absolute w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ${
                      selectedLocation?.name === place.name
                        ? "bg-blue-600 text-white scale-125 shadow-lg"
                        : "bg-red-500 text-white hover:scale-110"
                    }`}
                    style={{
                      left: `${20 + index * 15}%`,
                      top: `${30 + (index % 3) * 20}%`,
                    }}
                    onClick={() => handleLocationClick(place)}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                ))}
              </div>

              {/* Map Controls */}
              <div className="absolute top-4 right-4 space-y-2">
                <Button
                  size="sm"
                  onClick={handleCurrentLocation}
                  className="bg-white text-gray-700 hover:bg-gray-50 shadow-lg"
                >
                  <Target className="w-4 h-4 mr-1" />
                  My Location
                </Button>
              </div>
            </div>

            {/* Location List */}
            <div className="w-80 border-l bg-gray-50 flex flex-col">
              {/* Search */}
              <div className="p-4 border-b bg-white">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search for a location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Current Location Button */}
              <div className="p-4 border-b bg-white">
                <Button
                  variant="outline"
                  onClick={handleCurrentLocation}
                  className="w-full justify-start bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Use Current Location
                </Button>
              </div>

              {/* Location List */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-2">
                  <h3 className="text-sm font-medium text-gray-700 mb-2 px-2">Nearby Places</h3>
                  {nearbyPlaces
                    .filter((place) => place.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((place, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-200 mb-2 ${
                          selectedLocation?.name === place.name
                            ? "bg-blue-100 border-2 border-blue-300"
                            : "bg-white hover:bg-gray-50 border border-gray-200"
                        }`}
                        onClick={() => handleLocationClick(place)}
                      >
                        <div className="flex items-start space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              selectedLocation?.name === place.name ? "bg-blue-600" : "bg-gray-400"
                            }`}
                          >
                            <MapPin className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">{place.name}</p>
                            <p className="text-sm text-gray-600 truncate">{place.address}</p>
                            <Badge variant="secondary" className="mt-1 text-xs">
                              {place.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Confirm Button */}
              <div className="p-4 border-t bg-white">
                <Button
                  onClick={handleConfirmLocation}
                  disabled={!selectedLocation}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Confirm Location
                </Button>
                {selectedLocation && (
                  <p className="text-xs text-gray-600 mt-2 text-center">Selected: {selectedLocation.name}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
