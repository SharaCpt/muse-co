import { createServerSupabase } from '@/lib/supabase-server'
import ServicesContent from './ServicesContent'

export const revalidate = 300

const DEFAULT_HEADER = 'https://images.unsplash.com/photo-1640947109541-ad13a917ba45?q=80&w=2000'

const DEFAULT_IMAGES: Record<string, string> = {
  dining_companions: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1200',
  yacht_villa: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1200',
  private_events: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1200',
  party_nightlife: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=1200',
  private_companionship: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1200',
  travel_companions: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1200',
}

const DEFAULT_CONTENT = {
  intro: 'Browse our portfolio, choose your companion or model, and let us arrange the perfect experience — from private dinners and yacht days to exclusive companionship and travel.',
  dining: 'Choose an elegant companion for restaurant dinners, wine tastings, and social occasions. Our sophisticated companions enhance any dining experience with beauty, intelligence, and effortless conversation — perfect for business entertaining or private evenings.',
  yacht: 'Select stunning models and hostesses for your yacht day, villa event, pool party, or coastal celebration. Our models bring energy, glamour, and refined allure to your most exclusive gatherings.',
  events: 'Book professional hostesses and companions for your corporate dinner, golf day, poker evening, or private celebration. Impeccable presentation, social grace, and absolute discretion for your most important occasions.',
  nightlife: 'Choose your ideal companions for club nights, private parties, celebrations, and nightlife experiences. Beautiful, engaging companions who bring magnetic energy to any evening out.',
  private: 'Curated private companionship for discerning clients seeking ongoing, bespoke arrangements. Browse our portfolio, choose who you connect with, and enjoy absolute confidentiality.',
  travel: 'Select a sophisticated travel companion for domestic and international trips. Whether business or leisure — our refined companions provide elegance, cultural awareness, and discretion for journeys to Mauritius, Dubai, London, and beyond.',
}

export default async function ServicesPage() {
  const supabase = createServerSupabase()

  // Fetch content
  let content = { ...DEFAULT_CONTENT }
  try {
    const { data } = await supabase
      .from('site_content')
      .select('*')
      .in('id', ['services_intro', 'services_dining', 'services_yacht', 'services_events', 'services_nightlife', 'services_private', 'services_travel'])

    if (data && data.length > 0) {
      data.forEach((item: { id: string; content: string }) => {
        if (item.id === 'services_intro') content.intro = item.content
        if (item.id === 'services_dining') content.dining = item.content
        if (item.id === 'services_yacht') content.yacht = item.content
        if (item.id === 'services_events') content.events = item.content
        if (item.id === 'services_nightlife') content.nightlife = item.content
        if (item.id === 'services_private') content.private = item.content
        if (item.id === 'services_travel') content.travel = item.content
      })
    }
  } catch {
    // Use defaults
  }

  // Fetch images
  let headerImage = DEFAULT_HEADER
  let serviceImages = { ...DEFAULT_IMAGES }
  try {
    const { data } = await supabase
      .from('site_images')
      .select('*')
      .in('page', ['Services', 'Headers'])

    if (data && data.length > 0) {
      data.forEach((img: { section: string; page: string; image_url: string }) => {
        if (img.section === 'services' && img.page === 'Headers') {
          // Skip header — hardcoded to prevent flash
          return
        } else if (img.page === 'Services') {
          serviceImages[img.section] = img.image_url
        }
      })
    }
  } catch {
    // Use defaults
  }

  return <ServicesContent headerImage={headerImage} serviceImages={serviceImages} content={content} />
}
