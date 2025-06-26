"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Phone, User, MapPin, Star, Clock, Shield, Edit, CreditCard, History, Bell } from "lucide-react"

interface AccountPageProps {
  onNavigate: (page: "home" | "account" | "settings") => void
}

export default function AccountPage({ onNavigate }: AccountPageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Downtown",
  })

  const recentJobs = [
    {
      id: "CF-2024-001",
      service: "Plumber",
      professional: "Mike Johnson",
      date: "Dec 15, 2024",
      status: "Completed",
      rating: 5,
      cost: "$150",
    },
    {
      id: "CF-2024-002",
      service: "Electrician",
      professional: "Sarah Chen",
      date: "Dec 10, 2024",
      status: "Completed",
      rating: 4,
      cost: "$220",
    },
    {
      id: "CF-2024-003",
      service: "Painter",
      professional: "Emily Watson",
      date: "Dec 5, 2024",
      status: "Completed",
      rating: 5,
      cost: "$180",
    },
  ]

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">CalmFix</span>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" onClick={() => onNavigate("home")} className="text-gray-600 hover:text-blue-600">
              Home
            </Button>
            <Button variant="default" className="bg-blue-600 text-white">
              Account
            </Button>
            <Button
              variant="ghost"
              onClick={() => onNavigate("settings")}
              className="text-gray-600 hover:text-blue-600"
            >
              Settings
            </Button>
          </div>

          <Button variant="outline" className="bg-white/50 border-blue-200 text-blue-700 hover:bg-blue-50">
            <Phone className="w-4 h-4 mr-2" />
            Emergency: (555) 123-4567
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">My Account</h1>
            <p className="text-gray-600">Manage your profile and view your service history</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Section */}
            <div className="lg:col-span-1">
              <Card className="bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <User className="w-5 h-5 mr-2 text-blue-600" />
                      Profile
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                      className="bg-white/50"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      {isEditing ? "Cancel" : "Edit"}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center mb-6">
                    <Avatar className="w-20 h-20 mx-auto mb-3">
                      <AvatarImage src="/placeholder.svg?height=80&width=80" alt={userInfo.name} />
                      <AvatarFallback className="text-lg">
                        {userInfo.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Badge className="bg-green-100 text-green-700">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified User
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Name</label>
                      {isEditing ? (
                        <Input
                          value={userInfo.name}
                          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-gray-800 mt-1">{userInfo.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      {isEditing ? (
                        <Input
                          value={userInfo.email}
                          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-gray-800 mt-1">{userInfo.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">Phone</label>
                      {isEditing ? (
                        <Input
                          value={userInfo.phone}
                          onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-gray-800 mt-1">{userInfo.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">Address</label>
                      {isEditing ? (
                        <Input
                          value={userInfo.address}
                          onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-gray-800 mt-1 flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-blue-600" />
                          {userInfo.address}
                        </p>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Save Changes
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="mt-6 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-white/50">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Payment Methods
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-white/50">
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-white/50">
                    <History className="w-4 h-4 mr-2" />
                    Service History
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Service History */}
            <div className="lg:col-span-2">
              <Card className="bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <History className="w-5 h-5 mr-2 text-blue-600" />
                    Recent Services
                  </CardTitle>
                  <CardDescription>Your recent CalmFix service history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentJobs.map((job) => (
                      <Card key={job.id} className="border border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                  {job.id}
                                </Badge>
                                <Badge className="bg-green-100 text-green-700">{job.status}</Badge>
                              </div>
                              <h4 className="font-semibold text-gray-800 mb-1">{job.service} Service</h4>
                              <p className="text-sm text-gray-600 mb-2">Professional: {job.professional}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {job.date}
                                </div>
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                                  {job.rating}/5
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-800">{job.cost}</div>
                              <Button variant="outline" size="sm" className="mt-2 bg-white/50">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-700">12</div>
                    <p className="text-sm text-blue-600">Total Services</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-700">4.8</div>
                    <p className="text-sm text-green-600">Avg Rating Given</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-700">$1,240</div>
                    <p className="text-sm text-purple-600">Total Saved</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
