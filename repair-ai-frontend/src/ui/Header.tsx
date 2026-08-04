import React from 'react'
import { GraduationCap, ChevronDown } from 'lucide-react'

export default function Header() {
  return (
    <header className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-card rounded-lg flex items-center justify-center ring-1 ring-border">U</div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Repair AI</h1>
            <div className="text-primary text-sm rounded-full px-2 py-1 bg-black/40">✓</div>
          </div>
          <div className="text-sm text-secondary">AI Specialist for Smartphone Repair</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-card px-3 py-2 rounded-lg ring-1 ring-border">
          <GraduationCap className="w-4 h-4 text-secondary" />
          <span className="text-sm">Auto</span>
          <ChevronDown className="w-4 h-4 text-secondary" />
        </div>
      </div>
    </header>
  )
}
