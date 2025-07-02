"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Environment } from "@react-three/drei"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Suspense } from "react"
import {
  Brain,
  Zap,
  Target,
  BarChart3,
  MessageSquare,
  Phone,
  Mail,
  Users,
  Search,
  PenTool,
  ArrowRight,
  CheckCircle,
  ShoppingCart,
} from "lucide-react"
import Link from "next/link"

function FloatingNetworkNodes() {
  return (
    <group>
      {Array.from({ length: 30 }).map((_, i) => (
        <Float key={i} speed={1 + Math.random()} rotationIntensity={0.5} floatIntensity={2}>
          <mesh position={[(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 30]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial color="#000000" transparent opacity={0.4} />
          </mesh>
        </Float>
      ))}
      {/* Connection lines */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Float key={`line-${i}`} speed={0.5 + Math.random()} rotationIntensity={0.2} floatIntensity={1}>
          <mesh
            position={[(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
          >
            <cylinderGeometry args={[0.01, 0.01, 5]} />
            <meshStandardMaterial color="#000000" transparent opacity={0.2} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export default function ServicesPage() {
  const coreServices = [
    {
      icon: Phone,
      title: "AI Voice Agents",
      description:
        "Automated phone call systems that handle customer inquiries, appointments, and sales calls with natural conversation flow.",
      features: ["24/7 Availability", "Natural Language Processing", "Call Analytics", "CRM Integration"],
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Solutions",
      description:
        "AI-powered e-commerce optimization including product recommendations, pricing strategies, and customer journey enhancement.",
      features: ["Product Recommendations", "Dynamic Pricing", "Customer Journey Mapping", "Conversion Optimization"],
    },
    {
      icon: Search,
      title: "Google & Meta Ads Expertise",
      description: "Advanced AI-driven advertising campaigns on Google and Meta platforms for maximum ROI.",
      features: ["Campaign Optimization", "Audience Targeting", "Bid Management", "Performance Analytics"],
    },
    {
      icon: MessageSquare,
      title: "AI Chatbots",
      description: "Intelligent conversational agents that engage visitors, answer questions, and convert leads 24/7.",
      features: ["Natural Conversations", "Multi-platform Support", "Lead Qualification", "Human Handoff"],
    },
    {
      icon: Brain,
      title: "AI Content Creation",
      description: "Fully automated content generation for blogs, social media, ads, and marketing materials.",
      features: ["Multi-format Content", "Brand Voice Matching", "SEO Optimization", "Bulk Generation"],
    },
    {
      icon: Users,
      title: "Lead Generation",
      description:
        "AI-powered lead identification and qualification system that finds and nurtures potential customers.",
      features: ["Prospect Identification", "Lead Scoring", "Automated Outreach", "Pipeline Management"],
    },
    {
      icon: PenTool,
      title: "Content Creation",
      description: "Data-driven content strategies that resonate with your target audience and drive engagement.",
      features: ["AI Content Generation", "Content Strategy", "Blog Writing", "Social Media Content"],
    },
    {
      icon: Target,
      title: "Social Media Management",
      description: "Automated campaigns optimized using AI to identify trends and audience preferences.",
      features: ["Campaign Automation", "Trend Analysis", "Audience Targeting", "Performance Optimization"],
    },
    {
      icon: BarChart3,
      title: "Data Analytics",
      description: "In-depth analytics and reporting with AI-powered actionable insights for better decision making.",
      features: ["Performance Tracking", "Predictive Analytics", "Custom Dashboards", "ROI Analysis"],
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description:
        "AI-powered email campaigns with advanced segmentation and personalization for higher conversion rates.",
      features: ["Audience Segmentation", "Personalization", "A/B Testing", "Automation Workflows"],
    },
    {
      icon: Zap,
      title: "Personalized Sales Agent",
      description:
        "AI-powered sales assistant that provides personalized recommendations and closes deals automatically.",
      features: ["Personalized Pitches", "Objection Handling", "Follow-up Automation", "Sales Analytics"],
    },
  ]

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Enhanced Background Animation */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <Suspense fallback={null}>
            <Environment preset="studio" />
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.4} />
            <FloatingNetworkNodes />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
          </Suspense>
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 to-white/95 pointer-events-none" />
      </div>

      {/* Content with proper z-index */}
      <div className="relative z-10">

        {/* Services */}
        <section className="py-20 px-4 bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Our Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                AI-powered marketing solutions enhanced with cutting-edge technology
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="bg-white/90 backdrop-blur-sm border border-gray-200 h-full hover:shadow-xl transition-all duration-300 rounded-2xl">
                    <CardHeader>
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-black rounded-xl mr-4">
                          <service.icon className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-black">{service.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="text-sm text-gray-500 flex items-center">
                            <CheckCircle className="w-4 h-4 text-black mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
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
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Let's discuss how our AI-powered solutions can transform your marketing strategy
              </p>
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-12 py-4 text-lg rounded-full">
                <Link href="/contact" className="flex items-center">
                  Schedule Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
