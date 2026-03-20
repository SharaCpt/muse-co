import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Models — Meet Our Exclusive Escorts & VIP Models Cape Town',
  description: 'Browse MUSE & CO\'s curated portfolio of exclusive escorts and VIP models. Each personally vetted for beauty, sophistication, and professionalism. Based in Cape Town, available across South Africa.',
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title: 'Exclusive Escorts & VIP Models | MUSE & CO',
    description: 'Meet our curated selection of exclusive escorts and VIP models based in Cape Town. Available across South Africa.',
    url: '/portfolio',
  },
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children
}
