import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Models — Elite Escorts & Companions Cape Town',
  description: 'Browse MUSE & CO\'s curated selection of elite escorts and companions. Each model is personally vetted for beauty, sophistication, and professionalism. Premium escorts based in Cape Town, available across South Africa.',
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title: 'Elite Escorts & Models | MUSE & CO',
    description: 'Meet our curated selection of elite escorts and companions based in Cape Town. Available across South Africa.',
    url: '/portfolio',
  },
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children
}
