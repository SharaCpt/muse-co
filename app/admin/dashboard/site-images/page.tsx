'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Camera, X, Loader2, Check, ImageIcon } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface SiteImage {
  id: string
  page: string
  section: string
  label: string
  image_url: string
  description: string
}

// Define all site images with their current URLs
const DEFAULT_IMAGES: SiteImage[] = [
  // Homepage
  {
    id: 'homepage_hero',
    page: 'Homepage',
    section: 'hero',
    label: 'Hero Background',
    image_url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2400',
    description: 'Main hero image on homepage'
  },
  {
    id: 'homepage_service_1',
    page: 'Homepage',
    section: 'service_card_1',
    label: 'VIP Nightlife',
    image_url: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=1200',
    description: 'VIP Nightlife & Events card'
  },
  {
    id: 'homepage_service_2',
    page: 'Homepage',
    section: 'service_card_2',
    label: 'Luxury Concierge',
    image_url: 'https://images.unsplash.com/photo-1522255272218-7ac5249be344?q=80&w=1200',
    description: 'Luxury Concierge Services card'
  },
  {
    id: 'homepage_service_3',
    page: 'Homepage',
    section: 'service_card_3',
    label: 'Travel Companion',
    image_url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200',
    description: 'Elite Travel Companionship card'
  },
  {
    id: 'homepage_service_4',
    page: 'Homepage',
    section: 'service_card_4',
    label: 'Private Events',
    image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200',
    description: 'Bespoke Private Events card'
  },
  {
    id: 'homepage_model_1',
    page: 'Homepage',
    section: 'model_card_1',
    label: 'Event Hostess',
    image_url: 'https://images.unsplash.com/photo-1612874470096-d93a610de87b?q=80&w=800',
    description: 'Event Hostess model card'
  },
  {
    id: 'homepage_model_2',
    page: 'Homepage',
    section: 'model_card_2',
    label: 'Private Companion',
    image_url: 'https://images.unsplash.com/photo-1540316264016-aeb7538f4d6f?q=80&w=800',
    description: 'Private Companion model card'
  },
  {
    id: 'homepage_model_3',
    page: 'Homepage',
    section: 'model_card_3',
    label: 'VIP Hostess',
    image_url: 'https://images.unsplash.com/photo-1604004555489-723a93d6ce74?q=80&w=800',
    description: 'VIP Hostess model card'
  },
  // Services Page
  {
    id: 'services_detail_1',
    page: 'Services',
    section: 'luxury_lifestyle',
    label: 'Luxury Lifestyle',
    image_url: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1200',
    description: 'Luxury Lifestyle Experiences image'
  },
  {
    id: 'services_detail_2',
    page: 'Services',
    section: 'private_arrangements',
    label: 'Private Arrangements',
    image_url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1200',
    description: 'Exclusive Private Arrangements image'
  },
  {
    id: 'services_detail_3',
    page: 'Services',
    section: 'nightlife',
    label: 'VIP Nightlife',
    image_url: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1200',
    description: 'VIP Nightlife Experiences image'
  },
  // Page Headers
  {
    id: 'header_portfolio',
    page: 'Headers',
    section: 'portfolio',
    label: 'Portfolio Header',
    image_url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000',
    description: 'Portfolio page header background'
  },
  {
    id: 'header_services',
    page: 'Headers',
    section: 'services',
    label: 'Services Header',
    image_url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000',
    description: 'Services page header background'
  },
  {
    id: 'header_pricing',
    page: 'Headers',
    section: 'pricing',
    label: 'Pricing Header',
    image_url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000',
    description: 'Pricing page header background'
  },
  {
    id: 'header_contact',
    page: 'Headers',
    section: 'contact',
    label: 'Contact Header',
    image_url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000',
    description: 'Contact page header background'
  },
  {
    id: 'header_about',
    page: 'Headers',
    section: 'about',
    label: 'About Header',
    image_url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000',
    description: 'About page header background'
  },
]

