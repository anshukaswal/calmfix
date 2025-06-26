"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Phone, User, Settings, Star, Shield, Clock, Sparkles, Zap } from "lucide-react"
import AccountPage from "@/components/account-page"
import SettingsPage from "@/components/settings-page"
import MapLocationPicker from "@/components/map-location-picker"
import AuthModal from "@/components/auth-modal"
import PremiumServiceCard from "@/components/premium-service-card"
import QuickBookingModal from "@/components/quick-booking-modal"

export default function CalmFixApp() {
  const [currentPage, setCurrentPage] = useState<"home" | "account" | "settings">("home")
  const [user, setUser] = useState<any>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showMapPicker, setShowMapPicker] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [services, setServices] = useState<any[]>([])
  const [selectedService, setSelectedService] = useState<any>(null)
  const [showQuickBooking, setShowQuickBooking] = useState(false)
  const [isEmergencyBooking, setIsEmergencyBooking] = useState(false)
  const [currentBooking, setCurrentBooking] = useState<any>(null)

  // Load services from API
  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data.services))
      .catch((err) => console.error("Failed to load services:", err))
  }, [])

  const handleQuickBook = async (serviceId: string, isEmergency = false) => {
    const service = services.find((s) => s.id === serviceId)
    if (service) {
      setSelectedService(service)
      setIsEmergencyBooking(isEmergency)
      setShowQuickBooking(true)
    }
  }

  const handleBookingConfirm = (booking: any) => {
    setCurrentBooking(booking)
    setShowQuickBooking(false)
    console.log("Booking confirmed:", booking)
  }

  if (currentPage === "account") {
    return <AccountPage onNavigate={setCurrentPage} />
  }

  if (currentPage === "settings") {
    return <SettingsPage onNavigate={setCurrentPage} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Premium Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    CalmFix
                  </span>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-700 text-xs border-green-200">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Premium Service
                    </Badge>
                    <Badge className="bg-red-100 text-red-700 text-xs border-red-200 animate-pulse">
                      24/7 Emergency
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact - Premium Design */}
            <div className="flex items-center space-x-3">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-gray-700">Emergency Hotline</p>
                <p className="text-lg font-bold text-red-600">(555) 123-4567</p>
              </div>
              <Button
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium px-6 py-3 shadow-lg"
                onClick={() => window.open("tel:+15551234567")}
              >
                <Phone className="w-4 h-4 mr-2" />
                Emergency Call
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex items-center justify-between">
            {/* Left Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Button
                variant={currentPage === "home" ? "default" : "ghost"}
                onClick={() => setCurrentPage("home")}
                className={
                  currentPage === "home" ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:text-blue-600"
                }
              >
                Home
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
                Services
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
                How It Works
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
                Reviews
              </Button>
            </div>

            {/* Right Side - Account Options */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  {/* User Info */}
                  <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full px-4 py-2 border border-blue-200">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user.name} />
                      <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                        {user.name
                          ?.split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-700">{user.name}</p>
                      <p className="text-xs text-gray-500">Premium Member</p>
                    </div>
                  </div>

                  {/* Account & Settings */}
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage("account")}
                    className="bg-white border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Account
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage("settings")}
                    className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowAuthModal(true)}
                    className="bg-white border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Account
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage("settings")}
                    className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>

                  <Button
                    onClick={() => setShowAuthModal(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg"
                  >
                    Sign In
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-3 pt-4">
                <Button
                  variant={currentPage === "home" ? "default" : "ghost"}
                  onClick={() => {
                    setCurrentPage("home")
                    setShowMobileMenu(false)
                  }}
                  className="justify-start"
                >
                  Home
                </Button>

                {user ? (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setCurrentPage("account")
                        setShowMobileMenu(false)
                      }}
                      className="justify-start"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Account
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setCurrentPage("settings")
                        setShowMobileMenu(false)
                      }}
                      className="justify-start"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setShowAuthModal(true)
                        setShowMobileMenu(false)
                      }}
                      className="justify-start"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Account
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setCurrentPage("settings")
                        setShowMobileMenu(false)
                      }}
                      className="justify-start"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                    <Button
                      onClick={() => {
                        setShowAuthModal(true)
                        setShowMobileMenu(false)
                      }}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white justify-start"
                    >
                      Sign In
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Premium Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center bg-white/90 backdrop-blur-sm border border-blue-200 rounded-full px-6 py-3 mb-8 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white"
                    ></div>
                  ))}
                </div>
                <div className="text-left ml-3">
                  <p className="text-sm font-semibold text-gray-800">Trusted by 50,000+ homeowners</p>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm text-gray-600">4.9/5 average rating</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="text-gray-800">Home emergencies?</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Stay calm. We've got you.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-4xl mx-auto">
              Premium home services at your fingertips. Connect with verified professionals in minutes. Real-time
              tracking, transparent pricing, and a stress-free experience when you need it most.
            </p>

            {/* Enhanced Trust Indicators */}
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              {[
                {
                  icon: Shield,
                  title: "Verified Pros",
                  subtitle: "Background checked",
                  color: "from-green-500 to-emerald-500",
                },
                { icon: Clock, title: "5-Min Booking", subtitle: "Lightning fast", color: "from-blue-500 to-cyan-500" },
                { icon: Star, title: "4.9+ Rating", subtitle: "Highly rated", color: "from-yellow-500 to-orange-500" },
                { icon: Zap, title: "24/7 Emergency", subtitle: "Always available", color: "from-red-500 to-pink-500" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mb-4 mx-auto`}
                  >
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Services Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Premium Home Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              One-click booking for all your home service needs. No location selection required - we'll find the best
              professionals near you automatically.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <PremiumServiceCard
                key={service.id}
                service={service}
                onQuickBook={handleQuickBook}
                featured={index < 2} // Mark first two as featured
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center text-white">
              {[
                { number: "50K+", label: "Happy Customers", icon: Heart },
                { number: "2,500+", label: "Verified Professionals", icon: Shield },
                { number: "98%", label: "Same-Day Service", icon: Clock },
                { number: "4.9/5", label: "Average Rating", icon: Star },
              ].map((stat, index) => (
                <div key={index} className="group">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Floating Emergency Button - Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden z-40">
        <Button
          className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-2xl animate-pulse"
          onClick={() => window.open("tel:+15551234567")}
        >
          <Phone className="w-6 h-6" />
        </Button>
      </div>

      {/* Modals */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLogin={(userData) => {
            setUser(userData)
            setShowAuthModal(false)
          }}
        />
      )}

      {showMapPicker && (
        <MapLocationPicker
          onLocationSelect={(selectedLocation) => {
            setShowMapPicker(false)
          }}
          onClose={() => setShowMapPicker(false)}
        />
      )}

      {showQuickBooking && selectedService && (
        <QuickBookingModal
          service={selectedService}
          isEmergency={isEmergencyBooking}
          onClose={() => setShowQuickBooking(false)}
          onConfirm={handleBookingConfirm}
        />
      )}
    </div>
  )
}
