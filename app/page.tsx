'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Building2, User, LogIn } from 'lucide-react'

export default function HomePage() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <motion.div 
          className="text-3xl font-bold text-gradient"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          Gig$wipe
        </motion.div>
        
        <Link href="/login">
          <motion.button 
            className="btn-outline flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogIn size={20} />
            LOG IN
          </motion.button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl"
        >
          {/* Main Question */}
          <h1 className="text-6xl md:text-8xl font-serif mb-8">
            I AM A
          </h1>

          {/* Two Main Buttons */}
          <div className="flex flex-col md:flex-row gap-6 mb-16">
            <motion.div
              onHoverStart={() => setHoveredButton('business')}
              onHoverEnd={() => setHoveredButton(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/business/signup">
                <button className="btn-primary text-2xl px-12 py-6 flex items-center gap-3">
                  <Building2 size={32} />
                  BUSINESS
                </button>
              </Link>
            </motion.div>

            <motion.div
              onHoverStart={() => setHoveredButton('talent')}
              onHoverEnd={() => setHoveredButton(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/talent/signup">
                <button className="btn-secondary text-2xl px-12 py-6 flex items-center gap-3">
                  <User size={32} />
                  TALENT
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl md:text-3xl font-serif text-neutral-gray-600"
          >
            Are you looking for work? Are you looking to HIRE?
          </motion.div>
        </motion.div>
      </main>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-turquoise opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-purple opacity-5 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}
