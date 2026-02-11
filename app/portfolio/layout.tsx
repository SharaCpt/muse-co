import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Elite Model Portfolio — Cape Town & Johannesburg Companions',
  description: 'Browse MUSE & CO\'s curated portfolio of elite models and luxury companions across South Africa. Handpicked professionals for VIP events, private arrangements and exclusive experiences in Cape Town, Johannesburg, Durban & worldwide.',
  keywords: 'elite models Cape Town, luxury companions Johannesburg, VIP hostess South Africa, model portfolio Durban, private companion gallery, exclusive escorts',
  openGraph: {
    title: 'Portfolio | MUSE & CO Elite Models — Cape Town, Johannesburg & South Africa',
    description: 'Curated portfolio of elite models and luxury companions across South Africa for VIP events and exclusive experiences.',
  },
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children
}
