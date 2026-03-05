import { MetadataRoute } from 'next'
import { createServerSupabase } from '@/lib/supabase-server'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.museco.co.za'
  const lastUpdated = new Date('2026-02-20')
  
  // Fetch all active models with slugs for individual pages
  let modelEntries: MetadataRoute.Sitemap = []
  try {
    const supabase = createServerSupabase()
    const { data } = await supabase
      .from('portfolio_images')
      .select('slug, name')
      .eq('is_active', true)
      .not('slug', 'is', null)

    if (data) {
      modelEntries = data.map((model) => ({
        url: `${baseUrl}/portfolio/${model.slug}`,
        lastModified: lastUpdated,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
    }
  } catch {
    // Continue with static entries only
  }

  return [
    // Core money pages — highest priority
    {
      url: baseUrl,
      lastModified: lastUpdated,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Trust & conversion pages
    {
      url: `${baseUrl}/contact`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/join`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Individual model pages — dynamic
    ...modelEntries,
    // Legal pages — low priority but included
    {
      url: `${baseUrl}/privacy`,
      lastModified: lastUpdated,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: lastUpdated,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
