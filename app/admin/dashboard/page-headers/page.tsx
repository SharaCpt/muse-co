'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'
import { Upload } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface PageHeader {
  id: string
  page_name: string
  image_url: string
}

const PAGES = [
  { key: 'about', label: 'About Page' },
  { key: 'services', label: 'Services Page' },
  { key: 'pricing', label: 'Pricing Page' },
  { key: 'portfolio', label: 'Portfolio Page' },
  { key: 'contact', label: 'Contact Page' },
]

export default function PageHeadersManager() {
  const [headers, setHeaders] = useState<PageHeader[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchHeaders()
  }, [])

  async function fetchHeaders() {
    try {
      const { data, error } = await supabase
        .from('page_headers')
        .select('*')
        .eq('is_active', true)

      if (error) throw error
      setHeaders(data || [])
    } catch (error: any) {
      showMessage('Error loading headers: ' + error.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  async function uploadHeader(pageName: string, file: File) {
    setUploading(pageName)

    try {
      // Create storage bucket if it doesn't exist
      const { data: buckets } = await supabase.storage.listBuckets()
      if (!buckets?.find(b => b.name === 'headers')) {
        await supabase.storage.createBucket('headers', { public: true })
      }

      // Upload file
      const fileExt = file.name.split('.').pop()
      const fileName = `${pageName}-${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('headers')
        .upload(filePath, file, { upsert: true })

      if (uploadError) throw uploadError

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('headers')
        .getPublicUrl(filePath)

      // Update database
      const { error: dbError } = await supabase
        .from('page_headers')
        .upsert({
          page_name: pageName,
          image_url: urlData.publicUrl,
        })

      if (dbError) throw dbError

      showMessage('Header updated successfully!', 'success')
      fetchHeaders()
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

  function getCurrentHeader(pageName: string) {
    return headers.find(h => h.page_name === pageName)?.image_url
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-deep-black text-off-white flex items-center justify-center">
        <p className="text-champagne-gold">Loading page headers...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-deep-black text-off-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-playfair text-4xl md:text-5xl text-champagne-gold mb-2">
            Page Headers
          </h1>
          <p className="text-off-white/60">Manage header background images for all pages</p>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded ${message.includes('failed') || message.includes('Error') ? 'bg-red-500/20 border border-red-500' : 'bg-green-500/20 border border-green-500'}`}>
            <p className="text-sm">{message}</p>
          </div>
        )}

        {/* Header Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PAGES.map((page) => {
            const currentHeader = getCurrentHeader(page.key)
            const isUploading = uploading === page.key

            return (
              <div key={page.key} className="bg-charcoal/50 border border-champagne-gold/20 rounded overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-playfair text-champagne-gold mb-4">
                    {page.label}
                  </h3>
                  
                  {currentHeader && (
                    <div className="relative h-48 rounded overflow-hidden mb-4">
                      <Image
                        src={currentHeader}
                        alt={page.label}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <label className="block">
                    <span className="text-sm text-off-white/80 block mb-2">
                      {currentHeader ? 'Replace Header Image' : 'Upload Header Image'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={isUploading}
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          uploadHeader(page.key, e.target.files[0])
                        }
                      }}
                      className="w-full bg-deep-black border border-champagne-gold/30 p-3 rounded file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-champagne-gold file:text-deep-black file:cursor-pointer disabled:opacity-50"
                    />
                  </label>

                  {isUploading && (
                    <div className="flex items-center gap-2 text-champagne-gold mt-3">
                      <Upload size={20} className="animate-pulse" />
                      <span>Uploading...</span>
                    </div>
                  )}

                  <p className="text-xs text-off-white/50 mt-2">
                    Recommended: 2000x800px
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
