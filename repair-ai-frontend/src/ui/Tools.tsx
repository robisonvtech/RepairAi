import React from 'react'
import { ChevronRight, Cpu, BookOpen, Search, Droplet, DollarSign, Tool } from 'lucide-react'
import { motion } from 'framer-motion'

const cards = [
  { title: 'Diagnose Device Issue', desc: 'Describe the issue and receive a complete diagnosis.', icon: Tool },
  { title: 'Device Value Estimator', desc: 'Discover the ideal buying or selling value.', icon: DollarSign },
  { title: 'Repair Guide', desc: 'Step-by-step repair instructions.', icon: BookOpen },
  { title: 'Logic Board Diagnosis', desc: 'Advanced motherboard fault analysis.', icon: Cpu },
  { title: 'IMEI Checker', desc: 'Check IMEI information and blacklist status.', icon: Search },
  { title: 'Water Damage Recovery', desc: 'Repair procedures for liquid damaged devices.', icon: Droplet }
]

export default function Tools() {
  return (
    <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
      {cards.map((c) => (
        <motion.div
          key={c.title}
          whileHover={{ scale: 1.01 }}
          className="bg-card border border-border rounded-lgp p-4 flex items-start gap-3 hover:shadow-neon transition-shadow"
        >
          <div className="w-12 h-12 rounded-lg bg-black/30 flex items-center justify-center">
            <c.icon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <div className="font-semibold">{c.title}</div>
            <div className="text-sm text-secondary mt-1">{c.desc}</div>
          </div>
          <ChevronRight className="w-5 h-5 text-secondary" />
        </motion.div>
      ))}
    </motion.div>
  )
}
