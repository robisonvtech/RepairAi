import React from 'react'
import { Camera, Mic } from 'lucide-react'
import { motion } from 'framer-motion'

export default function HeroInput() {
  return (
    <motion.form
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-2 bg-card border border-border rounded-lgp p-3 flex items-center gap-3"
      onSubmit={(e) => e.preventDefault()}
    >
      <button aria-label="Upload image" className="p-2 bg-black/30 rounded-lg ring-1 ring-border">
        <Camera className="w-5 h-5 text-secondary" />
      </button>
      <input aria-label="Describe the device problem" placeholder="Describe the device problem..." className="flex-1 bg-transparent outline-none text-white placeholder:text-secondary" />
      <button aria-label="Record audio" className="p-2 bg-black/30 rounded-lg ring-1 ring-border">
        <Mic className="w-5 h-5 text-secondary" />
      </button>
      <motion.button
        whileTap={{ scale: 0.96 }}
        className="w-12 h-12 rounded-full bg-gradient-to-b from-primary to-[#cc0000] flex items-center justify-center shadow-neon"
        aria-label="Send"
      >
        ➤
      </motion.button>
    </motion.form>
  )
}
