"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Environment } from "@react-three/drei"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { Suspense, useState } from "react"
import { Mail, Phone, MapPin, Clock, MessageSquare, Users, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

function FloatingContactElements() {
  return (
    <group>
      {Array.from({ length: 20 }).map((_, i) => (
        <Float key={i} speed={1.5 + Math.random()} rotationIntensity={0.8} floatIntensity={1.2}>
          <mesh position={[(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 25, (Math.random() - 0.5) * 15]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial color="#000000" transparent opacity={0.4} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setSubmitStatus('error');
      setSubmitMessage('Please fill in all required fields.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error');
      setSubmitMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          phone: '',
          message: ''
        });
      } else {
        const errorData = await response.json();
        setSubmitStatus('error');
        setSubmitMessage(errorData.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us an email and we'll respond within 24 hours",
      contact: "support@aimarketingpartners.ai",
      href: "mailto:support@aimarketingpartners.ai"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our AI marketing experts",
      contact: "+1 (416) 230-7592",
      href: "tel:+14162307592"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come visit our headquarters",
      contact: "Level 1, 11-15 Buckhurst St, South Melbourne VIC 3205, Australia",
      href: "https://maps.google.com/?q=Level+1,+11-15+Buckhurst+St,+South+Melbourne+VIC+3205,+Australia"
    },
    {
      icon: Clock,
      title: "Business Hours",
      description: "We're available during these hours",
      contact: "Mon-Fri: 9AM-6PM AEST",
      href: null
    },
  ]

  const reasons = [
    {
      icon: MessageSquare,
      title: "Free Consultation",
      description: "Get expert advice on your AI marketing strategy at no cost",
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Work with a dedicated team of AI marketing specialists",
    },
  ]

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0 z-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
          <Suspense fallback={null}>
            <Environment preset="studio" />
            <ambientLight intensity={0.7} />
            <pointLight position={[10, 10, 10]} intensity={0.6} />
            <FloatingContactElements />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content with proper z-index */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="h-96 flex items-center justify-center">
          <div className="text-center px-4">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">Contact Us</h1>
              <p className="text-xl text-gray-600">
                Ready to transform your marketing with AI? Let's start the conversation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-white border border-gray-200 shadow-lg rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-black">Get Started Today</CardTitle>
                    <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Success/Error Messages */}
                    {submitStatus && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-xl flex items-start space-x-3 ${
                          submitStatus === 'success' 
                            ? 'bg-green-50 border border-green-200' 
                            : 'bg-red-50 border border-red-200'
                        }`}
                      >
                        {submitStatus === 'success' ? (
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                        )}
                        <p className={`text-sm leading-relaxed ${
                          submitStatus === 'success' ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {submitMessage}
                        </p>
                      </motion.div>
                    )}

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <Input 
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="John" 
                            className="rounded-xl" 
                            disabled={isSubmitting}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <Input 
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Doe" 
                            className="rounded-xl"
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <Input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@company.com" 
                          className="rounded-xl"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                        <Input 
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Your Company" 
                          className="rounded-xl"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <Input 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 123-4567" 
                          className="rounded-xl"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us about your project and how we can help..."
                          className="rounded-xl min-h-[120px]"
                          disabled={isSubmitting}
                        />
                      </div>
                      <Button 
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full bg-black text-white hover:bg-gray-800 rounded-xl py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold text-black mb-6">Let's Connect</h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Ready to revolutionize your marketing with AI? Our team of experts is here to help you unlock the
                    full potential of artificial intelligence for your business.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="p-2 bg-black rounded-lg">
                        <info.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-black">{info.title}</h3>
                        <p className="text-gray-600 text-sm mb-1">{info.description}</p>
                        {info.href ? (
                          <a 
                            href={info.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-black font-medium hover:underline"
                          >
                            {info.contact}
                          </a>
                        ) : (
                          <p className="text-black font-medium">{info.contact}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-black">Why Choose Us?</h3>
                  {reasons.map((reason, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <reason.icon className="h-4 w-4 text-black" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-black">{reason.title}</h4>
                        <p className="text-gray-600 text-sm">{reason.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}