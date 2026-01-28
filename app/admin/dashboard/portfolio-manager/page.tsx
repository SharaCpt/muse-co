'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, Trash2, X, Camera, Check, ArrowLeft, Loader2 } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface PortfolioImage {
  id: string
  name: string
  category: string
  description: string
  image_url: string
  display_order: number
  is_active: boolean
}

const CATEGORIES = [
  'Elite Model',
  'VIP Hostess',
  'Brand Ambassador',
  'Event Hostess',
  'Travel Companion',
  'Yacht Staff',
]

export default function PortfolioManager() {
  const [images, setImages] = useState<PortfolioImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<PortfolioImage | null>(null)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // New image form
  const [newImage, setNewImage] = useState({
    name: '',
    category: 'Elite Model',
    description: '',
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    fetchImages()
  }, [])

  async function fetchImages() {
    try {
      const { data, error } = await supabase
        .from('portfolio_images')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })

      if (error) throw error
      setImages(data || [])
    } catch (error: any) {
      showMessage('Could not load profiles. Please refresh.', 'error')
    } finally {
      setLoading(false)
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return
    const file = e.target.files[0]
    setSelectedFile(file)
    
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  async function uploadImage() {
    if (!selectedFile) {
      showMessage('Please select a photo first', 'error')
      return
    }
    if (!newImage.name.trim()) {
      showMessage('Please enter a name', 'error')
      return
    }

    setUploading(true)

    try {
      // Upload file to Supabase Storage
      const fileExt = selectedFile.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(fileName, selectedFile)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('portfolio')
        .getPublicUrl(fileName)

      // Insert into database
      const { error: dbError } = await supabase
        .from('portfolio_images')
        .insert({
          name: newImage.name.trim(),
          category: newImage.category,
          description: newImage.description.trim(),
          image_url: urlData.publicUrl,
          display_order: images.length,
        })

      if (dbError) throw dbError

      showMessage('✓ Profile added successfully!', 'success')
      resetForm()
      fetchImages()
    } catch (error: any) {
      showMessage('Upload failed. Please try again.', 'error')
    } finally {
      setUploading(false)
    }
  }

  async function deleteImage() {
    if (!showDeleteConfirm) return
    
    const { id, image_url, name } = showDeleteConfirm
    setDeleting(id)

    try {
      // Extract file path from URL and delete from storage
      const urlParts = image_url.split('/portfolio/')
      if (urlParts.length > 1) {
        await supabase.storage.from('portfolio').remove([urlParts[1]])
      }

      // Delete from database
      const { error } = await supabase
        .from('portfolio_images')
        .delete()
        .eq('id', id)

      if (error) throw error

      showMessage(`✓ ${name} has been removed`, 'success')
      setShowDeleteConfirm(null)
      fetchImages()
    } catch (error: any) {
      showMessage('Could not delete. Please try again.', 'error')
    } finally {
      setDeleting(null)
    }
  }

  function resetForm() {
    setNewImage({ name: '', category: 'Elite Model', description: '' })
    setSelectedFile(null)
    setPreviewUrl(null)
    setShowAddForm(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function showMessage(text: string, type: 'success' | 'error') {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 4000)
  }

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-deep-black text-off-white flex flex-col items-center justify-center p-6">
        <Loader2 className="w-12 h-12 text-champagne-gold animate-spin mb-4" />
        <p className="text-champagne-gold text-lg">Loading profiles...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-deep-black text-off-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-deep-black/95 backdrop-blur-sm border-b border-champagne-gold/20 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              href="/admin/dashboard" 
              className="p-2 rounded-full hover:bg-champagne-gold/10 transition"
            >
              <ArrowLeft className="w-6 h-6 text-champagne-gold" />
            </Link>
            <div>
              <h1 className="font-playfair text-2xl md:text-3xl text-champagne-gold">
                Profiles
              </h1>
              <p className="text-off-white/50 text-sm">{images.length} models</p>
            </div>
          </div>
          
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-champagne-gold text-deep-black px-5 py-3 rounded-full font-semibold 
                         hover:bg-champagne-gold/90 active:scale-95 transition-all duration-200
                         flex items-center gap-2 shadow-lg shadow-champagne-gold/20"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add Profile</span>
            </button>
          )}
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-black/90">
          <div className="bg-charcoal border border-champagne-gold/30 rounded-2xl p-6 max-w-sm w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-playfair text-off-white mb-2">Delete Profile?</h3>
              <p className="text-off-white/60">
                Are you sure you want to remove <span className="text-champagne-gold font-semibold">{showDeleteConfirm.name}</span>? 
                This cannot be undone.
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 py-4 px-6 rounded-xl border border-champagne-gold/30 text-off-white 
                           hover:bg-champagne-gold/10 active:scale-95 transition-all text-lg"
              >
                Cancel
              </button>
              <button
                onClick={deleteImage}
                disabled={deleting === showDeleteConfirm.id}
                className="flex-1 py-4 px-6 rounded-xl bg-red-500 text-white font-semibold
                           hover:bg-red-600 active:scale-95 transition-all text-lg
                           disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleting === showDeleteConfirm.id ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Trash2 className="w-5 h-5" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Profile Form (Full Screen on Mobile) */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-deep-black overflow-y-auto">
          <div className="min-h-screen p-4">
            {/* Form Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-playfair text-2xl text-champagne-gold">Add New Profile</h2>
              <button
                onClick={resetForm}
                className="p-2 rounded-full hover:bg-champagne-gold/10 transition"
              >
                <X className="w-6 h-6 text-off-white" />
              </button>
            </div>

            {/* Photo Upload - BIG and OBVIOUS */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`relative aspect-[3/4] max-w-sm mx-auto mb-6 rounded-2xl overflow-hidden cursor-pointer
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
                    <p className="text-white text-sm">Tap to change photo</p>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-charcoal/50">
                  <div className="w-20 h-20 bg-champagne-gold/20 rounded-full flex items-center justify-center mb-4">
                    <Camera className="w-10 h-10 text-champagne-gold" />
                  </div>
                  <p className="text-champagne-gold text-lg font-semibold">Tap to Add Photo</p>
                  <p className="text-off-white/50 text-sm mt-1">From camera or photo library</p>
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

            {/* Form Fields */}
            <div className="max-w-sm mx-auto space-y-4">
              {/* Name */}
              <div>
                <label className="block text-champagne-gold text-sm font-medium mb-2">
                  Display Name *
                </label>
                <input
                  type="text"
                  value={newImage.name}
                  onChange={(e) => setNewImage({ ...newImage, name: e.target.value })}
                  className="w-full bg-charcoal/50 border-2 border-champagne-gold/30 p-4 rounded-xl 
                           text-lg text-off-white placeholder-off-white/40
                           focus:border-champagne-gold focus:outline-none transition"
                  placeholder="e.g., Sophia"
                />
              </div>

              {/* Category - Big Buttons */}
              <div>
                <label className="block text-champagne-gold text-sm font-medium mb-2">
                  Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setNewImage({ ...newImage, category: cat })}
                      className={`p-3 rounded-xl text-sm font-medium transition-all
                        ${newImage.category === cat
                          ? 'bg-champagne-gold text-deep-black'
                          : 'bg-charcoal/50 border border-champagne-gold/30 text-off-white hover:border-champagne-gold/60'
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description (Optional) */}
              <div>
                <label className="block text-champagne-gold text-sm font-medium mb-2">
                  Description <span className="text-off-white/40">(optional)</span>
                </label>
                <textarea
                  value={newImage.description}
                  onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
                  className="w-full bg-charcoal/50 border-2 border-champagne-gold/30 p-4 rounded-xl 
                           text-lg text-off-white placeholder-off-white/40
                           focus:border-champagne-gold focus:outline-none transition resize-none"
                  rows={2}
                  placeholder="Brief description..."
                />
              </div>

              {/* Submit Button - HUGE */}
              <button
                onClick={uploadImage}
                disabled={uploading || !selectedFile || !newImage.name.trim()}
                className="w-full bg-champagne-gold text-deep-black py-5 rounded-xl font-bold text-xl
                         hover:bg-champagne-gold/90 active:scale-[0.98] transition-all duration-200
                         disabled:opacity-40 disabled:cursor-not-allowed
                         flex items-center justify-center gap-3 mt-6
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
                    Add Profile
                  </>
                )}
              </button>

              {/* Cancel Link */}
              <button
                onClick={resetForm}
                className="w-full py-4 text-off-white/60 hover:text-off-white transition text-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Grid */}
      <div className="p-4 pb-24">
        {images.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-champagne-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-12 h-12 text-champagne-gold/50" />
            </div>
            <p className="text-off-white/60 text-lg mb-4">No profiles yet</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-champagne-gold text-deep-black px-8 py-4 rounded-full font-semibold text-lg
                       hover:bg-champagne-gold/90 active:scale-95 transition-all"
            >
              Add Your First Profile
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {images.map((img) => (
              <div 
                key={img.id} 
                className="group relative bg-charcoal/30 rounded-xl overflow-hidden
                         border border-champagne-gold/10 hover:border-champagne-gold/30 transition"
              >
                {/* Image */}
                <div className="relative aspect-[3/4]">
                  <Image
                    src={img.image_url}
                    alt={img.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-transparent to-transparent" />
                </div>
                
                {/* Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-champagne-gold text-xs uppercase tracking-wider mb-0.5">{img.category}</p>
                  <p className="text-white font-semibold text-sm truncate">{img.name}</p>
                </div>

                {/* Delete Button - Always visible on mobile */}
                <button
                  onClick={() => setShowDeleteConfirm(img)}
                  className="absolute top-2 right-2 p-2.5 bg-red-500/90 hover:bg-red-500 rounded-full
                           transition-all active:scale-90 shadow-lg"
                  aria-label={`Delete ${img.name}`}
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Add Button (Mobile) */}
      {!showAddForm && images.length > 0 && (
        <div className="fixed bottom-6 right-6 md:hidden">
          <button
            onClick={() => setShowAddForm(true)}
            className="w-16 h-16 bg-champagne-gold rounded-full shadow-xl shadow-champagne-gold/40
                     flex items-center justify-center active:scale-90 transition-transform"
          >
            <Plus className="w-8 h-8 text-deep-black" />
          </button>
        </div>
      )}
    </div>
  )
}
