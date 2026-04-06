import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Models — Meet Our Elite Companions & Models South Africa',
  description: 'Browse MUSE & CO\'s curated portfolio of elite companions and professional models. Each personally vetted for beauty, sophistication, and charm. Based in Cape Town, available across South Africa and internationally.',
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title: 'Elite Companions & Models | MUSE & CO',
    description: 'Meet our curated selection of elite companions and professional models. Based in Cape Town, available across South Africa.',
    url: '/portfolio',
  },
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children
}
