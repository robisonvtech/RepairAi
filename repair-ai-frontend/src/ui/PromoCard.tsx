import React from 'react'
import { Diamond } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PromoCard() {
  return (
    <motion.div className="mt-4 bg-gradient-to-r from-black/20 to-black/10 border border-border rounded-lgp p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-lg bg-black/30 flex items-center justify-center">
          <Diamond className="w-6 h-6 text-primary" />
        </div>
        <div>
          <div className="font-semibold text-lg">Upgrade to PRO</div>
          <div className="text-sm text-secondary mt-1">Unlock unlimited AI diagnostics, board schematics, premium repair courses, board views, pinouts, and advanced repair tools.</div>
        </div>
      </div>
      <motion.button whileTap={{ scale: 0.96 }} className="px-4 py-2 rounded-lg bg-gradient-to-b from-primary to-[#cc0000] shadow-neon">Upgrade Now</motion.button>
    </motion.div>
  )
}
