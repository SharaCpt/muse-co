'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { ArrowLeft, Loader2, Check, Type } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface SiteContent {
  id: string
  page: string
  section: string
  content: string
}

// Default content that can be edited
const DEFAULT_CONTENT: SiteContent[] = [
  {
    id: 'home_hero_tagline',
    page: 'Homepage',
    section: 'Hero Tagline',
    content: 'Elite Companions • VIP Experiences • Global Luxury'
  },
  {
    id: 'home_hero_subtitle',
    page: 'Homepage',
    section: 'Hero Subtitle',
    content: "Curating South Africa's most beautiful models and sophisticated companions for luxury experiences worldwide. From exclusive private arrangements to international lifestyle experiences, we deliver unparalleled beauty, elegance, and absolute discretion to discerning clientele across the globe."
  },
  {
    id: 'about_intro',
    page: 'About',
    section: 'Introduction',
    content: 'MUSE & CO was founded on the principle that true luxury is found in beauty, elegance, and unforgettable moments.'
  },
  {
    id: 'about_story',
    page: 'About',
    section: 'Our Story',
    content: "With over a decade of experience curating elite companionship and sophisticated lifestyle experiences, we connect discerning clients worldwide with South Africa's most beautiful and refined models, influencers, and private companions."
  },
  {
    id: 'about_shara',
    page: 'About',
    section: 'Meet Shara',
    content: "Founder and curator of MUSE & CO, Shara brings over a decade of expertise in elite companionship curation and luxury lifestyle experiences. Her meticulous approach to connecting discerning clients with exceptional models has made MUSE & CO the premier choice for sophisticated companionship worldwide."
  },
  {
    id: 'services_intro',
    page: 'Services',
    section: 'Introduction',
    content: 'Browse our portfolio, choose your companion or model, and let us arrange the perfect experience \u2014 from private dinners and yacht days to exclusive companionship and travel.'
  },
  {
    id: 'services_dining',
    page: 'Services',
    section: 'Private Dining',
    content: 'Choose an elegant companion for restaurant dinners, wine tastings, and social occasions. Our sophisticated companions enhance any dining experience with beauty, intelligence, and effortless conversation \u2014 perfect for business entertaining or private evenings.'
  },
  {
    id: 'services_yacht',
    page: 'Services',
    section: 'Yacht & Villa',
    content: 'Select stunning models and hostesses for your yacht day, villa event, pool party, or coastal celebration. Our models bring energy, glamour, and refined allure to your most exclusive gatherings.'
  },
  {
    id: 'services_events',
    page: 'Services',
    section: 'Private Events',
    content: 'Book professional hostesses and companions for your corporate dinner, golf day, poker evening, or private celebration. Impeccable presentation, social grace, and absolute discretion for your most important occasions.'
  },
  {
    id: 'services_nightlife',
    page: 'Services',
    section: 'Party & Nightlife',
    content: 'Choose your ideal companions for club nights, private parties, celebrations, and nightlife experiences. Beautiful, engaging companions who bring magnetic energy to any evening out.'
  },
  {
    id: 'services_private',
    page: 'Services',
    section: 'Private Companionship',
    content: 'Curated private companionship for discerning clients seeking ongoing, bespoke arrangements. Browse our portfolio, choose who you connect with, and enjoy absolute confidentiality.'
  },
  {
    id: 'services_travel',
    page: 'Services',
    section: 'Travel Companions',
    content: 'Select a sophisticated travel companion for domestic and international trips. Whether business or leisure \u2014 our refined companions provide elegance, cultural awareness, and discretion for journeys to Mauritius, Dubai, London, and beyond.'
  },
  {
    id: 'portfolio_intro',
    page: 'Portfolio',
    section: 'Introduction',
    content: 'Handpicked professionals for luxury events, sophisticated gatherings, and exclusive private experiences across Cape Town'
  },
  {
    id: 'pricing_intro',
    page: 'Pricing',
    section: 'Introduction',
    content: 'Transparent pricing for exceptional service. All rates are starting prices and may vary based on specific requirements and arrangements.'
  },
  {
    id: 'contact_intro',
    page: 'Contact',
    section: 'Introduction',
    content: 'Ready to arrange your next experience? Contact us for a discreet, personalised consultation.'
  },
]

