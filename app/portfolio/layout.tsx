import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Browse MUSE & CO\'s curated portfolio of elite models and luxury companions. Handpicked professionals for VIP events, private arrangements, and exclusive experiences in Cape Town.',
  openGraph: {
    title: 'Portfolio | MUSE & CO Elite Models Cape Town',
    description: 'Curated portfolio of elite models and luxury companions for VIP events and exclusive experiences.',
  },
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children
}
