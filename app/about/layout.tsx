import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About MUSE & CO — Cape Town Escort & Companion Agency Since 2011',
  description: 'MUSE & CO has been connecting discerning clients with elite escorts and elegant companions since 2011. Based in Cape Town, serving clients across South Africa. Founded by Shara — exceptional escorts, absolute discretion.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About | MUSE & CO',
    description: 'Cape Town\'s trusted escort and companion agency since 2011. Exceptional models, absolute discretion.',
    url: '/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
