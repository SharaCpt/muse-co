import { createServerSupabase } from '@/lib/supabase-server'
import ContactContent from './ContactContent'

export const revalidate = 300

export default async function ContactPage() {
  const supabase = createServerSupabase()

  let content = {
    intro: 'Ready to arrange your next experience? Contact us for a discreet, personalised consultation.',
  }

  try {
    const { data } = await supabase
      .from('site_content')
      .select('*')
      .eq('id', 'contact_intro')
      .single()

    if (data?.content) {
      content.intro = data.content
    }
  } catch {
    // Use default
  }

  return <ContactContent content={content} />
}
