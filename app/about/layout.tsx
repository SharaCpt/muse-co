import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About MUSE & CO — Cape Town\'s Trusted Escort Agency Since 2011',
  description: 'MUSE & CO has been connecting discerning clients with exceptional escorts and sophisticated models since 2011. Based in Cape Town, serving clients across South Africa. Founded by Shara — beauty, elegance, absolute discretion.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About | MUSE & CO',
    description: 'Cape Town\'s trusted escort agency since 2011. Exceptional models, absolute discretion.',
    url: '/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
