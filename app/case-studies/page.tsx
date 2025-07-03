"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Environment } from "@react-three/drei"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Suspense } from "react"
import { ArrowRight, TrendingUp, Users, DollarSign, Clock } from "lucide-react"
import Link from "next/link"

function FloatingDataElements() {
  return (
    <group>
      {Array.from({ length: 25 }).map((_, i) => (
        <Float key={i} speed={1.2 + Math.random()} rotationIntensity={0.6} floatIntensity={1.8}>
          <mesh position={[(Math.random() - 0.5) * 35, (Math.random() - 0.5) * 28, (Math.random() - 0.5) * 18]}>
            <octahedronGeometry args={[0.12]} />
            <meshStandardMaterial color="#000000" transparent opacity={0.3} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      title: "E-commerce Giant Transformation",
      industry: "E-commerce",
      challenge: "Low conversion rates and high customer acquisition costs",
      solution: "AI-powered personalization engine and voice agents for customer support",
      results: [
        { metric: "Conversion Rate", value: "+340%", icon: TrendingUp },
        { metric: "Customer Satisfaction", value: "98%", icon: Users },
        { metric: "Revenue Growth", value: "+$2.5M", icon: DollarSign },
        { metric: "Response Time", value: "<30s", icon: Clock },
      ],
      description:
        "Implemented comprehensive AI solution including personalized product recommendations, automated customer service, and predictive analytics.",
    },
    {
      title: "SaaS Startup Success",
      industry: "Technology",
      challenge: "Struggling to scale lead generation and qualify prospects effectively",
      solution: "AI chatbots, voice agents, and automated lead scoring system",
      results: [
        { metric: "Lead Quality", value: "+280%", icon: TrendingUp },
        { metric: "Sales Cycle", value: "-45%", icon: Clock },
        { metric: "Revenue", value: "+$1.8M", icon: DollarSign },
        { metric: "Team Efficiency", value: "+150%", icon: Users },
      ],
      description:
        "Deployed intelligent lead qualification system with AI-powered chatbots and voice agents to automate the entire sales funnel.",
    },
    {
      title: "Healthcare Provider Innovation",
      industry: "Healthcare",
      challenge: "Manual appointment scheduling and patient communication inefficiencies",
      solution: "AI voice agents for appointment scheduling and patient follow-ups",
      results: [
        { metric: "Appointment Bookings", value: "+220%", icon: TrendingUp },
        { metric: "Patient Satisfaction", value: "96%", icon: Users },
        { metric: "Cost Savings", value: "$500K", icon: DollarSign },
        { metric: "Response Time", value: "24/7", icon: Clock },
      ],
      description:
        "Revolutionized patient communication with AI voice agents handling appointment scheduling, reminders, and follow-up care.",
    },
  ]

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0 z-0 opacity-15">
        <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
          <Suspense fallback={null}>
            <Environment preset="studio" />
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={0.7} />
            <FloatingDataElements />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content with proper z-index */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="h-96 flex items-center justify-center">
          <div className="text-center px-4">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">Case Studies</h1>
              <p className="text-xl text-gray-600">Real results from businesses transformed by our AI solutions</p>
            </motion.div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Badge variant="secondary" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full mb-6">
                Success Stories
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Transforming Businesses with AI</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover how our AI-powered marketing solutions have helped companies achieve remarkable growth and
                efficiency
              </p>
            </motion.div>

            <div className="space-y-16">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                    <CardContent className="p-8 lg:p-12">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                          <Badge variant="outline" className="mb-4">
                            {study.industry}
                          </Badge>
                          <h3 className="text-3xl font-bold text-black mb-4">{study.title}</h3>
                          <div className="space-y-4 mb-6">
                            <div>
                              <h4 className="font-semibold text-black mb-2">Challenge:</h4>
                              <p className="text-gray-600">{study.challenge}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-black mb-2">Solution:</h4>
                              <p className="text-gray-600">{study.solution}</p>
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{study.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          {study.results.map((result, resultIndex) => (
                            <motion.div
                              key={resultIndex}
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.4, delay: resultIndex * 0.1 }}
                              className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors"
                            >
                              <div className="inline-flex items-center justify-center w-12 h-12 bg-black rounded-xl mb-4">
                                <result.icon className="h-6 w-6 text-white" />
                              </div>
                              <div className="text-2xl font-bold text-black mb-2">{result.value}</div>
                              <div className="text-gray-600 text-sm font-medium">{result.metric}</div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
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
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Be Our Next Success Story?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Join the companies that have transformed their marketing with our AI solutions
              </p>
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 px-12 py-6 text-xl font-semibold rounded-full"
              >
                <Link href="/contact" className="flex items-center">
                  Start Your Transformation <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
