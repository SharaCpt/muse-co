'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ImagePlus, Image as ImageIcon, Layout, LogOut } from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/login', { method: 'DELETE' })
      router.push('/admin')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const managementSections = [
    {
      title: 'Portfolio Manager',
      description: 'Upload and manage model portfolio images',
      icon: ImagePlus,
      href: '/admin/dashboard/portfolio-manager',
      color: 'from-champagne-gold to-yellow-600'
    },
    {
      title: 'Homepage Images',
      description: 'Manage hero and service card images',
      icon: Layout,
      href: '/admin/dashboard/homepage-images',
      color: 'from-champagne-gold to-yellow-500'
    },
    {
      title: 'Page Headers',
      description: 'Update header backgrounds for all pages',
      icon: ImageIcon,
      href: '/admin/dashboard/page-headers',
      color: 'from-yellow-600 to-champagne-gold'
    },
  ]

  return (
    <div className="min-h-screen bg-deep-black text-off-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-champagne-gold/10 to-transparent border-b border-champagne-gold/20 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="font-playfair text-3xl md:text-4xl text-champagne-gold mb-1">
              Admin Dashboard
            </h1>
            <p className="text-off-white/60">Manage your website content</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500 text-red-500 rounded hover:bg-red-500/30 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-playfair text-champagne-gold mb-2">
            Content Management
          </h2>
          <p className="text-off-white/60">
            Tap any card to manage that section
          </p>
        </div>

        {/* CMS Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {managementSections.map((section, index) => (
            <Link
              key={index}
              href={section.href}
              className="group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-charcoal/90 to-charcoal/60 border-2 border-champagne-gold/20 rounded-xl p-8 hover:border-champagne-gold hover:shadow-[0_0_40px_rgba(212,175,55,0.2)] transition-all duration-300 h-full"
              >
                <div className={`inline-block p-4 rounded-lg bg-gradient-to-br ${section.color} mb-4`}>
                  <section.icon size={32} className="text-deep-black" />
                </div>
                
                <h3 className="text-xl font-playfair text-off-white mb-2 group-hover:text-champagne-gold transition-colors">
                  {section.title}
                </h3>
                
                <p className="text-off-white/60 text-sm leading-relaxed">
                  {section.description}
                </p>

                <div className="mt-6 flex items-center text-champagne-gold text-sm font-semibold group-hover:translate-x-2 transition-transform">
                  Manage →
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Instructions */}
        <div className="bg-champagne-gold/5 border border-champagne-gold/20 rounded-xl p-6">
          <h3 className="text-champagne-gold font-semibold mb-3 text-lg flex items-center gap-2">
            <span>📱</span> Quick Guide
          </h3>
          <ul className="text-off-white/70 space-y-2 text-sm md:text-base">
            <li>• <strong>Portfolio Manager:</strong> Upload model photos and manage your portfolio gallery</li>
            <li>• <strong>Homepage Images:</strong> Update the hero banner and service card images</li>
            <li>• <strong>Page Headers:</strong> Change background images for About, Services, Pricing, etc.</li>
            <li>• All changes are instant - refresh the live site to see updates</li>
            <li>• Works on mobile and desktop - tap to upload from your phone camera</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
