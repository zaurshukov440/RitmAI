import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from 'next/font/google'
import "./globals.css"

import ConvexClerkProvider from "@/providers/ConvexClerkProvider"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "RitmAI - Персональный фитнес-тренер",
  description: "Современная AI-платформа для персонализированных фитнес-программ",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="ru">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Navbar />

          <div className="fixed inset-0 -z-1">
            <div className="absolute inset-0 bg-gradient-to-b from-white-warm to-white"></div>

            <div className="absolute inset-0 bg-[linear-gradient(var(--grid-color)_1px,transparent_1px),linear-gradient(90deg,var(--grid-color)_1px,transparent_1px)] bg-[size:30px_30px]"></div>


            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] opacity-60"></div>
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px] opacity-60"></div>
            <div className="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-violet-500/5 rounded-full blur-[100px] opacity-40"></div>
          </div>

          <main className="pt-20 flex-grow relative z-10">{children}</main>
          <Footer />
        </body>
      </html>
    </ConvexClerkProvider>
  )
}

