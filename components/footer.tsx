"use client"

import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 relative">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Link href="/" className="inline-flex items-center space-x-3 group">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-white flex items-center justify-center shadow-sm">
                <img src="/logo.png" alt="AI Marketing Partners Logo" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <span className="text-2xl font-bold text-black">AI Marketing Partners</span>
                <div className="text-sm text-gray-500 font-medium">Transforming Visions into Brand</div>
              </div>
            </Link>

            <p className="text-gray-600 leading-relaxed max-w-md">
              Our AI-powered marketing solutions are designed to accelerate your business growth by combining
              automation, data intelligence, and smart digital strategies.
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h4 className="text-xl font-bold text-black">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center text-gray-600 group">
                <div className="p-2 bg-gray-100 rounded-lg mr-4 group-hover:bg-black group-hover:text-white transition-all duration-200">
                  <Mail className="h-5 w-5" />
                </div>
                <span>support@aimarketingpartners.ai</span>
              </div>
              <div className="flex items-center text-gray-600 group">
                <div className="p-2 bg-gray-100 rounded-lg mr-4 group-hover:bg-black group-hover:text-white transition-all duration-200">
                  <Phone className="h-5 w-5" />
                </div>
                <span>+1 (416) 230-7592</span>
              </div>
              <div className="flex items-center text-gray-600 group">
                <div className="p-2 bg-gray-100 rounded-lg mr-4 group-hover:bg-black group-hover:text-white transition-all duration-200">
                  <MapPin className="h-5 w-5" />
                </div>
                <span>Level 1, 11-15 Buckhurst St, South Melbourne VIC 3205, Australia</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100 bg-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-gray-500 text-sm"
            >
              © 2025 AI Marketing Partners. All rights reserved.
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center space-x-6 text-sm text-gray-500"
            >
              <span>Made with ❤️ for the future of marketing</span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}
