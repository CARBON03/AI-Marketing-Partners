
"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Brain,
  Zap,
  Target,
  BarChart3,
  MessageSquare,
  Phone,
  CheckCircle,
  Star,
  TrendingUp,
  Users,
  Award,
  ShoppingCart,
  Search,
  Eye,
} from "lucide-react"

// Client-only wrapper for Three.js components
function ClientOnlyCanvas({ children }) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
    )
  }

  return children
}

function Badge({ children, variant = "default", className = "" }) {
  const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
  const variantClasses = {
    default: "bg-gray-900 text-white",
    secondary: "bg-gray-100 text-gray-700",
    outline: "border border-gray-300 bg-transparent"
  }
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}

function Button({ children, size = "default", variant = "default", className = "", ...props }) {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
  const sizeClasses = {
    default: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  }
  const variantClasses = {
    default: "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500",
    outline: "border-2 border-gray-300 bg-transparent hover:bg-gray-50 focus:ring-gray-500"
  }
  
  return (
    <button className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {children}
    </div>
  )
}

function CardContent({ children, className = "" }) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  )
}

// Animated background component without Three.js
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Floating geometric shapes */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-black/5 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
      
      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-gray-200/30 to-gray-300/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />
      
      <motion.div
        className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-gray-100/20 to-gray-200/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          delay: 2,
        }}
      />
    </div>
  )
}

