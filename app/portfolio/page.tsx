import { createServerSupabase } from '@/lib/supabase-server'
import PortfolioContent from './PortfolioContent'

export const revalidate = 60

interface PortfolioImage {
  id: string
  name: string
  slug: string | null
  category: string
  description: string
  image_url: string
  display_order: number
  age: number | null
  height: number | null
  weight: number | null
}

export default async function PortfolioPage() {
  const supabase = createServerSupabase()

  // Fetch portfolio models
  let models: PortfolioImage[] = []
  try {
    const { data } = await supabase
      .from('portfolio_images')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (data) {
      models = data
    }
  } catch {
    // Use empty array
  }

  // Fetch content
  let content = {
    intro: 'Handpicked professionals for luxury events, sophisticated gatherings, and exclusive private experiences across Cape Town',
  }
  try {
    const { data } = await supabase
      .from('site_content')
      .select('*')
      .eq('id', 'portfolio_intro')
      .single()

    if (data?.content) {
      content.intro = data.content
    }
  } catch {
    // Use default
  }

  return <PortfolioContent models={models} content={content} />
}
