'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'
import { Upload, Trash2, GripVertical, Save } from 'lucide-react'

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

export default function PortfolioManager() {
  const [images, setImages] = useState<PortfolioImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  // New image form
  const [newImage, setNewImage] = useState({
    name: '',
    category: '',
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
      showMessage('Error loading images: ' + error.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return
    setSelectedFile(e.target.files[0])
  }

  async function uploadImage() {
    if (!selectedFile || !newImage.name || !newImage.category) {
      showMessage('Please fill all fields and select an image', 'error')
      return
    }

    setUploading(true)

    try {
      // Create storage bucket if it doesn't exist
      const { data: buckets } = await supabase.storage.listBuckets()
      if (!buckets?.find(b => b.name === 'portfolio')) {
        await supabase.storage.createBucket('portfolio', { public: true })
      }

      // Upload file to Supabase Storage
      const fileExt = selectedFile.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, selectedFile)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('portfolio')
        .getPublicUrl(filePath)

      // Insert into database
      const { error: dbError } = await supabase
        .from('portfolio_images')
        .insert({
          name: newImage.name,
          category: newImage.category,
          description: newImage.description,
          image_url: urlData.publicUrl,
          display_order: images.length,
        })

      if (dbError) throw dbError

      showMessage('Image uploaded successfully!', 'success')
      setNewImage({ name: '', category: '', description: '' })
      setSelectedFile(null)
      fetchImages()
    } catch (error: any) {
      showMessage('Upload failed: ' + error.message, 'error')
    } finally {
      setUploading(false)
    }
  }

  async function deleteImage(id: string, imageUrl: string) {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      // Extract file path from URL
      const urlParts = imageUrl.split('/portfolio/')
      if (urlParts.length > 1) {
        await supabase.storage.from('portfolio').remove([urlParts[1]])
      }

      // Delete from database
      const { error } = await supabase
        .from('portfolio_images')
        .delete()
        .eq('id', id)

      if (error) throw error

      showMessage('Image deleted', 'success')
      fetchImages()
    } catch (error: any) {
      showMessage('Delete failed: ' + error.message, 'error')
    }
  }

  async function updateOrder(id: string, newOrder: number) {
    try {
      const { error } = await supabase
        .from('portfolio_images')
        .update({ display_order: newOrder })
        .eq('id', id)

      if (error) throw error
      fetchImages()
    } catch (error: any) {
      showMessage('Update failed: ' + error.message, 'error')
    }
  }

  function showMessage(msg: string, type: 'success' | 'error') {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-deep-black text-off-white flex items-center justify-center">
        <p className="text-champagne-gold">Loading portfolio...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-deep-black text-off-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-playfair text-4xl md:text-5xl text-champagne-gold mb-2">
            Portfolio Manager
          </h1>
          <p className="text-off-white/60">Upload and manage portfolio images</p>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded ${message.includes('failed') || message.includes('Error') ? 'bg-red-500/20 border border-red-500' : 'bg-green-500/20 border border-green-500'}`}>
            <p className="text-sm">{message}</p>
          </div>
        )}

        {/* Upload Form */}
        <div className="bg-charcoal/50 border border-champagne-gold/20 p-6 rounded mb-8">
          <h2 className="text-2xl font-playfair text-champagne-gold mb-4">Add New Image</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-2">Model Name</label>
              <input
                type="text"
                value={newImage.name}
                onChange={(e) => setNewImage({ ...newImage, name: e.target.value })}
                className="w-full bg-deep-black border border-champagne-gold/30 p-3 rounded focus:border-champagne-gold outline-none"
                placeholder="e.g., Available on Request"
              />
            </div>
            
            <div>
              <label className="block text-sm mb-2">Category</label>
              <input
                type="text"
                value={newImage.category}
                onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                className="w-full bg-deep-black border border-champagne-gold/30 p-3 rounded focus:border-champagne-gold outline-none"
                placeholder="e.g., Elite Model"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Description</label>
            <textarea
              value={newImage.description}
              onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
              className="w-full bg-deep-black border border-champagne-gold/30 p-3 rounded focus:border-champagne-gold outline-none"
              rows={2}
              placeholder="Brief description"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Image File</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="w-full bg-deep-black border border-champagne-gold/30 p-3 rounded file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-champagne-gold file:text-deep-black file:cursor-pointer"
            />
            {selectedFile && (
              <p className="text-sm text-champagne-gold/70 mt-2">Selected: {selectedFile.name}</p>
            )}
          </div>

          <button
            onClick={uploadImage}
            disabled={uploading}
            className="bg-champagne-gold text-deep-black px-8 py-3 rounded font-semibold hover:bg-champagne-gold/90 transition disabled:opacity-50 flex items-center gap-2"
          >
            <Upload size={20} />
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>

        {/* Current Images */}
        <div>
          <h2 className="text-2xl font-playfair text-champagne-gold mb-4">Current Portfolio</h2>
          
          {images.length === 0 ? (
            <p className="text-off-white/60">No images yet. Upload your first image above!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((img) => (
                <div key={img.id} className="bg-charcoal/50 border border-champagne-gold/20 rounded overflow-hidden">
                  <div className="relative h-64">
                    <Image
                      src={img.image_url}
                      alt={img.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="p-4">
                    <p className="text-champagne-gold text-sm mb-1">{img.category}</p>
                    <p className="font-semibold mb-2">{img.name}</p>
                    {img.description && (
                      <p className="text-sm text-off-white/60 mb-4">{img.description}</p>
                    )}
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => deleteImage(img.id, img.image_url)}
                        className="flex-1 bg-red-500/20 border border-red-500 text-red-500 py-2 px-4 rounded hover:bg-red-500/30 transition flex items-center justify-center gap-2"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
