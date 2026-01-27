'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface SiteImage {
  id: string
  section: string
  image_url: string
  alt_text: string | null
}

export default function AdminDashboard() {
  const [images, setImages] = useState<SiteImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [uploadingSection, setUploadingSection] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    try {
      const { data, error } = await supabase
        .from('site_images')
        .select('*')
        .order('section')

      if (error) throw error
      setImages(data || [])
    } catch (error) {
      console.error('Error loading images:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = async (section: string, file: File) => {
    setUploadingSection(section)

    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${section}-${Date.now()}.${fileExt}`
      const filePath = `website/${fileName}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('website-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('website-images')
        .getPublicUrl(filePath)

      // Update database
      const { error: updateError } = await supabase
        .from('site_images')
        .update({ image_url: publicUrl })
        .eq('section', section)

      if (updateError) throw updateError

      // Reload images
      await loadImages()
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image. Please try again.')
    } finally {
      setUploadingSection(null)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/login', { method: 'DELETE' })
      router.push('/admin')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const getSectionLabel = (section: string) => {
    const labels: Record<string, string> = {
      'homepage_hero': 'Homepage Hero',
      'vip_hostess_card': 'VIP Hostess Card',
      'brand_ambassador_card': 'Brand Ambassador Card',
      'event_hostess_card': 'Event Hostess Card',
      'portfolio_preview_1': 'Portfolio Preview 1',
      'portfolio_preview_2': 'Portfolio Preview 2',
      'portfolio_preview_3': 'Portfolio Preview 3'
    }
    return labels[section] || section
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-[#D4AF37] text-xl">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A]">
      {/* Header */}
      <div className="border-b border-[#D4AF37]/20 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-playfair text-[#F5F5F0]">
              MUSE & CO
            </h1>
            <p className="text-[#D4AF37]/70 text-sm">Image Manager</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] rounded-lg hover:bg-[#D4AF37]/20 transition-colors text-sm uppercase tracking-wider"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-[#F5F5F0] mb-2">
            Manage Website Images
          </h2>
          <p className="text-[#F5F5F0]/60 text-sm md:text-base">
            Click &quot;Replace Image&quot; to upload a new image from your phone or computer
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/40 backdrop-blur-xl border border-[#D4AF37]/20 rounded-xl overflow-hidden"
            >
              {/* Image Preview */}
              <div className="relative aspect-[4/3] bg-black">
                <Image
                  src={image.image_url}
                  alt={image.alt_text || getSectionLabel(image.section)}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info & Actions */}
              <div className="p-4">
                <h3 className="text-[#F5F5F0] font-semibold mb-3">
                  {getSectionLabel(image.section)}
                </h3>

                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleImageUpload(image.section, file)
                    }}
                    className="hidden"
                    disabled={uploadingSection === image.section}
                  />
                  <span className="block w-full text-center px-4 py-3 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-black font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all cursor-pointer uppercase tracking-wider text-sm disabled:opacity-50">
                    {uploadingSection === image.section ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Uploading...
                      </span>
                    ) : (
                      'Replace Image'
                    )}
                  </span>
                </label>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-xl p-6">
          <h3 className="text-[#D4AF37] font-semibold mb-3 text-lg">
            📱 How to Use This Dashboard
          </h3>
          <ul className="text-[#F5F5F0]/70 space-y-2 text-sm md:text-base">
            <li>• Click any &quot;Replace Image&quot; button to upload a new image</li>
            <li>• Your phone camera will open (or file browser on desktop)</li>
            <li>• Choose or take a photo - it will upload automatically</li>
            <li>• Changes appear on the live website instantly</li>
            <li>• Recommended: Use high-quality images (at least 1920px wide)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
