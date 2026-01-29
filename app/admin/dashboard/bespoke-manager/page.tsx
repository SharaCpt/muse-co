'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Loader2, Check, Sparkles, Pencil, X, Camera, Plus, Trash2 } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface BespokeExperience {
  id: string
  experience_name: string
  tagline: string
  description: string
  price_label: string
  image_url: string
  features: string[]
  display_order: number
}

export default function BespokeManager() {
  const [experiences, setExperiences] = useState<BespokeExperience[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<BespokeExperience>>({})
  const [newFeature, setNewFeature] = useState('')
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchExperiences()
  }, [])

  async function fetchExperiences() {
    try {
      const { data, error } = await supabase
        .from('bespoke_experiences')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setExperiences(data || [])
    } catch (error) {
      showMessage('Could not load experiences. Please refresh.', 'error')
    } finally {
      setLoading(false)
    }
  }

  function showMessage(text: string, type: 'success' | 'error') {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 3000)
  }

  function startEditing(exp: BespokeExperience) {
    setEditingId(exp.id)
    setEditData({
      experience_name: exp.experience_name,
      tagline: exp.tagline,
      description: exp.description,
      price_label: exp.price_label,
      image_url: exp.image_url,
      features: [...(exp.features || [])],
    })
    setPreviewUrl(exp.image_url)
  }

  function cancelEditing() {
    setEditingId(null)
    setEditData({})
    setPreviewUrl(null)
    setNewFeature('')
  }

  function addFeature() {
    if (!newFeature.trim()) return
    setEditData({
      ...editData,
      features: [...(editData.features || []), newFeature.trim()]
    })
    setNewFeature('')
  }

  function removeFeature(index: number) {
    const newFeatures = [...(editData.features || [])]
    newFeatures.splice(index, 1)
    setEditData({ ...editData, features: newFeatures })
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return
    const file = e.target.files[0]
    
    // Show preview immediately
    const reader = new FileReader()
    reader.onload = (e) => setPreviewUrl(e.target?.result as string)
    reader.readAsDataURL(file)

    setUploadingImage(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `bespoke-${editingId}-${Date.now()}.${fileExt}`
      
      const { data, error } = await supabase.storage
        .from('website-images')
        .upload(fileName, file, { upsert: true })

      if (error) throw error

      const { data: urlData } = supabase.storage
        .from('website-images')
        .getPublicUrl(fileName)

      setEditData({ ...editData, image_url: urlData.publicUrl })
      showMessage('Image uploaded!', 'success')
    } catch (error) {
      console.error('Upload error:', error)
      showMessage('Could not upload image. Please try again.', 'error')
    } finally {
      setUploadingImage(false)
    }
  }

  async function saveExperience(id: string) {
    setSaving(id)
    try {
      const { error } = await supabase
        .from('bespoke_experiences')
        .update({
          experience_name: editData.experience_name,
          tagline: editData.tagline,
          description: editData.description,
          price_label: editData.price_label,
          image_url: editData.image_url,
          features: editData.features,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)

      if (error) throw error

      // Update local state
      setExperiences(experiences.map(exp => 
        exp.id === id ? { ...exp, ...editData } as BespokeExperience : exp
      ))
      
      setEditingId(null)
      setEditData({})
      setPreviewUrl(null)
      showMessage('Experience updated successfully!', 'success')
    } catch (error) {
      console.error('Error:', error)
      showMessage('Could not save. Please try again.', 'error')
    } finally {
      setSaving(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-deep-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-champagne-gold animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-deep-black text-off-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-champagne-gold/10 to-transparent border-b border-champagne-gold/20 p-6">
        <div className="max-w-5xl mx-auto">
          <Link 
            href="/admin/dashboard" 
            className="inline-flex items-center gap-2 text-champagne-gold hover:text-champagne-gold/80 mb-4 transition"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          <h1 className="font-playfair text-3xl md:text-4xl text-champagne-gold">
            Bespoke Experiences
          </h1>
          <p className="text-off-white/60 mt-2">
            Manage your premium luxury packages
          </p>
        </div>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
          message.type === 'success' 
            ? 'bg-green-500/90 text-white' 
            : 'bg-red-500/90 text-white'
        }`}>
          {message.text}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        {/* Info Box */}
        <div className="bg-champagne-gold/10 border border-champagne-gold/30 rounded-xl p-4 mb-8">
          <p className="text-champagne-gold text-sm">
            💎 <strong>Tip:</strong> These are the premium packages shown on your Pricing page. 
            You can change the name, description, image, and features for each experience.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-gradient-to-br from-charcoal/90 to-charcoal/60 border-2 border-champagne-gold/20 rounded-xl overflow-hidden hover:border-champagne-gold/40 transition-all"
            >
              {editingId === exp.id ? (
                /* Edit Mode */
                <div className="p-6 space-y-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-champagne-gold font-playfair text-xl flex items-center gap-2">
                      <Sparkles size={20} />
                      Editing Experience
                    </h3>
                    <button
                      onClick={cancelEditing}
                      className="text-off-white/60 hover:text-red-400 transition"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  {/* Image Upload */}
                  <div className="relative">
                    <label className="block text-off-white/70 text-sm mb-2">Experience Image</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="relative h-48 bg-deep-black rounded-lg overflow-hidden cursor-pointer group"
                    >
                      {(previewUrl || editData.image_url) && (
                        <Image
                          src={previewUrl || editData.image_url || ''}
                          alt="Preview"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      )}
                      <div className="absolute inset-0 bg-deep-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        {uploadingImage ? (
                          <Loader2 className="w-8 h-8 text-champagne-gold animate-spin" />
                        ) : (
                          <div className="text-center">
                            <Camera className="w-8 h-8 text-champagne-gold mx-auto mb-2" />
                            <span className="text-off-white text-sm">Tap to change image</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Name & Tagline */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-off-white/70 text-sm mb-1">Experience Name</label>
                      <input
                        type="text"
                        value={editData.experience_name || ''}
                        onChange={(e) => setEditData({ ...editData, experience_name: e.target.value })}
                        className="w-full bg-deep-black border border-champagne-gold/30 rounded-lg px-4 py-3 text-off-white focus:border-champagne-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-off-white/70 text-sm mb-1">Tagline</label>
                      <input
                        type="text"
                        value={editData.tagline || ''}
                        onChange={(e) => setEditData({ ...editData, tagline: e.target.value })}
                        className="w-full bg-deep-black border border-champagne-gold/30 rounded-lg px-4 py-3 text-off-white focus:border-champagne-gold focus:outline-none"
                        placeholder="e.g., Ultimate maritime luxury"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-off-white/70 text-sm mb-1">Description</label>
                    <textarea
                      value={editData.description || ''}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      rows={3}
                      className="w-full bg-deep-black border border-champagne-gold/30 rounded-lg px-4 py-3 text-off-white focus:border-champagne-gold focus:outline-none resize-none"
                    />
                  </div>

                  {/* Price Label */}
                  <div>
                    <label className="block text-off-white/70 text-sm mb-1">Price Label</label>
                    <input
                      type="text"
                      value={editData.price_label || ''}
                      onChange={(e) => setEditData({ ...editData, price_label: e.target.value })}
                      className="w-full bg-deep-black border border-champagne-gold/30 rounded-lg px-4 py-3 text-off-white focus:border-champagne-gold focus:outline-none"
                      placeholder="e.g., POA, From R50,000"
                    />
                  </div>

                  {/* Features */}
                  <div>
                    <label className="block text-off-white/70 text-sm mb-2">Features (bullet points)</label>
                    <div className="space-y-2 mb-3">
                      {(editData.features || []).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-deep-black/50 rounded-lg px-3 py-2">
                          <span className="text-champagne-gold">◆</span>
                          <span className="flex-1 text-off-white text-sm">{feature}</span>
                          <button
                            onClick={() => removeFeature(idx)}
                            className="text-red-400/60 hover:text-red-400 transition"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addFeature()}
                        placeholder="Add a feature..."
                        className="flex-1 bg-deep-black border border-champagne-gold/30 rounded-lg px-4 py-2 text-off-white focus:border-champagne-gold focus:outline-none text-sm"
                      />
                      <button
                        onClick={addFeature}
                        className="px-4 py-2 bg-champagne-gold/20 border border-champagne-gold/30 text-champagne-gold rounded-lg hover:bg-champagne-gold/30 transition"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Save/Cancel Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => saveExperience(exp.id)}
                      disabled={saving === exp.id}
                      className="flex-1 flex items-center justify-center gap-2 bg-champagne-gold text-deep-black py-3 rounded-lg font-semibold hover:bg-champagne-gold/90 transition disabled:opacity-50"
                    >
                      {saving === exp.id ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : (
                        <Check size={20} />
                      )}
                      Save Changes
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="px-6 py-3 border border-off-white/30 text-off-white rounded-lg hover:border-off-white/50 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0">
                    {exp.image_url && (
                      <Image
                        src={exp.image_url}
                        alt={exp.experience_name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-champagne-gold/60 text-xs tracking-wider uppercase mb-1">
                          {exp.tagline}
                        </p>
                        <h3 className="font-playfair text-2xl text-off-white">
                          {exp.experience_name}
                        </h3>
                      </div>
                      <button
                        onClick={() => startEditing(exp)}
                        className="flex items-center gap-2 px-4 py-2 bg-champagne-gold/10 border border-champagne-gold/30 text-champagne-gold rounded-lg hover:bg-champagne-gold/20 transition"
                      >
                        <Pencil size={18} />
                        Edit
                      </button>
                    </div>
                    
                    <p className="text-off-white/60 text-sm mb-4 line-clamp-2">
                      {exp.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(exp.features || []).slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="text-xs text-off-white/50 bg-deep-black/50 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                      {(exp.features || []).length > 3 && (
                        <span className="text-xs text-champagne-gold">
                          +{(exp.features || []).length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <div className="text-champagne-gold text-xl font-light">
                      {exp.price_label}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center text-off-white/50 text-sm">
          <p>Changes appear on the Pricing page immediately after saving.</p>
        </div>
      </div>
    </div>
  )
}
