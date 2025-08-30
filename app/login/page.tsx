'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient flex flex-col">
      {/* Header */}
      <header className="flex items-center p-6">
        <Link href="/">
          <motion.button 
            className="btn-outline flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} />
            Back to Home
          </motion.button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="card p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gradient">
              Login
            </h1>
            
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="input-field w-full"
              />
              
              <input
                type="password"
                placeholder="Password"
                className="input-field w-full"
              />
              
              <button className="btn-primary w-full">
                Sign In
              </button>
            </div>
            
            <div className="mt-6 text-center text-neutral-gray-600">
              <p>Don't have an account?</p>
              <div className="mt-2 space-x-4">
                <Link href="/business/signup" className="text-accent-turquoise hover:underline">
                  Business Signup
                </Link>
                <Link href="/talent/signup" className="text-secondary-purple hover:underline">
                  Talent Signup
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
