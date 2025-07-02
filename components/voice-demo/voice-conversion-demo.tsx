"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Volume2, Mic, Loader2, RefreshCw, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const VOICE_SAMPLES = [
  { id: "professional", name: "Professional", description: "Clear and authoritative" },
  { id: "friendly", name: "Friendly", description: "Warm and approachable" },
  { id: "energetic", name: "Energetic", description: "Dynamic and enthusiastic" },
  { id: "calm", name: "Calm", description: "Soothing and reassuring" },
]

const DEMO_TEXTS = [
  "Welcome to AI Marketing Partners. We're revolutionizing digital marketing with artificial intelligence.",
  "Our AI-powered tools can increase your conversion rates by up to 300% in just 30 days.",
  "Schedule a free consultation today to see how our solutions can transform your business.",
  "Analyze your marketing data in real-time with our advanced AI analytics platform.",
]

export default function VoiceConversionDemo() {
  const [selectedVoice, setSelectedVoice] = useState(VOICE_SAMPLES[0].id)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [hasRecorded, setHasRecorded] = useState(false)
  const [volume, setVolume] = useState(80)
  const [selectedText, setSelectedText] = useState(DEMO_TEXTS[0])
  const [activeTab, setActiveTab] = useState("demo")
  const audioRef = useRef<HTMLAudioElement>(null)

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.volume = volume / 100
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  const handleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false)
      setIsConverting(true)

      // Simulate conversion process
      setTimeout(() => {
        setIsConverting(false)
        setHasRecorded(true)
      }, 2000)
    } else {
      // Start recording
      setIsRecording(true)
      setHasRecorded(false)
    }
  }

  const resetRecording = () => {
    setHasRecorded(false)
    setIsRecording(false)
    setIsConverting(false)
  }

  const visualizerBars = Array.from({ length: 30 }, (_, i) => i)

  return (
    <Card className="bg-white border-gray-200 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-black mb-2">Eleven Labs Voice AI</h3>
            <p className="text-gray-600">Experience our premium AI voice conversion technology</p>
          </div>
          <span className="text-sm text-gray-500">Powered by Eleven Labs</span>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6 bg-gray-100">
            <TabsTrigger value="demo">Voice Demo</TabsTrigger>
            <TabsTrigger value="convert">Voice Conversion</TabsTrigger>
          </TabsList>

          <TabsContent value="demo" className="mt-0">
            <div className="space-y-6">
              {/* Voice Selection */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {VOICE_SAMPLES.map((voice) => (
                  <Button
                    key={voice.id}
                    variant={selectedVoice === voice.id ? "default" : "outline"}
                    className={`h-auto flex flex-col items-center justify-center py-3 ${
                      selectedVoice === voice.id
                        ? "bg-black text-white border-transparent"
                        : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedVoice(voice.id)}
                  >
                    <Volume2 className="h-5 w-5 mb-2" />
                    <span className="font-medium">{voice.name}</span>
                    <span className="text-xs text-gray-400 mt-1">{voice.description}</span>
                  </Button>
                ))}
              </div>

              {/* Text Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Sample Text</label>
                <div className="grid grid-cols-1 gap-2">
                  {DEMO_TEXTS.map((text, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg cursor-pointer border ${
                        selectedText === text
                          ? "bg-gray-100 border-gray-300"
                          : "bg-white border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedText(text)}
                    >
                      <p className="text-sm text-gray-700">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Audio Player */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center gap-4">
                  <Button
                    size="icon"
                    className={`h-12 w-12 rounded-full ${
                      isPlaying ? "bg-gray-800 hover:bg-gray-700" : "bg-black hover:bg-gray-800"
                    }`}
                    onClick={handlePlayPause}
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </Button>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Volume2 className="h-4 w-4 text-gray-500" />
                      <Slider
                        value={[volume]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={handleVolumeChange}
                        className="flex-1"
                      />
                      <span className="text-xs text-gray-500 w-8">{volume}%</span>
                    </div>

                    <div className="h-8 flex items-center">
                      {isPlaying && (
                        <div className="w-full flex items-end justify-between h-full gap-[2px]">
                          {visualizerBars.map((i) => {
                            const height = Math.random() * 100
                            return (
                              <motion.div
                                key={i}
                                className="bg-black w-full rounded-sm"
                                initial={{ height: "10%" }}
                                animate={{ height: `${height}%` }}
                                transition={{
                                  duration: 0.4,
                                  repeat: Number.POSITIVE_INFINITY,
                                  repeatType: "reverse",
                                  ease: "easeInOut",
                                  delay: i * 0.01,
                                }}
                              />
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="convert" className="mt-0">
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center">
                {!hasRecorded && !isConverting && !isRecording && (
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                      <Mic className="h-8 w-8 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-black">Record Your Voice</h4>
                      <p className="text-gray-600 text-sm mt-1 mb-4">Speak clearly for 5-10 seconds for best results</p>
                      <Button className="bg-black hover:bg-gray-800 text-white" onClick={handleRecording}>
                        Start Recording
                      </Button>
                    </div>
                  </div>
                )}

                {isRecording && (
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 rounded-full bg-red-50 border-2 border-red-500 flex items-center justify-center animate-pulse">
                      <Mic className="h-8 w-8 text-red-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-black">Recording...</h4>
                      <p className="text-gray-600 text-sm mt-1 mb-4">Speak now</p>

                      <div className="h-12 flex items-center justify-center mb-4">
                        <div className="w-3/4 flex items-end justify-between h-full gap-[2px]">
                          {visualizerBars.slice(0, 20).map((i) => {
                            const height = Math.random() * 100
                            return (
                              <motion.div
                                key={i}
                                className="bg-red-500 w-full rounded-sm"
                                initial={{ height: "10%" }}
                                animate={{ height: `${height}%` }}
                                transition={{
                                  duration: 0.3,
                                  repeat: Number.POSITIVE_INFINITY,
                                  repeatType: "reverse",
                                  ease: "easeInOut",
                                  delay: i * 0.02,
                                }}
                              />
                            )
                          })}
                        </div>
                      </div>

                      <Button variant="destructive" onClick={handleRecording}>
                        Stop Recording
                      </Button>
                    </div>
                  </div>
                )}

                {isConverting && (
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center">
                      <Loader2 className="h-8 w-8 text-gray-500 animate-spin" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-black">Converting Voice</h4>
                      <p className="text-gray-600 text-sm mt-1">Our AI is processing your voice sample...</p>
                    </div>
                  </div>
                )}

                {hasRecorded && !isConverting && (
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 rounded-full bg-green-50 border-2 border-green-500 flex items-center justify-center">
                      <Check className="h-8 w-8 text-green-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-black">Voice Converted!</h4>
                      <p className="text-gray-600 text-sm mt-1 mb-4">Your voice has been successfully converted</p>

                      <div className="flex justify-center gap-3">
                        <Button className="bg-black hover:bg-gray-800 text-white" onClick={handlePlayPause}>
                          {isPlaying ? (
                            <>
                              <Pause className="h-4 w-4 mr-2" /> Pause
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-2" /> Play Converted Voice
                            </>
                          )}
                        </Button>
                        <Button variant="outline" onClick={resetRecording}>
                          <RefreshCw className="h-4 w-4 mr-2" /> Try Again
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {hasRecorded && (
                <div className="space-y-3">
                  <h4 className="text-lg font-medium text-black">Voice Styles</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {VOICE_SAMPLES.map((voice) => (
                      <Button
                        key={voice.id}
                        variant={selectedVoice === voice.id ? "default" : "outline"}
                        className={`h-auto flex flex-col items-center justify-center py-3 ${
                          selectedVoice === voice.id
                            ? "bg-black text-white border-transparent"
                            : "bg-white border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedVoice(voice.id)}
                      >
                        <Volume2 className="h-5 w-5 mb-2" />
                        <span className="font-medium">{voice.name}</span>
                        <span className="text-xs text-gray-400 mt-1">{voice.description}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Audio element for demo playback */}
        <audio ref={audioRef} className="hidden">
          <source src="/placeholder-audio.mp3" type="audio/mpeg" />
        </audio>
      </CardContent>
    </Card>
  )
}
