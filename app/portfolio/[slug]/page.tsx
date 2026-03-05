import { createServerSupabase } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ModelPageContent from './ModelPageContent'

export const revalidate = 60

interface GalleryImage {
  id: string
  image_url: string
  display_order: number
}

interface ModelData {
  id: string
  name: string
  slug: string
  category: string
  description: string
  bio: string | null
  image_url: string
  age: number | null
  height: number | null
  weight: number | null
}

// Generate static params for all active models
export async function generateStaticParams() {
  const supabase = createServerSupabase()
  const { data } = await supabase
    .from('portfolio_images')
    .select('slug')
    .eq('is_active', true)
    .not('slug', 'is', null)

  return (data || []).map((model) => ({
    slug: model.slug,
  }))
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createServerSupabase()
  const { data: model } = await supabase
    .from('portfolio_images')
    .select('name, category, description, image_url, age, height')
    .eq('slug', params.slug)
    .eq('is_active', true)
    .single()

  if (!model) {
    return {
      title: 'Model Not Found',
    }
  }

  const title = `${model.name} — ${model.category} | MUSE & CO`
  const description = model.description 
    ? `Meet ${model.name}, ${model.category.toLowerCase()} at MUSE & CO. ${model.description} Based in Cape Town, available across South Africa.`
    : `Meet ${model.name}, a professional ${model.category.toLowerCase()} at MUSE & CO Cape Town. ${model.age ? `Age ${model.age}` : ''}${model.height ? `, ${model.height}cm` : ''}. Available for luxury events and private arrangements across South Africa.`

  return {
    title: `${model.name} — ${model.category}`,
    description,
    alternates: {
      canonical: `/portfolio/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/portfolio/${params.slug}`,
      images: model.image_url ? [{ url: model.image_url, width: 800, height: 1067, alt: `${model.name} — ${model.category} at MUSE & CO Cape Town` }] : undefined,
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: model.image_url ? [model.image_url] : undefined,
    },
  }
}

export default async function ModelPage({ params }: { params: { slug: string } }) {
  const supabase = createServerSupabase()

  // Fetch model data
  const { data: model } = await supabase
    .from('portfolio_images')
    .select('*')
    .eq('slug', params.slug)
    .eq('is_active', true)
    .single()

  if (!model) {
    notFound()
  }

  // Fetch gallery images
  const { data: gallery } = await supabase
    .from('model_gallery')
    .select('*')
    .eq('model_id', model.id)
    .order('display_order', { ascending: true })

  // Fetch related models (same category, excluding current)
  const { data: relatedModels } = await supabase
    .from('portfolio_images')
    .select('id, name, slug, category, image_url, age, height, weight')
    .eq('is_active', true)
    .eq('category', model.category)
    .neq('id', model.id)
    .order('display_order', { ascending: true })
    .limit(3)

  // Person structured data for SEO
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: model.name,
    jobTitle: model.category,
    worksFor: {
      '@type': 'Organization',
      name: 'MUSE & CO',
      url: 'https://www.museco.co.za',
    },
    image: model.image_url,
    url: `https://www.museco.co.za/portfolio/${params.slug}`,
    description: model.description || `${model.category} at MUSE & CO Cape Town`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cape Town',
      addressRegion: 'Western Cape',
      addressCountry: 'ZA',
    },
  }

  // BreadcrumbList schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.museco.co.za',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Portfolio',
        item: 'https://www.museco.co.za/portfolio',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: model.name,
        item: `https://www.museco.co.za/portfolio/${params.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ModelPageContent
        model={model as ModelData}
        gallery={(gallery || []) as GalleryImage[]}
        relatedModels={(relatedModels || []) as any[]}
      />
    </>
  )
}
