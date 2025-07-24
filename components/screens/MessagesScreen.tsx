"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { mockConversations, mockMessages } from "@/data/mockData"
import Footer from "@/components/common/Footer"

export default function MessagesScreen() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState(mockMessages)
  const [filter, setFilter] = useState("all")
  const [conversations, setConversations] = useState(mockConversations)

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, userMessage])
    setNewMessage("")

    // Simulate response
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: "¡Gracias por tu mensaje! Te responderé pronto.",
        sender: "other",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const filteredConversations = conversations.filter((conv) => {
    switch (filter) {
      case "unread":
        return conv.unread
      case "newest":
        return conv.time === "10:30" || conv.time === "09:15"
      case "oldest":
        return conv.time === "Ayer"
      default:
        return true
    }
  })

  if (selectedConversation !== null) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => setSelectedConversation(null)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <img
              src={conversations[selectedConversation].avatar || "/placeholder.svg"}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-medium">{conversations[selectedConversation].name}</h3>
              <p className="text-sm text-gray-500">En línea</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[60vh]">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl ${
                  message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                }`}
              >
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                  {message.timestamp}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Message Input */}
        <div className="border-t p-4 pb-32">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 bg-white"
            />
            <Button onClick={handleSendMessage} size="sm">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 sm:px-6 py-6 pb-32">
        <h1 className="text-2xl font-bold mb-4">Mensajes</h1>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
            Todos
          </Button>
          <Button variant={filter === "unread" ? "default" : "outline"} size="sm" onClick={() => setFilter("unread")}>
            No leídos
          </Button>
          <Button variant={filter === "newest" ? "default" : "outline"} size="sm" onClick={() => setFilter("newest")}>
            Nuevos
          </Button>
          <Button variant={filter === "oldest" ? "default" : "outline"} size="sm" onClick={() => setFilter("oldest")}>
            Antiguos
          </Button>
        </div>

        <div className="space-y-2">
          {filteredConversations.map((conversation, index) => (
            <motion.div
              key={conversation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-white border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setSelectedConversation(index)}
            >
              <div className="flex items-center gap-3">
                <img src={conversation.avatar || "/placeholder.svg"} alt="" className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{conversation.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{conversation.time}</span>
                      {conversation.unread && <Badge className="bg-blue-500 text-white">Nuevo</Badge>}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
