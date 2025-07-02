"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Environment } from "@react-three/drei"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Suspense } from "react"
import { Users, Target, Eye, Award } from "lucide-react"

function HolographicCubes() {
  return (
    <group>
      {Array.from({ length: 15 }).map((_, i) => (
        <Float key={i} speed={2 + Math.random()} rotationIntensity={1} floatIntensity={1.5}>
          <mesh position={[(Math.random() - 0.5) * 25, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 15]}>
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshStandardMaterial color="#000000" transparent opacity={0.3} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Mission",
      description:
        "To empower businesses with AI-driven marketing strategies that enhance brand engagement, increase conversions, and drive measurable growth.",
    },
    {
      icon: Eye,
      title: "Vision",
      description:
        "To be a leader in the digital marketing space, recognized for our innovative use of AI technology and our commitment to delivering exceptional results.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We strive for excellence in every project, combining cutting-edge AI technology with proven marketing strategies.",
    },
    {
      icon: Users,
      title: "Partnership",
      description:
        "We believe in building long-term partnerships with our clients, growing together through innovative AI solutions.",
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
            <HolographicCubes />
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
              <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">About Us</h1>
              <p className="text-xl text-gray-600">Pioneering the future of AI-driven marketing</p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="bg-white border border-gray-200 h-full hover:shadow-lg transition-all duration-300 rounded-2xl">
                    <CardContent className="p-6 text-center">
                      <div className="flex justify-center mb-4">
                        <div className="p-3 bg-black rounded-xl">
                          <value.icon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-black mb-4">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
