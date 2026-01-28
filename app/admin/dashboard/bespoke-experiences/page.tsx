'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { motion } from 'framer-motion'

interface BespokeExperience {
  id: string
  experience_name: string
  tagline: string
  description: string
  price: number | null
  price_label: string
  image_url: string | null
  features: string[]
  display_order: number
  is_active: boolean
}

export default function AdminBespokeExperiencesPage() {
  const [experiences, setExperiences] = useState<BespokeExperience[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<BespokeExperience>>({})
  const [isCreating, setIsCreating] = useState(false)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    fetchExperiences()
  }, [])

  async function fetchExperiences() {
    try {
      const { data, error } = await supabase
        .from('bespoke_experiences')
        .select('*')
        .order('display_order')

      if (error) throw error
      setExperiences(data || [])
    } catch (error) {
      console.error('Error fetching experiences:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    try {
      if (isCreating) {
        const { error } = await supabase
          .from('bespoke_experiences')
          .insert([formData])
        
        if (error) throw error
      } else if (editingId) {
        const { error } = await supabase
          .from('bespoke_experiences')
          .update(formData)
          .eq('id', editingId)
        
        if (error) throw error
      }

      await fetchExperiences()
      setEditingId(null)
      setIsCreating(false)
      setFormData({})
    } catch (error) {
      console.error('Error saving experience:', error)
      alert('Error saving experience. Please try again.')
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this bespoke experience?')) return

    try {
      const { error } = await supabase
        .from('bespoke_experiences')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      await fetchExperiences()
    } catch (error) {
      console.error('Error deleting experience:', error)
      alert('Error deleting experience. Please try again.')
    }
  }

  function startEdit(experience: BespokeExperience) {
    setEditingId(experience.id)
    setFormData(experience)
    setIsCreating(false)
  }

  function startCreate() {
    setIsCreating(true)
    setEditingId(null)
    setFormData({
      experience_name: '',
      tagline: '',
      description: '',
      price: null,
      price_label: 'POA',
      image_url: '',
      features: [],
      display_order: experiences.length + 1,
      is_active: true,
    })
  }

  function cancelEdit() {
    setEditingId(null)
    setIsCreating(false)
    setFormData({})
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="w-12 h-12 border-4 border-champagne-gold/30 border-t-champagne-gold rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-playfair text-champagne-gold">Bespoke Experiences</h1>
        <button
          onClick={startCreate}
          className="px-6 py-3 bg-champagne-gold text-deep-black hover:bg-champagne-gold/90 transition-all tracking-wider"
        >
          + NEW EXPERIENCE
        </button>
      </div>

      {/* Create/Edit Form */}
      {(isCreating || editingId) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-charcoal p-6 rounded mb-8 border border-champagne-gold/30"
        >
          <h2 className="text-xl text-champagne-gold mb-6 font-playfair">
            {isCreating ? 'Create New Experience' : 'Edit Experience'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-off-white/70 mb-2 text-sm">Experience Name</label>
              <input
                type="text"
                value={formData.experience_name || ''}
                onChange={(e) => setFormData({ ...formData, experience_name: e.target.value })}
                className="w-full bg-deep-black border border-champagne-gold/30 px-4 py-2 text-off-white focus:border-champagne-gold outline-none"
                placeholder="e.g., RIVIERA ESCAPE"
              />
            </div>

            <div>
              <label className="block text-off-white/70 mb-2 text-sm">Tagline</label>
              <input
                type="text"
                value={formData.tagline || ''}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full bg-deep-black border border-champagne-gold/30 px-4 py-2 text-off-white focus:border-champagne-gold outline-none"
                placeholder="e.g., Curated luxury coastal experiences"
              />
            </div>

            <div>
              <label className="block text-off-white/70 mb-2 text-sm">Price Label</label>
              <input
                type="text"
                value={formData.price_label || ''}
                onChange={(e) => setFormData({ ...formData, price_label: e.target.value })}
                className="w-full bg-deep-black border border-champagne-gold/30 px-4 py-2 text-off-white focus:border-champagne-gold outline-none"
                placeholder="POA or From R50,000"
              />
            </div>

            <div>
              <label className="block text-off-white/70 mb-2 text-sm">Display Order</label>
              <input
                type="number"
                value={formData.display_order || 0}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                className="w-full bg-deep-black border border-champagne-gold/30 px-4 py-2 text-off-white focus:border-champagne-gold outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-off-white/70 mb-2 text-sm">Image URL</label>
              <input
                type="text"
                value={formData.image_url || ''}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="w-full bg-deep-black border border-champagne-gold/30 px-4 py-2 text-off-white focus:border-champagne-gold outline-none"
                placeholder="https://images.unsplash.com/..."
              />
              <p className="text-off-white/50 text-xs mt-1">Leave empty for default image</p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-off-white/70 mb-2 text-sm">Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-deep-black border border-champagne-gold/30 px-4 py-2 text-off-white focus:border-champagne-gold outline-none h-24"
                placeholder="Exclusive weekend getaways with South Africa's most sophisticated companions..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-off-white/70 mb-2 text-sm">
                Features (one per line)
              </label>
              <textarea
                value={formData.features?.join('\n') || ''}
                onChange={(e) => setFormData({ ...formData, features: e.target.value.split('\n').filter(f => f.trim()) })}
                className="w-full bg-deep-black border border-champagne-gold/30 px-4 py-2 text-off-white focus:border-champagne-gold outline-none h-32"
                placeholder="Private villa accommodation&#10;Luxury yacht charter&#10;Elite companion&#10;Curated dining experiences"
              />
            </div>

            <div className="flex items-center gap-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_active ?? true}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-5 h-5"
                />
                <span className="text-off-white/80">Active</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSave}
              className="px-8 py-3 bg-champagne-gold text-deep-black hover:bg-champagne-gold/90 transition-all tracking-wider"
            >
              SAVE
            </button>
            <button
              onClick={cancelEdit}
              className="px-8 py-3 border border-champagne-gold/50 text-off-white hover:bg-champagne-gold/10 transition-all tracking-wider"
            >
              CANCEL
            </button>
          </div>
        </motion.div>
      )}

      {/* Experiences Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experiences.map((experience) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-charcoal p-6 rounded border border-champagne-gold/20 hover:border-champagne-gold/40 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-playfair text-champagne-gold mb-1">
                  {experience.experience_name}
                </h3>
                <p className="text-sm text-off-white/60 italic">{experience.tagline}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-off-white/50">#{experience.display_order}</span>
                <span className={`text-xs px-2 py-1 ${experience.is_active ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                  {experience.is_active ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </div>
            </div>

            <p className="text-off-white/70 text-sm mb-4 line-clamp-2">
              {experience.description}
            </p>

            <div className="mb-4">
              <span className="text-champagne-gold text-lg font-light">
                {experience.price_label}
              </span>
            </div>

            {experience.features && experience.features.length > 0 && (
              <ul className="space-y-1 mb-4">
                {experience.features.slice(0, 3).map((feature, i) => (
                  <li key={i} className="text-off-white/60 text-xs flex items-start">
                    <span className="text-champagne-gold mr-2">◆</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex gap-3 mt-4 pt-4 border-t border-champagne-gold/20">
              <button
                onClick={() => startEdit(experience)}
                className="flex-1 py-2 border border-champagne-gold/50 text-champagne-gold hover:bg-champagne-gold/10 transition-all text-sm tracking-wider"
              >
                EDIT
              </button>
              <button
                onClick={() => handleDelete(experience.id)}
                className="flex-1 py-2 border border-red-400/50 text-red-400 hover:bg-red-400/10 transition-all text-sm tracking-wider"
              >
                DELETE
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {experiences.length === 0 && (
        <div className="text-center py-20 text-off-white/50">
          <p>No bespoke experiences yet. Create your first one!</p>
        </div>
      )}
    </div>
  )
}
