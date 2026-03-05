import { createServerSupabase } from '@/lib/supabase-server'
import AboutContent from './AboutContent'

export const revalidate = 300

const DEFAULTS = {
  intro: 'MUSE & CO was founded on the principle that true luxury is found in beauty, elegance, and unforgettable moments.',
  story: 'With over a decade of experience curating elite companionship and sophisticated lifestyle experiences, we connect discerning clients worldwide with South Africa\'s most beautiful and refined models, influencers, and private companions.',
  shara: 'Founder and curator of MUSE & CO, Shara brings over a decade of expertise in elite companionship curation and luxury lifestyle experiences. Her meticulous approach to connecting discerning clients with exceptional models has made MUSE & CO the premier choice for sophisticated companionship worldwide.',
}

export default async function AboutPage() {
  const supabase = createServerSupabase()

  let content = { ...DEFAULTS }
  try {
    const { data } = await supabase
      .from('site_content')
      .select('*')
      .in('id', ['about_intro', 'about_story', 'about_shara'])

    if (data && data.length > 0) {
      data.forEach((item: { id: string; content: string }) => {
        if (item.id === 'about_intro') content.intro = item.content
        if (item.id === 'about_story') content.story = item.content
        if (item.id === 'about_shara') content.shara = item.content
      })
    }
  } catch {
    // Use defaults
  }

  return <AboutContent content={content} />
}
