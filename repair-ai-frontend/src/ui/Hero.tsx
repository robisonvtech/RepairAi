import React from 'react'
import { motion } from 'framer-motion'
import HeroInput from './HeroInput'

export default function Hero() {
  return (
    <section className="mt-2 relative hero-circuit">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h2 className="text-3xl font-extrabold leading-tight">
            Olá, <span className="text-primary">Robison!</span>
          </h2>
          <p className="text-secondary mt-2">Describe the device problem or upload photos. Repair AI analyzes everything in seconds.</p>

          <div className="flex gap-2 mt-4">
            <div className="px-3 py-1 rounded-full bg-card text-sm text-online flex items-center gap-2 ring-1 ring-border">AI Online</div>
            <div className="px-3 py-1 rounded-full bg-card text-sm text-secondary flex items-center gap-2 ring-1 ring-border">Fast Responses</div>
            <div className="px-3 py-1 rounded-full bg-card text-sm text-secondary flex items-center gap-2 ring-1 ring-border">+25,000 Diagnostics</div>
          </div>

          <div className="mt-4">
            <HeroInput />
          </div>
        </div>

        <div className="w-44 h-44 flex-shrink-0 flex items-center justify-center relative">
          <motion.div
            animate={{ rotate: [0, 6, -6, 0] }}
            transition={{ repeat: Infinity, duration: 6 }}
            className="w-40 h-40 rounded-full flex items-center justify-center"
          >
            <div className="w-36 h-36 rounded-full bg-gradient-to-b from-black/40 to-transparent flex items-center justify-center shadow-neon ring-4 ring-primary/20">
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-3xl">U</div>
            </div>
          </motion.div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-2 bg-gradient-to-r from-primary/60 to-transparent rounded-full opacity-80" />
        </div>
      </div>
    </section>
  )
}
