import React from 'react'
import Header from '../ui/Header'
import Hero from '../ui/Hero'
import Tools from '../ui/Tools'
import PromoCard from '../ui/PromoCard'
import BottomNav from '../ui/BottomNav'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-white">
      <div className="max-w-md mx-auto px-4 pb-24">
        <Header />
        <Hero />
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">What do you need today?</h2>
            <button className="text-sm text-secondary px-3 py-1 rounded-lg border border-border">View All</button>
          </div>
          <Tools />
        </div>
        <div className="mt-6">
          <PromoCard />
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
