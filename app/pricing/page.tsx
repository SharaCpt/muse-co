import { createServerSupabase } from '@/lib/supabase-server'
import PricingContent from './PricingContent'

export const revalidate = 60

interface PricingRate {
  id?: string
  package_name: string
  duration: string
  price: number
  description: string
  features: string[]
  is_featured: boolean
  max_hours?: number
  display_order?: number
}

interface BespokeExperience {
  id?: string
  experience_name: string
  tagline: string
  description: string
  price_label: string
  image_url: string
  features: string[]
  display_order?: number
}

export default async function PricingPage() {
  const supabase = createServerSupabase()

  // Fetch pricing rates
  let rates: PricingRate[] = []
  let experiences: BespokeExperience[] = []
  try {
    const { data: ratesData } = await supabase
      .from('pricing_rates')
      .select('*')
      .order('display_order', { ascending: true })

    const { data: experiencesData } = await supabase
      .from('bespoke_experiences')
      .select('*')
      .order('display_order', { ascending: true })

    if (ratesData) rates = ratesData
    if (experiencesData) experiences = experiencesData
  } catch {
    // Use empty arrays
  }

  // Fetch content
  let content = {
    intro: 'Transparent pricing for exceptional service. All rates are starting prices and may vary based on specific requirements and arrangements.',
  }
  try {
    const { data } = await supabase
      .from('site_content')
      .select('*')
      .eq('id', 'pricing_intro')
      .single()

    if (data?.content) {
      content.intro = data.content
    }
  } catch {
    // Use default
  }

  return <PricingContent rates={rates} experiences={experiences} content={content} />
}
