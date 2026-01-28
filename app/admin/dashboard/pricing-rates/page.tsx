'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { motion } from 'framer-motion'

interface PricingRate {
  id: string
  package_name: string
  duration: string
  price: number
  description: string
  features: string[]
  is_featured: boolean
  display_order: number
  is_active: boolean
}

export default function AdminPricingRatesPage() {
  const [rates, setRates] = useState<PricingRate[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<PricingRate>>({})
  const [isCreating, setIsCreating] = useState(false)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchRates()
  }, [])

  async function fetchRates() {
    try {
      const { data, error } = await supabase
        .from('pricing_rates')
        .select('*')
        .order('display_order')

      if (error) throw error
      setRates(data || [])
    } catch (error) {
      console.error('Error fetching rates:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    try {
      if (isCreating) {
        const { error } = await supabase
          .from('pricing_rates')
          .insert([formData])
        
        if (error) throw error
      } else if (editingId) {
        const { error } = await supabase
          .from('pricing_rates')
          .update(formData)
          .eq('id', editingId)
        
        if (error) throw error
      }

      await fetchRates()
      setEditingId(null)
      setIsCreating(false)
      setFormData({})
    } catch (error) {
      console.error('Error saving rate:', error)
      alert('Error saving rate. Please try again.')
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this pricing rate?')) return

    try {
      const { error } = await supabase
        .from('pricing_rates')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      await fetchRates()
    } catch (error) {
      console.error('Error deleting rate:', error)
      alert('Error deleting rate. Please try again.')
    }
  }

  function startEdit(rate: PricingRate) {
    setEditingId(rate.id)
    setFormData(rate)
    setIsCreating(false)
  }

  function startCreate() {
    setIsCreating(true)
    setEditingId(null)
    setFormData({
      package_name: '',
      duration: '',
      price: 0,
      description: '',
      features: [],
      is_featured: false,
      display_order: rates.length + 1,
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
        <h1 className="text-3xl font-playfair text-champagne-gold">Standard Pricing Rates</h1>
        <button
          onClick={startCreate}
          className="px-6 py-3 bg-champagne-gold text-deep-black hover:bg-champagne-gold/90 transition-all tracking-wider"
        >
          + NEW RATE
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
            {isCreating ? 'Create New Rate' : 'Edit Rate'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-off-white/70 mb-2 text-sm">Package Name</label>
              <input
                type="text"
                value={formData.package_name || ''}
                onChange={(e) => setFormData({ ...formData, package_name: e.target.value })}
                className="w-full bg-deep-black border border-champagne-gold/30 px-4 py-2 text-off-white focus:border-champagne-gold outline-none"
                placeholder="e.g., EXCLUSIVE HOUR"
              />
            </div>

            <div>
              <label className="block text-off-white/70 mb-2 text-sm">Duration</label>
              <input
                type="text"
                value={formData.duration || ''}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full bg-deep-black border border-champagne-gold/30 px-4 py-2 text-off-white focus:border-champagne-gold outline-none"
                placeholder="e.g., 1 Hour"
              />
            </div>

            <div>
              <label className="block text-off-white/70 mb-2 text-sm">Price (R)</label>
              <input
                type="number"
                value={formData.price || 0}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full bg-deep-black border border-champagne-gold/30 px-4 py-2 text-off-white focus:border-champagne-gold outline-none"
                placeholder="8000"
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
              <label className="block text-off-white/70 mb-2 text-sm">Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-deep-black border border-champagne-gold/30 px-4 py-2 text-off-white focus:border-champagne-gold outline-none h-24"
                placeholder="Perfect for intimate gatherings..."
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
                placeholder="Elite model or hostess&#10;Professional presentation&#10;Absolute discretion"
              />
            </div>

            <div className="flex items-center gap-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_featured || false}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="w-5 h-5"
                />
                <span className="text-off-white/80">Featured/Popular</span>
              </label>

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

      {/* Rates Table */}
      <div className="bg-charcoal rounded overflow-hidden">
        <table className="w-full">
          <thead className="bg-deep-black">
            <tr>
              <th className="text-left p-4 text-champagne-gold font-inter tracking-wider text-sm">Order</th>
              <th className="text-left p-4 text-champagne-gold font-inter tracking-wider text-sm">Package</th>
              <th className="text-left p-4 text-champagne-gold font-inter tracking-wider text-sm">Duration</th>
              <th className="text-left p-4 text-champagne-gold font-inter tracking-wider text-sm">Price</th>
              <th className="text-left p-4 text-champagne-gold font-inter tracking-wider text-sm">Status</th>
              <th className="text-right p-4 text-champagne-gold font-inter tracking-wider text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((rate) => (
              <tr key={rate.id} className="border-t border-champagne-gold/10 hover:bg-deep-black/50">
                <td className="p-4 text-off-white">{rate.display_order}</td>
                <td className="p-4">
                  <div className="text-off-white font-medium">{rate.package_name}</div>
                  {rate.is_featured && (
                    <span className="text-xs text-champagne-gold">★ FEATURED</span>
                  )}
                </td>
                <td className="p-4 text-off-white/80">{rate.duration}</td>
                <td className="p-4 text-champagne-gold font-medium">
                  R{rate.price.toLocaleString('en-ZA')}
                </td>
                <td className="p-4">
                  <span className={`text-xs px-3 py-1 ${rate.is_active ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                    {rate.is_active ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => startEdit(rate)}
                    className="text-champagne-gold hover:text-champagne-gold/70 mr-4 text-sm tracking-wider"
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => handleDelete(rate.id)}
                    className="text-red-400 hover:text-red-300 text-sm tracking-wider"
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
