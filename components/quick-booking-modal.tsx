"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, MapPin, AlertTriangle, CheckCircle, Phone, MessageCircle, CreditCard, ArrowRight } from "lucide-react"

interface QuickBookingModalProps {
  service: any
  isEmergency: boolean
  onClose: () => void
  onConfirm: (bookingData: any) => void
}

export default function QuickBookingModal({ service, isEmergency, onClose, onConfirm }: QuickBookingModalProps) {
  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    location: "",
    description: "",
    contactMethod: "phone",
    urgency: isEmergency ? "emergency" : "standard",
  })

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleConfirm = async () => {
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceType: service.id,
          ...bookingData,
          userId: "user-123", // In production, get from auth
        }),
      })

      const result = await response.json()
      onConfirm(result.booking)
    } catch (error) {
      console.error("Booking failed:", error)
    }
  }

  const estimatedPrice = isEmergency ? service.emergencyPrice : service.basePrice

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white shadow-2xl border-0 max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-4 top-4 text-white hover:bg-white/20"
          >
            <X className="w-4 h-4" />
          </Button>

          <div className="flex items-center space-x-3">
            {isEmergency && (
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
            )}
            <div>
              <CardTitle className="text-2xl">
                {isEmergency ? "Emergency " : ""}
                {service.name} Service
              </CardTitle>
              <p className="text-blue-100">{isEmergency ? "Priority booking - faster response" : "Standard booking"}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2 mt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    i <= step ? "bg-white text-blue-600" : "bg-blue-400 text-white"
                  }`}
                >
                  {i < step ? <CheckCircle className="w-4 h-4" /> : i}
                </div>
                {i < 3 && <div className={`w-8 h-1 ${i < step ? "bg-white" : "bg-blue-400"}`} />}
              </div>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Service Details</h3>

                {/* Service Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Service Type:</span>
                    <Badge className="bg-blue-100 text-blue-700">{service.name}</Badge>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Response Time:</span>
                    <span className="text-green-600 font-medium">{service.avgResponseTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Estimated Cost:</span>
                    <span className="text-2xl font-bold text-gray-800">${estimatedPrice}/hour</span>
                  </div>
                </div>

                {/* Location Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Location *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Enter your address"
                      value={bookingData.location}
                      onChange={(e) => setBookingData({ ...bookingData, location: e.target.value })}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                {/* Problem Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Describe the Issue</label>
                  <Textarea
                    placeholder="Please describe what needs to be fixed..."
                    value={bookingData.description}
                    onChange={(e) => setBookingData({ ...bookingData, description: e.target.value })}
                    rows={4}
                  />
                </div>
              </div>

              <Button
                onClick={handleNext}
                disabled={!bookingData.location}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                Continue to Contact Preferences
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Contact Preferences</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    How would you like the professional to contact you?
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="contact"
                        value="phone"
                        checked={bookingData.contactMethod === "phone"}
                        onChange={(e) => setBookingData({ ...bookingData, contactMethod: e.target.value })}
                        className="text-blue-600"
                      />
                      <Phone className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium">Phone Call</p>
                        <p className="text-sm text-gray-600">Direct call when arriving</p>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="contact"
                        value="chat"
                        checked={bookingData.contactMethod === "chat"}
                        onChange={(e) => setBookingData({ ...bookingData, contactMethod: e.target.value })}
                        className="text-blue-600"
                      />
                      <MessageCircle className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium">In-App Chat</p>
                        <p className="text-sm text-gray-600">Message through the app</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleNext} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  Review Booking
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Confirm Your Booking</h3>

              {/* Booking Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Service:</span>
                    <span>{service.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Location:</span>
                    <span className="text-right max-w-xs">{bookingData.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Priority:</span>
                    <Badge className={isEmergency ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}>
                      {isEmergency ? "Emergency" : "Standard"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Estimated Cost:</span>
                    <span className="text-xl font-bold">${estimatedPrice}/hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Response Time:</span>
                    <span className="text-green-600 font-medium">{service.avgResponseTime}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Payment Method</p>
                    <p className="text-sm text-gray-600">•••• •••• •••• 4242 (Visa)</p>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                <p>
                  By confirming this booking, you agree to our Terms of Service and Privacy Policy. You will be charged
                  only for the actual time worked. A professional will contact you within the estimated response time.
                </p>
              </div>

              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Back
                </Button>
                <Button
                  onClick={handleConfirm}
                  className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
