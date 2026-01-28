'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'
import { Upload, Save } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface HomepageImage {
  id: string
  section: string
  image_url: string
  title: string | null
  description: string | null
}

const SECTIONS = [
  { key: 'hero', label: 'Hero Background', description: 'Main homepage banner image' },
  { key: 'service_card_1', label: 'VIP Nightlife Card', description: 'First service card image' },
  { key: 'service_card_2', label: 'Luxury Concierge Card', description: 'Second service card image' },
  { key: 'service_card_3', label: 'Travel Companionship Card', description: 'Third service card image' },
  { key: 'service_card_4', label: 'Bespoke Events Card', description: 'Fourth service card image' },
]

export default function HomepageImageManager() {
  const [images, setImages] = useState<HomepageImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchImages()
  }, [])

  async function fetchImages() {
    try {
      const { data, error} = await supabase
        .from('homepage_images')
        .select('*')
        .eq('is_active', true)

      if (error) throw error
      setImages(data || [])
    } catch (error: any) {
      showMessage('Error loading images: ' + error.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  async function uploadImage(section: string, file: File) {
    setUploading(section)

    try {
      // Create storage bucket if it doesn't exist
      const { data: buckets } = await supabase.storage.listBuckets()
      if (!buckets?.find(b => b.name === 'homepage')) {
        await supabase.storage.createBucket('homepage', { public: true })
      }

      // Upload file
      const fileExt = file.name.split('.').pop()
      const fileName = `${section}-${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('homepage')
        .upload(filePath, file, { upsert: true })

      if (uploadError) throw uploadError

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('homepage')
        .getPublicUrl(filePath)

      // Update database
      const { error: dbError } = await supabase
        .from('homepage_images')
        .upsert({
          section,
          image_url: urlData.publicUrl,
          title: SECTIONS.find(s => s.key === section)?.label,
          description: SECTIONS.find(s => s.key === section)?.description,
        })

      if (dbError) throw dbError

      showMessage('Image updated successfully!', 'success')
      fetchImages()
    } catch (error: any) {
      showMessage('Upload failed: ' + error.message, 'error')
    } finally {
      setUploading(null)
    }
  }

  function showMessage(msg: string, type: 'success' | 'error') {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  function getCurrentImage(section: string) {
    return images.find(img => img.section === section)?.image_url
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-deep-black text-off-white flex items-center justify-center">
        <p className="text-champagne-gold">Loading homepage images...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-deep-black text-off-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-playfair text-4xl md:text-5xl text-champagne-gold mb-2">
            Homepage Images
          </h1>
          <p className="text-off-white/60">Manage hero and service card images</p>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded ${message.includes('failed') || message.includes('Error') ? 'bg-red-500/20 border border-red-500' : 'bg-green-500/20 border border-green-500'}`}>
            <p className="text-sm">{message}</p>
          </div>
        )}

        {/* Image Sections */}
        <div className="space-y-6">
          {SECTIONS.map((section) => {
            const currentImage = getCurrentImage(section.key)
            const isUploading = uploading === section.key

            return (
              <div key={section.key} className="bg-charcoal/50 border border-champagne-gold/20 rounded overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  {/* Image Preview */}
                  <div>
                    <h3 className="text-xl font-playfair text-champagne-gold mb-2">
                      {section.label}
                    </h3>
                    <p className="text-sm text-off-white/60 mb-4">{section.description}</p>
                    
                    {currentImage && (
                      <div className="relative h-64 md:h-80 rounded overflow-hidden">
                        <Image
                          src={currentImage}
                          alt={section.label}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Upload Form */}
                  <div className="flex flex-col justify-center">
                    <label className="block mb-4">
                      <span className="text-sm text-off-white/80 block mb-2">
                        {currentImage ? 'Replace Image' : 'Upload Image'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isUploading}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            uploadImage(section.key, e.target.files[0])
                          }
                        }}
                        className="w-full bg-deep-black border border-champagne-gold/30 p-3 rounded file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-champagne-gold file:text-deep-black file:cursor-pointer disabled:opacity-50"
                      />
                    </label>

                    {isUploading && (
                      <div className="flex items-center gap-2 text-champagne-gold">
                        <Upload size={20} className="animate-pulse" />
                        <span>Uploading...</span>
                      </div>
                    )}

                    <p className="text-xs text-off-white/50 mt-2">
                      Recommended: {section.key === 'hero' ? '2400x1600px' : '1200x800px'}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
