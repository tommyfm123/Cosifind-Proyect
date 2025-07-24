"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { mockConversations, mockMessages } from "@/data/mockData"

export default function MessagesScreen() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState(mockMessages)

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

  if (selectedConversation !== null) {
    return (
      <div className="h-screen bg-white flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => setSelectedConversation(null)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <img
              src={mockConversations[selectedConversation].avatar || "/placeholder.svg"}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-medium">{mockConversations[selectedConversation].name}</h3>
              <p className="text-sm text-gray-500">En línea</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
        <div className="border-t p-4 pb-24">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
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
    <div className="min-h-screen bg-white">
      <div className="px-4 py-6 pb-24">
        <h1 className="text-2xl font-bold mb-6">Mensajes</h1>

        <div className="space-y-2">
          {mockConversations.map((conversation, index) => (
            <motion.div
              key={conversation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setSelectedConversation(index)}
            >
              <div className="flex items-center gap-3">
                <img src={conversation.avatar || "/placeholder.svg"} alt="" className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{conversation.name}</h3>
                    <span className="text-xs text-gray-500">{conversation.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
