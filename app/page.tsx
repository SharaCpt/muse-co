import { createServerSupabase } from '@/lib/supabase-server'
import HomeContent from './HomeContent'

export const revalidate = 300

// Default images — used when Supabase is unavailable
const DEFAULT_IMAGES: Record<string, string> = {
  hero: 'https://images.unsplash.com/photo-1611305548077-3a945eb29457?q=80&w=2400&auto=format&fit=crop',
  service_card_1: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=1200',
  service_card_2: 'https://images.unsplash.com/photo-1522255272218-7ac5249be344?q=80&w=1200',
  service_card_3: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200',
  service_card_4: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200',
  service_card_5: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200',
  service_card_6: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=1200',
}

const DEFAULT_MODEL_IMAGES: Record<string, string> = {
  model_card_1: 'https://images.unsplash.com/photo-1612874470096-d93a610de87b?q=80&w=800',
  model_card_2: 'https://images.unsplash.com/photo-1540316264016-aeb7538f4d6f?q=80&w=800',
  model_card_3: 'https://images.unsplash.com/photo-1604004555489-723a93d6ce74?q=80&w=800',
}

const DEFAULT_CONTENT = {
  heroTagline: 'Elite Companions • VIP Experiences • Global Luxury',
  heroSubtitle: 'Curating South Africa\'s most beautiful models and sophisticated companions for luxury experiences worldwide. From exclusive private arrangements to international lifestyle experiences, we deliver unparalleled beauty, elegance, and absolute discretion to discerning clientele across the globe.',
}

export default async function HomePage() {
  const supabase = createServerSupabase()

  // Fetch content
  let content = { ...DEFAULT_CONTENT }
  try {
    const { data } = await supabase
      .from('site_content')
      .select('*')
      .in('id', ['home_hero_tagline', 'home_hero_subtitle'])

    if (data && data.length > 0) {
      data.forEach((item: { id: string; content: string }) => {
        if (item.id === 'home_hero_tagline') content.heroTagline = item.content
        if (item.id === 'home_hero_subtitle') content.heroSubtitle = item.content
      })
    }
  } catch {
    // Use defaults
  }

  // Fetch images
  let images = { ...DEFAULT_IMAGES }
  let modelImages = { ...DEFAULT_MODEL_IMAGES }
  try {
    const { data } = await supabase
      .from('site_images')
      .select('*')
      .eq('page', 'Homepage')

    if (data && data.length > 0) {
      data.forEach((img: { section: string; image_url: string }) => {
        if (img.section === 'hero') return
        if (img.section.startsWith('service_card_')) {
          images[img.section] = img.image_url
        } else if (img.section.startsWith('model_card_')) {
          modelImages[img.section] = img.image_url
        }
      })
    }
  } catch {
    // Use defaults
  }

  return <HomeContent images={images} modelImages={modelImages} content={content} />
}
