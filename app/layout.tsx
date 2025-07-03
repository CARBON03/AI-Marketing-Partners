import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Marketing Partners - AI-Powered Marketing Solutions",
  description:
    "Empowering businesses with AI-driven marketing strategies that enhance brand engagement, increase conversions, and drive measurable growth.",
    generator: 'v0.dev',
    icons: {
    icon: "/favicon.ico", 
    shortcut: "/favicon-16x16.png", 
    apple: "/apple-touch-icon.png", 
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