export default function SiteImagesManager() {
  const [images, setImages] = useState<SiteImage[]>(DEFAULT_IMAGES)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<SiteImage | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchImages()
  }, [])

  async function fetchImages() {
    try {
      const { data, error } = await supabase
        .from('site_images')
        .select('*')

      if (error) throw error

      if (data && data.length > 0) {
        // Merge database images with defaults
        const updatedImages = DEFAULT_IMAGES.map(defaultImg => {
          const dbImg = data.find(d => d.id === defaultImg.id)
          return dbImg ? { ...defaultImg, image_url: dbImg.image_url } : defaultImg
        })
        setImages(updatedImages)
      }
    } catch (error) {
      // Table might not exist yet, use defaults
      console.log('Using default images')
    } finally {
      setLoading(false)
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return
    const file = e.target.files[0]
    setSelectedFile(file)
    
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  async function uploadImage() {
    if (!selectedFile || !selectedImage) return

    setUploading(true)

    try {
      // Upload to Supabase Storage
      const fileExt = selectedFile.name.split('.').pop()
      const fileName = `${selectedImage.id}-${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('homepage')
        .upload(fileName, selectedFile, { upsert: true })

      if (uploadError) throw uploadError

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('homepage')
        .getPublicUrl(fileName)

      // Save to database
      const { error: dbError } = await supabase
        .from('site_images')
        .upsert({
          id: selectedImage.id,
          page: selectedImage.page,
          section: selectedImage.section,
          label: selectedImage.label,
          image_url: urlData.publicUrl,
          description: selectedImage.description,
        })

      if (dbError) throw dbError

      // Update local state
      setImages(prev => prev.map(img => 
        img.id === selectedImage.id 
          ? { ...img, image_url: urlData.publicUrl }
          : img
      ))

      showMessage('✓ Image updated successfully!', 'success')
      closeModal()
    } catch (error: any) {
      showMessage('Upload failed. Please try again.', 'error')
    } finally {
      setUploading(false)
    }
  }

  function closeModal() {
    setSelectedImage(null)
    setPreviewUrl(null)
    setSelectedFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function showMessage(text: string, type: 'success' | 'error') {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 4000)
  }

  // Group images by page
  const groupedImages = images.reduce((acc, img) => {
    if (!acc[img.page]) acc[img.page] = []
    acc[img.page].push(img)
    return acc
  }, {} as Record<string, SiteImage[]>)

  if (loading) {
    return (
      <div className="min-h-screen bg-deep-black text-off-white flex flex-col items-center justify-center p-6">
        <Loader2 className="w-12 h-12 text-champagne-gold animate-spin mb-4" />
        <p className="text-champagne-gold text-lg">Loading images...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-deep-black text-off-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-deep-black/95 backdrop-blur-sm border-b border-champagne-gold/20 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <Link 
            href="/admin/dashboard" 
            className="p-2 rounded-full hover:bg-champagne-gold/10 transition"
          >
            <ArrowLeft className="w-6 h-6 text-champagne-gold" />
          </Link>
          <div>
            <h1 className="font-playfair text-2xl md:text-3xl text-champagne-gold">
              Site Images
            </h1>
            <p className="text-off-white/50 text-sm">Tap any image to replace</p>
          </div>
        </div>
      </div>

      {/* Success/Error Message Toast */}
      {message && (
        <div className={`fixed top-20 left-4 right-4 z-50 p-4 rounded-xl shadow-xl text-center text-lg font-medium
          ${message.type === 'success' 
            ? 'bg-green-500/90 text-white' 
            : 'bg-red-500/90 text-white'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Upload Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-deep-black overflow-y-auto">
          <div className="min-h-screen p-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-playfair text-2xl text-champagne-gold">{selectedImage.label}</h2>
                <p className="text-off-white/50 text-sm">{selectedImage.page} • {selectedImage.description}</p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-champagne-gold/10 transition"
              >
                <X className="w-6 h-6 text-off-white" />
              </button>
            </div>

            {/* Current Image */}
            <div className="mb-6">
              <p className="text-off-white/60 text-sm mb-2">Current Image:</p>
              <div className="relative aspect-video max-w-lg mx-auto rounded-xl overflow-hidden border border-champagne-gold/20">
                <Image 
                  src={selectedImage.image_url} 
                  alt={selectedImage.label} 
                  fill 
                  className="object-cover" 
                  unoptimized 
                />
              </div>
            </div>

            {/* New Image Upload */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`relative aspect-video max-w-lg mx-auto mb-6 rounded-xl overflow-hidden cursor-pointer
                         border-2 border-dashed transition-all duration-300
                         ${previewUrl 
                           ? 'border-champagne-gold' 
                           : 'border-champagne-gold/40 hover:border-champagne-gold/70'
                         }`}
            >
              {previewUrl ? (
                <>
                  <Image src={previewUrl} alt="Preview" fill className="object-cover" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <p className="text-white text-sm">Tap to change</p>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-charcoal/50">
                  <div className="w-16 h-16 bg-champagne-gold/20 rounded-full flex items-center justify-center mb-4">
                    <Camera className="w-8 h-8 text-champagne-gold" />
                  </div>
                  <p className="text-champagne-gold text-lg font-semibold">Tap to Select New Image</p>
                  <p className="text-off-white/50 text-sm mt-1">Choose from your device</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Action Buttons */}
            <div className="max-w-lg mx-auto space-y-3">
              <button
                onClick={uploadImage}
                disabled={uploading || !selectedFile}
                className="w-full bg-champagne-gold text-deep-black py-5 rounded-xl font-bold text-xl
                         hover:bg-champagne-gold/90 active:scale-[0.98] transition-all duration-200
                         disabled:opacity-40 disabled:cursor-not-allowed
                         flex items-center justify-center gap-3
                         shadow-lg shadow-champagne-gold/30"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Check className="w-6 h-6" />
                    Replace Image
                  </>
                )}
              </button>

              <button
                onClick={closeModal}
                className="w-full py-4 text-off-white/60 hover:text-off-white transition text-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Grid by Page */}
      <div className="p-4 pb-24">
        {Object.entries(groupedImages).map(([page, pageImages]) => (
          <div key={page} className="mb-10">
            <h2 className="font-playfair text-xl text-champagne-gold mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              {page}
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {pageImages.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img)}
                  className="group relative bg-charcoal/30 rounded-xl overflow-hidden
                           border border-champagne-gold/10 hover:border-champagne-gold/50 
                           transition-all duration-300 text-left
                           hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                >
                  {/* Image */}
                  <div className="relative aspect-video">
                    <Image
                      src={img.image_url}
                      alt={img.label}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-black/90 via-deep-black/20 to-transparent" />
                  </div>
                  
                  {/* Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-champagne-gold text-xs uppercase tracking-wider mb-0.5">{img.section}</p>
                    <p className="text-white font-semibold text-sm truncate">{img.label}</p>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-champagne-gold/0 group-hover:bg-champagne-gold/10 
                                transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-champagne-gold text-deep-black px-4 py-2 rounded-full text-sm font-semibold">
                      Tap to Replace
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
