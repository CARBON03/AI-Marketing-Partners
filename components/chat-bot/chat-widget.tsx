"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MessageSquare, X, Mic, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi there! I'm your AI marketing assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Mock function to simulate AI response
  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking
    setTimeout(async () => {
      const responses = [
        "I can help you optimize your marketing strategy with our AI tools. Would you like to know more about our services?",
        "Our AI voice agents can increase customer engagement by up to 300%. Would you like a demonstration?",
        "Based on your industry, our AI content creation tools could boost your conversion rates significantly.",
        "I'd recommend starting with our AI analytics platform to understand your current marketing performance.",
        "We have several case studies showing how our AI tools transformed businesses similar to yours.",
      ]

      const aiResponse: Message = {
        id: Date.now().toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleVoiceRecording = () => {
    setIsListening((prev) => !prev)

    // Simulate voice recording and transcription
    if (!isListening) {
      setTimeout(() => {
        setInput("How can AI improve my social media marketing?")
        setIsListening(false)
      }, 2000)
    }
  }

  return (
    <>
      {/* Chat button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-black rounded-full p-4 text-white shadow-lg hover:bg-gray-800 transition-all duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <>
              <MessageSquare className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-3 w-3 bg-green-500 rounded-full"></span>
            </>
          )}
        </motion.button>
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-20 right-6 w-[350px] sm:w-[400px] h-[500px] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-40"
          >
            {/* Header */}
            <div className="bg-black p-4">
              <div className="flex items-center">
                <div className="p-2 bg-white rounded-full mr-3">
                  <MessageSquare className="h-5 w-5 text-black" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI Marketing Assistant</h3>
                  <div className="flex items-center">
                    <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-xs text-gray-300">Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl p-4",
                      message.role === "user" ? "bg-black text-white" : "bg-white border border-gray-200",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {message.role === "assistant" && (
                        <Avatar className="h-8 w-8 bg-black">
                          <div className="text-xs font-bold text-white">AI</div>
                        </Avatar>
                      )}
                      <div className="space-y-2">
                        <p className={cn("text-sm", message.role === "user" ? "text-white" : "text-gray-800")}>
                          {message.content}
                        </p>
                        <span className="text-xs text-gray-500">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 max-w-[80%] rounded-2xl p-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 bg-black">
                        <div className="text-xs font-bold text-white">AI</div>
                      </Avatar>
                      <div className="flex space-x-1">
                        <div
                          className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-end gap-2">
                <div className="relative flex-1">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="min-h-[60px] max-h-[120px] bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-black resize-none pr-10"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className={cn(
                      "absolute right-2 bottom-2 h-6 w-6 text-gray-400 hover:text-black",
                      isListening && "text-red-500 animate-pulse",
                    )}
                    onClick={toggleVoiceRecording}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  className="bg-black hover:bg-gray-800 text-white"
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