export default function HomePage() {
  const services = [
    {
      icon: Phone,
      title: "AI Voice Agents",
      description: "Enterprise-ready AI voice agents for automated phone interactions and customer service.",
      metric: "99.7% Accuracy",
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Solutions",
      description: "AI-powered e-commerce optimization including product recommendations, pricing strategies, and customer journey enhancement.",
      metric: "+300% Sales Growth",
    },
    {
      icon: Search,
      title: "Google & Meta Ads Expertise",
      description: "Advanced AI-driven advertising campaigns on Google and Meta platforms for maximum ROI.",
      metric: "+400% ROAS",
    },
    {
      icon: MessageSquare,
      title: "AI Chatbots",
      description: "Intelligent conversational agents that engage and convert visitors 24/7.",
      metric: "24/7 Availability",
    },
    {
      icon: Brain,
      title: "AI-Powered SEO",
      description: "Advanced keyword analysis and content optimization using machine learning algorithms.",
      metric: "+250% Traffic Growth",
    },
    {
      icon: Zap,
      title: "Content Creation",
      description: "Data-driven content strategies that resonate with your target audience.",
      metric: "10x Faster Production",
    },
    {
      icon: Target,
      title: "Social Media Management",
      description: "Automated campaigns optimized using AI to identify trends and preferences.",
      metric: "+180% Engagement",
    },
    {
      icon: BarChart3,
      title: "Data Analytics",
      description: "In-depth analytics and reporting with AI-powered actionable insights.",
      metric: "Real-time Insights",
    },
  ]

  const stats = [
    { value: "500+", label: "Businesses Served", icon: Users },
    { value: "250%", label: "Average ROI Increase", icon: TrendingUp },
    { value: "$5M+", label: "Revenue Generated", icon: Award },
    { value: "99.9%", label: "Uptime Guarantee", icon: CheckCircle },
  ]

  const testimonials = [
    {
      quote: "AI Marketing Partners transformed our entire customer acquisition process. We've seen a 300% increase in qualified leads within just 3 months.",
      author: "Sarah Johnson",
      avatar: "SJ",
      rating: 5,
    },
    {
      quote: "The AI voice agents handle our customer calls better than our human team. It's incredible technology that saved us $200K annually.",
      author: "Michael Chen",
      avatar: "MC",
      rating: 5,
    },
    {
      quote: "Their predictive analytics helped us optimize our marketing spend and increase ROI by 400%. Best investment we've made.",
      author: "Emily Rodriguez",
      avatar: "ER",
      rating: 5,
    },
  ]

  const features = [
    "24/7 Automated Customer Engagement",
    "Predictive Analytics & Insights",
    "Personalized Customer Journeys",
    "Real-time Campaign Optimization",
    "Advanced Lead Scoring & Qualification",
    "Multi-channel Integration",
  ]

  const values = [
    {
      icon: Target,
      title: "Mission",
      description: "To empower businesses with AI-driven marketing strategies that enhance brand engagement, increase conversions, and drive measurable growth.",
    },
    {
      icon: Eye,
      title: "Vision",
      description: "To be a leader in the digital marketing space, recognized for our innovative use of AI technology and our commitment to delivering exceptional results.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in every project, combining cutting-edge AI technology with proven marketing strategies.",
    },
    {
      icon: Users,
      title: "Partnership",
      description: "We believe in building long-term partnerships with our clients, growing together through innovative AI solutions.",
    },
  ]

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/90 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 pt-16">
          <div className="text-center max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 mb-8"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Trusted by 500+ Businesses</span>
              </motion.div>

              <h1 className="text-6xl md:text-8xl font-bold text-black mb-6 leading-tight tracking-tight">
                AI Marketing
                <br />
                <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Partners
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed font-light">
                Transform your business with cutting-edge AI technology. We deliver marketing solutions that drive
                <span className="font-semibold text-black"> unprecedented growth and ROI</span>.
              </p>

              <div className="flex justify-center mb-12">
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  Start Your AI Journey
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="space-y-6">
                <p className="text-sm text-gray-500 font-medium">Complete Marketing Hub For Your Brand.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 px-4 bg-white/80 backdrop-blur-sm relative">
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <Badge variant="secondary" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full mb-6">
                About Us
              </Badge>
              <h2 className="text-5xl md:text-6xl font-bold text-black mb-6 tracking-tight">
                Pioneering the Future of
                <br />
                <span className="text-gray-600">AI-Driven Marketing</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto font-light">
                We combine cutting-edge artificial intelligence with proven marketing strategies to deliver exceptional
                results for businesses worldwide
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 h-full hover:shadow-lg transition-all duration-300 rounded-2xl">
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

        {/* Services Section */}
        <section className="py-24 px-4 bg-gray-50/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <Badge variant="secondary" className="bg-white text-gray-700 px-4 py-2 rounded-full mb-6">
                Our Expertise
              </Badge>
              <h2 className="text-5xl md:text-6xl font-bold text-black mb-6 tracking-tight">
                AI-Powered Marketing
                <br />
                <span className="text-gray-600">Solutions</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto font-light">
                Harness the power of artificial intelligence to revolutionize your marketing strategy and achieve
                unprecedented results
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group"
                >
                  <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 h-full hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden">
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="p-3 bg-gray-100 rounded-2xl group-hover:bg-black group-hover:text-white transition-all duration-300">
                          <service.icon className="h-8 w-8" />
                        </div>
                        <Badge variant="outline" className="text-xs font-medium">
                          {service.metric}
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-gray-800 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Showcase */}
        <section className="py-24 px-4 bg-gray-50/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge variant="secondary" className="bg-white text-gray-700 px-4 py-2 rounded-full mb-6">
                  Advanced Technology
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 tracking-tight">
                  Why Choose Our
                  <br />
                  <span className="text-gray-600">AI Solutions?</span>
                </h2>
                <p className="text-xl text-gray-600 mb-10 leading-relaxed font-light">
                  Our cutting-edge AI technology doesn't just automate—it intelligently optimizes every aspect of your
                  marketing funnel for maximum performance.
                </p>
                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center group"
                    >
                      <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-gray-700 text-lg font-medium group-hover:text-black transition-colors">
                        {feature}
                      </span>
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
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-black rounded-full -translate-y-16 translate-x-16 opacity-5"></div>
                  <div className="grid grid-cols-2 gap-8 relative">
                    {[
                      { metric: "Response Time", value: "<2 sec", change: "99% faster" },
                      { metric: "Accuracy Rate", value: "99.7%", change: "+15% vs industry" },
                      { metric: "Cost Reduction", value: "65%", change: "Average savings" },
                      { metric: "Lead Quality", value: "+340%", change: "Improvement rate" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="text-center p-6 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-3xl font-bold text-black mb-2 group-hover:scale-110 transition-transform">
                          {item.value}
                        </div>
                        <div className="text-gray-600 text-sm font-medium mb-1">{item.metric}</div>
                        <div className="text-xs text-gray-400">{item.change}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 px-4 bg-gray-50/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-black rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-black mb-2">{stat.value}</div>
                    <p className="text-gray-600 font-medium">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 px-4 bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <Badge variant="secondary" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full mb-6">
                Client Success Stories
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 tracking-tight">What Our Clients Say</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
                Real results from businesses that transformed their marketing with our AI solutions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 h-full hover:shadow-xl transition-all duration-300 rounded-3xl">
                    <CardContent className="p-8">
                      {/* Rating */}
                      <div className="flex items-center mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>

                      <blockquote className="text-gray-700 mb-8 italic text-lg leading-relaxed font-light">
                        "{testimonial.quote}"
                      </blockquote>

                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white font-bold mr-4">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <cite className="text-black font-bold text-lg block not-italic">{testimonial.author}</cite>
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
        <section className="py-24 px-4 bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-50"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="bg-white/10 text-white px-4 py-2 rounded-full mb-8">
                Ready to Transform Your Business?
              </Badge>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
                Start Your AI Marketing
                <br />
                Revolution Today
              </h2>
              <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                Join hundreds of successful businesses that have already transformed their marketing with our AI
                solutions. Get started with a free consultation and see the difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 px-10 py-4 text-xl font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/20 text-white hover:bg-white/10 px-10 py-4 text-xl font-medium rounded-2xl backdrop-blur-sm bg-transparent"
                >
                  View All Services
                </Button>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400">
                <div className="flex items-center group">
                  <CheckCircle className="h-5 w-5 text-white mr-2 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-white transition-colors">No Setup Fees</span>
                </div>
                <div className="flex items-center group">
                  <CheckCircle className="h-5 w-5 text-white mr-2 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-white transition-colors">30-Day Money Back</span>
                </div>
                <div className="flex items-center group">
                  <CheckCircle className="h-5 w-5 text-white mr-2 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-white transition-colors">24/7 Support</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}