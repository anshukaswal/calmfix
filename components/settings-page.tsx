"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import {
  Heart,
  Phone,
  Settings,
  Bell,
  Shield,
  CreditCard,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
  Volume2,
  MapPin,
  User,
} from "lucide-react"

interface SettingsPageProps {
  onNavigate: (page: "home" | "account" | "settings") => void
}

export default function SettingsPage({ onNavigate }: SettingsPageProps) {
  const [settings, setSettings] = useState({
    notifications: {
      push: true,
      email: true,
      sms: false,
      jobUpdates: true,
      promotions: false,
    },
    preferences: {
      darkMode: false,
      soundEffects: true,
      autoLocation: true,
      emergencyMode: false,
    },
    privacy: {
      shareLocation: true,
      profileVisible: false,
      dataCollection: true,
    },
  })

  const [user, setUser] = useState(null) // Example user state

  const updateSetting = (category: keyof typeof settings, key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }))
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
            {/* Show Account button based on login status */}
            <Button variant="ghost" onClick={() => onNavigate("account")} className="text-gray-600 hover:text-blue-600">
              Account
            </Button>
            <Button variant="default" className="bg-blue-600 text-white">
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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
            <p className="text-gray-600">Customize your CalmFix experience</p>
          </div>

          {/* Add this after the page title and before the main content */}
          {!user && (
            <Card className="mb-8 bg-blue-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Sign in for personalized settings</h3>
                <p className="text-gray-600 mb-4">Create an account to save your preferences and access all features</p>
                <Button
                  onClick={() => {
                    /* Add sign in logic */
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Sign In / Create Account
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Settings Menu */}
            <div className="lg:col-span-1">
              <Card className="bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-blue-600" />
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start bg-blue-50 text-blue-700">
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-gray-50">
                    <Heart className="w-4 h-4 mr-2" />
                    Preferences
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-gray-50">
                    <Shield className="w-4 h-4 mr-2" />
                    Privacy & Security
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-gray-50">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Payment & Billing
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-gray-50">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Help & Support
                  </Button>
                </CardContent>
              </Card>

              {/* Emergency Settings */}
              <Card className="mt-6 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-700 text-lg">Emergency Mode</CardTitle>
                  <CardDescription className="text-red-600">Quick access for urgent situations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-red-700">Enable Emergency Mode</span>
                    <Switch
                      checked={settings.preferences.emergencyMode}
                      onCheckedChange={(checked) => updateSetting("preferences", "emergencyMode", checked)}
                    />
                  </div>
                  <p className="text-xs text-red-600 mt-2">Bypasses normal booking flow for immediate help</p>
                </CardContent>
              </Card>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Notifications */}
              <Card className="bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2 text-blue-600" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Choose how you want to be notified</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Push Notifications</p>
                      <p className="text-sm text-gray-600">Receive notifications on your device</p>
                    </div>
                    <Switch
                      checked={settings.notifications.push}
                      onCheckedChange={(checked) => updateSetting("notifications", "push", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Email Notifications</p>
                      <p className="text-sm text-gray-600">Get updates via email</p>
                    </div>
                    <Switch
                      checked={settings.notifications.email}
                      onCheckedChange={(checked) => updateSetting("notifications", "email", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">SMS Notifications</p>
                      <p className="text-sm text-gray-600">Receive text message updates</p>
                    </div>
                    <Switch
                      checked={settings.notifications.sms}
                      onCheckedChange={(checked) => updateSetting("notifications", "sms", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Job Status Updates</p>
                      <p className="text-sm text-gray-600">Real-time updates about your service</p>
                    </div>
                    <Switch
                      checked={settings.notifications.jobUpdates}
                      onCheckedChange={(checked) => updateSetting("notifications", "jobUpdates", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Promotions & Offers</p>
                      <p className="text-sm text-gray-600">Special deals and discounts</p>
                    </div>
                    <Switch
                      checked={settings.notifications.promotions}
                      onCheckedChange={(checked) => updateSetting("notifications", "promotions", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* App Preferences */}
              <Card className="bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-blue-600" />
                    App Preferences
                  </CardTitle>
                  <CardDescription>Customize your app experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex items-center mr-3">
                        {settings.preferences.darkMode ? (
                          <Moon className="w-4 h-4 text-gray-600" />
                        ) : (
                          <Sun className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Dark Mode</p>
                        <p className="text-sm text-gray-600">Switch to dark theme</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.preferences.darkMode}
                      onCheckedChange={(checked) => updateSetting("preferences", "darkMode", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Volume2 className="w-4 h-4 text-gray-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-800">Sound Effects</p>
                        <p className="text-sm text-gray-600">Play calming notification sounds</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.preferences.soundEffects}
                      onCheckedChange={(checked) => updateSetting("preferences", "soundEffects", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-800">Auto-detect Location</p>
                        <p className="text-sm text-gray-600">Automatically find nearby professionals</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.preferences.autoLocation}
                      onCheckedChange={(checked) => updateSetting("preferences", "autoLocation", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Privacy & Security */}
              <Card className="bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-blue-600" />
                    Privacy & Security
                  </CardTitle>
                  <CardDescription>Control your data and privacy settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Share Location with Professionals</p>
                      <p className="text-sm text-gray-600">Allow pros to see your exact location</p>
                    </div>
                    <Switch
                      checked={settings.privacy.shareLocation}
                      onCheckedChange={(checked) => updateSetting("privacy", "shareLocation", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Public Profile</p>
                      <p className="text-sm text-gray-600">Make your profile visible to professionals</p>
                    </div>
                    <Switch
                      checked={settings.privacy.profileVisible}
                      onCheckedChange={(checked) => updateSetting("privacy", "profileVisible", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Data Collection</p>
                      <p className="text-sm text-gray-600">Help improve CalmFix with usage data</p>
                    </div>
                    <Switch
                      checked={settings.privacy.dataCollection}
                      onCheckedChange={(checked) => updateSetting("privacy", "dataCollection", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Account Actions */}
              <Card className="bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Account Actions</CardTitle>
                  <CardDescription>Manage your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-white/50">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Manage Payment Methods
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-white/50">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Help & Support
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
