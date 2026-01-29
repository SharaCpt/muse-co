'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { ArrowLeft, Loader2, Check, DollarSign, Pencil, X } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface PricingRate {
  id: string
  package_name: string
  duration: string
  price: number
  description: string
  features: string[]
  is_featured: boolean
  display_order: number
}

export default function PricingManager() {
  const [rates, setRates] = useState<PricingRate[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<PricingRate>>({})
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    fetchRates()
  }, [])

  async function fetchRates() {
    try {
      const { data, error } = await supabase
        .from('pricing_rates')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setRates(data || [])
    } catch (error) {
      showMessage('Could not load pricing. Please refresh.', 'error')
    } finally {
      setLoading(false)
    }
  }

  function showMessage(text: string, type: 'success' | 'error') {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 3000)
  }

  function startEditing(rate: PricingRate) {
    setEditingId(rate.id)
    setEditData({
      package_name: rate.package_name,
      duration: rate.duration,
      price: rate.price,
      description: rate.description,
    })
  }

  function cancelEditing() {
    setEditingId(null)
    setEditData({})
  }

  async function saveRate(id: string) {
    setSaving(id)
    try {
      const { error } = await supabase
        .from('pricing_rates')
        .update({
          package_name: editData.package_name,
          duration: editData.duration,
          price: editData.price,
          description: editData.description,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)

      if (error) throw error

      // Update local state
      setRates(rates.map(r => 
        r.id === id ? { ...r, ...editData } as PricingRate : r
      ))
      
      setEditingId(null)
      setEditData({})
      showMessage('Price updated successfully!', 'success')
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
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/admin/dashboard" 
            className="inline-flex items-center gap-2 text-champagne-gold hover:text-champagne-gold/80 mb-4 transition"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          <h1 className="font-playfair text-3xl md:text-4xl text-champagne-gold">
            Pricing Manager
          </h1>
          <p className="text-off-white/60 mt-2">
            Update your standard rates and packages
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {/* Info Box */}
        <div className="bg-champagne-gold/10 border border-champagne-gold/30 rounded-xl p-4 mb-8">
          <p className="text-champagne-gold text-sm">
            💡 <strong>Tip:</strong> Tap the edit button on any card to change the price, name, or description. 
            Changes appear on the website immediately after saving.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="space-y-6">
          {rates.map((rate) => (
            <div
              key={rate.id}
              className="bg-gradient-to-br from-charcoal/90 to-charcoal/60 border-2 border-champagne-gold/20 rounded-xl p-6 hover:border-champagne-gold/40 transition-all"
            >
              {editingId === rate.id ? (
                /* Edit Mode */
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-champagne-gold font-playfair text-xl">Editing Rate</h3>
                    <button
                      onClick={cancelEditing}
                      className="text-off-white/60 hover:text-red-400 transition"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-off-white/70 text-sm mb-1">Package Name</label>
                      <input
                        type="text"
                        value={editData.package_name || ''}
                        onChange={(e) => setEditData({ ...editData, package_name: e.target.value })}
                        className="w-full bg-deep-black border border-champagne-gold/30 rounded-lg px-4 py-3 text-off-white focus:border-champagne-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-off-white/70 text-sm mb-1">Duration</label>
                      <input
                        type="text"
                        value={editData.duration || ''}
                        onChange={(e) => setEditData({ ...editData, duration: e.target.value })}
                        className="w-full bg-deep-black border border-champagne-gold/30 rounded-lg px-4 py-3 text-off-white focus:border-champagne-gold focus:outline-none"
                        placeholder="e.g., 1 Hour, 2 Hours, Full Day"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-off-white/70 text-sm mb-1">Price (Rands)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-champagne-gold">R</span>
                      <input
                        type="number"
                        value={editData.price || ''}
                        onChange={(e) => setEditData({ ...editData, price: parseFloat(e.target.value) })}
                        className="w-full bg-deep-black border border-champagne-gold/30 rounded-lg pl-10 pr-4 py-3 text-off-white focus:border-champagne-gold focus:outline-none text-2xl font-light"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-off-white/70 text-sm mb-1">Description</label>
                    <textarea
                      value={editData.description || ''}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      rows={2}
                      className="w-full bg-deep-black border border-champagne-gold/30 rounded-lg px-4 py-3 text-off-white focus:border-champagne-gold focus:outline-none resize-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => saveRate(rate.id)}
                      disabled={saving === rate.id}
                      className="flex-1 flex items-center justify-center gap-2 bg-champagne-gold text-deep-black py-3 rounded-lg font-semibold hover:bg-champagne-gold/90 transition disabled:opacity-50"
                    >
                      {saving === rate.id ? (
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
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-champagne-gold/60 text-sm tracking-wider">{rate.duration}</span>
                      {rate.is_featured && (
                        <span className="bg-champagne-gold/20 text-champagne-gold text-xs px-2 py-1 rounded">
                          POPULAR
                        </span>
                      )}
                    </div>
                    <h3 className="font-playfair text-2xl text-off-white mb-2">{rate.package_name}</h3>
                    <p className="text-off-white/60 text-sm mb-4">{rate.description}</p>
                    <div className="text-champagne-gold text-4xl font-light">
                      R{rate.price.toLocaleString('en-ZA')}
                    </div>
                  </div>
                  <button
                    onClick={() => startEditing(rate)}
                    className="flex items-center gap-2 px-4 py-2 bg-champagne-gold/10 border border-champagne-gold/30 text-champagne-gold rounded-lg hover:bg-champagne-gold/20 transition"
                  >
                    <Pencil size={18} />
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center text-off-white/50 text-sm">
          <p>Changes are saved to the database and appear on the pricing page immediately.</p>
        </div>
      </div>
    </div>
  )
}
