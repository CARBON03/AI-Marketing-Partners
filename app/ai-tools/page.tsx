"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Environment } from "@react-three/drei"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Suspense } from "react"
import { MessageSquare, Volume2, Brain, ArrowRight } from "lucide-react"
import Link from "next/link"
import VoiceConversionDemo from "@/components/voice-demo/voice-conversion-demo"

function FloatingAIElements() {
  return (
    <group>
      {Array.from({ length: 10 }).map((_, i) => (
        <Float key={`bubble-${i}`} speed={2 + Math.random()} rotationIntensity={1} floatIntensity={1.5}>
          <mesh position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10]}>
            <sphereGeometry args={[0.5, 8, 8, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            <meshStandardMaterial color="#000000" transparent opacity={0.3} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export default function AIToolsPage() {
  const aiTools = [
    {
      icon: MessageSquare,
      title: "AI Chatbot",
      description:
        "Engage visitors 24/7 with our intelligent conversational AI. Our chatbots can answer questions, qualify leads, and guide users through your website.",
      features: [
        "Natural language understanding",
        "Contextual responses",
        "Lead qualification",
        "Seamless human handoff",
        "Multi-language support",
      ],
    },
    {
      icon: Volume2,
      title: "Voice AI Technology",
      description:
        "Transform any voice into professional, brand-aligned speech. Create consistent voice experiences across all customer touchpoints.",
      features: [
        "Voice synthesis technology",
        "Multiple voice styles",
        "Emotional tone control",
        "Multi-language support",
        "Real-time conversion",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0 z-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <Suspense fallback={null}>
            <Environment preset="studio" />
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
            <FloatingAIElements />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content with proper z-index */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="h-96 flex items-center justify-center">
          <div className="text-center px-4">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">Conversational AI Solutions</h1>
              <p className="text-xl text-gray-600">
                Engage your customers with intelligent chatbots and advanced voice technology
              </p>
            </motion.div>
          </div>
        </section>

        {/* AI Tools Overview */}
        <section className="py-20 px-4 bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {aiTools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="bg-white/90 backdrop-blur-sm border border-gray-200 h-full hover:shadow-xl transition-all duration-300 rounded-2xl">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-black rounded-xl mr-4">
                          <tool.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-semibold text-black">{tool.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-6">{tool.description}</p>
                      <ul className="space-y-2 mb-6">
                        {tool.features.map((feature, i) => (
                          <li key={i} className="text-sm text-gray-500 flex items-center">
                            <div className="w-1.5 h-1.5 bg-black rounded-full mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Voice Demo Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-black mb-4">Try Our Voice AI Technology</h3>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Experience the power of our AI voice conversion technology with this interactive demo
                </p>
              </div>
              <VoiceConversionDemo />
            </motion.div>
          </div>
        </section>

        {/* Integration Benefits */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                  Enhance Your Marketing with Conversational AI
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Our AI chatbots and voice technology integrate seamlessly with your existing marketing stack,
                  providing a consistent and engaging customer experience across all touchpoints.
                </p>
                <div className="space-y-6">
                  {[
                    "Increase engagement with natural conversations",
                    "Qualify leads 24/7 without human intervention",
                    "Create consistent brand voice across all channels",
                    "Reduce customer service costs by up to 70%",
                    "Gather valuable customer insights through AI interactions",
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center"
                    >
                      <div className="p-2 bg-black rounded-full mr-4">
                        <Brain className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-gray-600">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { metric: "Response Time", value: "<2 sec" },
                      { metric: "Accuracy Rate", value: "99.7%" },
                      { metric: "Cost Reduction", value: "65%" },
                      { metric: "Lead Quality", value: "+340%" },
                    ].map((item, index) => (
                      <div key={index} className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="text-2xl font-bold text-black mb-1">{item.value}</div>
                        <div className="text-gray-500 text-sm">{item.metric}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-black text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Customer Interactions?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Schedule a demo to see how our AI chatbots and voice technology can enhance your marketing strategy
              </p>
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 px-12 py-6 text-xl font-semibold rounded-full"
              >
                <Link href="/contact" className="flex items-center">
                  Schedule a Demo <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
