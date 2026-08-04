import React from 'react'
import { Home, FileText, GraduationCap, User } from 'lucide-react'
import { motion } from 'framer-motion'

export default function BottomNav() {
  return (
    <nav className="fixed left-4 right-4 bottom-6 bg-black/30 backdrop-blur-md border border-border rounded-lgp px-4 py-3 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-6 text-sm text-secondary">
        <div className="flex flex-col items-center gap-1">
          <Home className="w-5 h-5" />
          <div>Panel</div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <FileText className="w-5 h-5" />
          <div>Orders</div>
        </div>
      </div>

      <div className="relative -top-6">
        <motion.button whileTap={{ scale: 0.95 }} className="w-16 h-16 rounded-full bg-gradient-to-b from-primary to-[#cc0000] flex items-center justify-center text-white shadow-neon border border-primary">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">U</div>
        </motion.button>
      </div>

      <div className="flex items-center gap-6 text-sm text-secondary">
        <div className="flex flex-col items-center gap-1">
          <GraduationCap className="w-5 h-5" />
          <div>Courses</div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <User className="w-5 h-5" />
          <div>Profile</div>
        </div>
      </div>
    </nav>
  )
}
