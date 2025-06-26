"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Send, Camera, Clock, CheckCircle2, Heart, Phone } from "lucide-react"

interface Message {
  id: string
  sender: "user" | "professional" | "system"
  content: string
  timestamp: string
  type: "text" | "image" | "system"
  imageUrl?: string
  status?: "sent" | "delivered" | "read"
}

interface ChatInterfaceProps {
  selectedPro: any
  onBack: () => void
}

export default function ChatInterface({ selectedPro, onBack }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "system",
      content: "Chat started with " + selectedPro.name,
      timestamp: "2:34 PM",
      type: "system",
    },
    {
      id: "2",
      sender: "professional",
      content:
        "Hi! I'm Mike, your plumber for today. I've received your booking and I'm getting ready to head your way. Should be there in about 15-20 minutes.",
      timestamp: "2:35 PM",
      type: "text",
      status: "read",
    },
    {
      id: "3",
      sender: "user",
      content: "Great! Thank you for the update. The main issue is with the kitchen sink - it's completely blocked.",
      timestamp: "2:36 PM",
      type: "text",
      status: "read",
    },
    {
      id: "4",
      sender: "professional",
      content:
        "Perfect, I have all the tools needed for sink blockages. I'll text you when I'm 5 minutes away. Is there parking available near your building?",
      timestamp: "2:37 PM",
      type: "text",
      status: "read",
    },
    {
      id: "5",
      sender: "user",
      content: "Yes, there's street parking right in front. I'll keep an eye out for you.",
      timestamp: "2:38 PM",
      type: "text",
      status: "read",
    },
    {
      id: "6",
      sender: "professional",
      content: "I'm about 5 minutes away now! Just turned onto your street.",
      timestamp: "3:05 PM",
      type: "text",
      status: "delivered",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickReplies = ["Thank you!", "Sounds good", "How long will it take?", "What's the cost?", "I'm here"]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "text",
      status: "sent",
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate professional typing and response
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const responses = [
        "Got it! I'll take care of that right away.",
        "Thanks for letting me know. I'm prepared for that.",
        "Perfect! I'll be there shortly.",
        "Understood. I have the right tools for this job.",
      ]
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: "professional",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "text",
        status: "sent",
      }
      setMessages((prev) => [...prev, response])
    }, 2000)
  }

  const sendQuickReply = (reply: string) => {
    const message: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "text",
      status: "sent",
    }
    setMessages([...messages, message])
  }

  const simulatePhotoMessage = () => {
    const photoMessage: Message = {
      id: Date.now().toString(),
      sender: "professional",
      content: "Here's the issue I found. The blockage is more extensive than expected, but I can fix it today.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "image",
      imageUrl: "/placeholder.svg?height=200&width=300",
      status: "sent",
    }
    setMessages([...messages, photoMessage])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <Avatar className="w-10 h-10">
                <AvatarImage src={selectedPro.image || "/placeholder.svg"} alt={selectedPro.name} />
                <AvatarFallback>
                  {selectedPro.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-gray-800">{selectedPro.name}</h2>
                <p className="text-sm text-green-600 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Online • En Route
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="bg-white/50">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 container mx-auto px-4 py-4 max-w-2xl">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id}>
                {message.type === "system" ? (
                  <div className="text-center">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                      {message.content}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                  </div>
                ) : (
                  <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white rounded-l-2xl rounded-tr-2xl rounded-br-md"
                          : "bg-white border border-gray-200 text-gray-800 rounded-r-2xl rounded-tl-2xl rounded-bl-md"
                      } p-3 shadow-sm`}
                    >
                      {message.type === "image" && message.imageUrl && (
                        <div className="mb-2">
                          <img
                            src={message.imageUrl || "/placeholder.svg"}
                            alt="Shared image"
                            className="rounded-lg max-w-full h-auto"
                          />
                        </div>
                      )}
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <div
                        className={`flex items-center justify-between mt-2 text-xs ${
                          message.sender === "user" ? "text-blue-100" : "text-gray-500"
                        }`}
                      >
                        <span>{message.timestamp}</span>
                        {message.sender === "user" && message.status && (
                          <div className="flex items-center space-x-1">
                            {message.status === "sent" && <Clock className="w-3 h-3" />}
                            {message.status === "delivered" && <CheckCircle2 className="w-3 h-3" />}
                            {message.status === "read" && (
                              <div className="flex">
                                <CheckCircle2 className="w-3 h-3" />
                                <CheckCircle2 className="w-3 h-3 -ml-1" />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-r-2xl rounded-tl-2xl rounded-bl-md p-3 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Quick Replies */}
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
          {quickReplies.map((reply, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => sendQuickReply(reply)}
              className="whitespace-nowrap bg-white/70 border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              {reply}
            </Button>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white/90 backdrop-blur-sm border-t border-blue-100 p-4">
        <div className="container mx-auto max-w-2xl">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={simulatePhotoMessage}
              className="bg-white/70 border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <Camera className="w-4 h-4" />
            </Button>
            <div className="flex-1 relative">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="pr-12 border-blue-200 focus:border-blue-400 bg-white/70"
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button
                size="sm"
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="absolute right-1 top-1 h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Calming Footer Message */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border-t border-blue-100 p-3">
        <div className="container mx-auto max-w-2xl text-center">
          <p className="text-sm text-gray-600 flex items-center justify-center">
            <Heart className="w-4 h-4 text-blue-600 mr-2" />
            Stay relaxed - {selectedPro.name} is here to help
          </p>
        </div>
      </div>
    </div>
  )
}