export default function SiteContentManager() {
  const [content, setContent] = useState<SiteContent[]>(DEFAULT_CONTENT)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    fetchContent()
  }, [])

  async function fetchContent() {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')

      if (error) throw error

      if (data && data.length > 0) {
        // Merge database content with defaults
        const updatedContent = DEFAULT_CONTENT.map(defaultItem => {
          const dbItem = data.find(d => d.id === defaultItem.id)
          return dbItem ? { ...defaultItem, content: dbItem.content } : defaultItem
        })
        setContent(updatedContent)
      }
    } catch (error) {
      console.log('Using default content')
    } finally {
      setLoading(false)
    }
  }

  function startEditing(item: SiteContent) {
    setEditingId(item.id)
    setEditText(item.content)
  }

  function cancelEditing() {
    setEditingId(null)
    setEditText('')
  }

  async function saveContent(item: SiteContent) {
    if (!editText.trim()) {
      showMessage('Content cannot be empty', 'error')
      return
    }

    setSaving(item.id)

    try {
      // Upsert the content
      const { error } = await supabase
        .from('site_content')
        .upsert({
          id: item.id,
          page: item.page,
          section: item.section,
          content: editText.trim(),
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      // Update local state
      setContent(prev => prev.map(c => 
        c.id === item.id ? { ...c, content: editText.trim() } : c
      ))

      showMessage('✓ Content saved!', 'success')
      setEditingId(null)
      setEditText('')
    } catch (error: any) {
      showMessage('Failed to save. Please try again.', 'error')
    } finally {
      setSaving(null)
    }
  }

  function showMessage(text: string, type: 'success' | 'error') {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 3000)
  }

  // Group content by page
  const groupedContent = content.reduce((acc, item) => {
    if (!acc[item.page]) acc[item.page] = []
    acc[item.page].push(item)
    return acc
  }, {} as Record<string, SiteContent[]>)

  if (loading) {
    return (
      <div className="min-h-screen bg-deep-black text-off-white flex flex-col items-center justify-center p-6">
        <Loader2 className="w-12 h-12 text-champagne-gold animate-spin mb-4" />
        <p className="text-champagne-gold text-lg">Loading content...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-deep-black text-off-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-deep-black/95 backdrop-blur-sm border-b border-champagne-gold/20 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link 
            href="/admin/dashboard" 
            className="p-2 rounded-full hover:bg-champagne-gold/10 transition"
          >
            <ArrowLeft className="w-6 h-6 text-champagne-gold" />
          </Link>
          <div>
            <h1 className="font-playfair text-2xl md:text-3xl text-champagne-gold">
              Site Text
            </h1>
            <p className="text-off-white/50 text-sm">Tap any text to edit</p>
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

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto p-4 pb-24 space-y-8">
        {Object.entries(groupedContent).map(([page, items]) => (
          <div key={page} className="space-y-4">
            {/* Page Header */}
            <div className="flex items-center gap-2 pt-4">
              <Type className="w-5 h-5 text-champagne-gold" />
              <h2 className="font-playfair text-xl text-champagne-gold">{page}</h2>
            </div>

            {/* Content Items */}
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-charcoal/30 border border-champagne-gold/20 rounded-xl overflow-hidden"
                >
                  {/* Section Label */}
                  <div className="px-4 py-2 bg-champagne-gold/10 border-b border-champagne-gold/10">
                    <span className="text-champagne-gold text-xs font-medium uppercase tracking-wider">
                      {item.section}
                    </span>
                  </div>

                  {/* Content */}
                  {editingId === item.id ? (
                    <div className="p-4 space-y-3">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full bg-charcoal/50 border-2 border-champagne-gold/30 p-4 rounded-xl 
                                 text-off-white placeholder-off-white/40
                                 focus:border-champagne-gold focus:outline-none transition resize-none"
                        rows={3}
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveContent(item)}
                          disabled={saving === item.id}
                          className="flex-1 bg-champagne-gold text-deep-black py-3 rounded-xl font-semibold
                                   hover:bg-champagne-gold/90 active:scale-[0.98] transition-all
                                   disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {saving === item.id ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <>
                              <Check className="w-5 h-5" />
                              Save
                            </>
                          )}
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="px-6 py-3 rounded-xl border border-champagne-gold/30 text-off-white
                                   hover:bg-champagne-gold/10 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      onClick={() => startEditing(item)}
                      className="p-4 cursor-pointer hover:bg-champagne-gold/5 transition group"
                    >
                      <p className="text-off-white leading-relaxed group-hover:text-champagne-gold transition">
                        {item.content}
                      </p>
                      <p className="text-off-white/40 text-xs mt-2">Tap to edit</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Info Note */}
        <div className="bg-champagne-gold/10 border border-champagne-gold/20 rounded-xl p-4 mt-8">
          <p className="text-off-white/70 text-sm">
            <strong className="text-champagne-gold">Note:</strong> Changes will appear on the website after refreshing 
            the page. Only key descriptive text can be edited here — titles and structure remain consistent.
          </p>
        </div>
      </div>
    </div>
  )
}
