import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Models — Meet Our Companions',
  description: 'Browse MUSE & CO\'s curated selection of elegant companions. Each woman is personally vetted for beauty, sophistication, and professionalism. Based in Cape Town with companions available across South Africa.',
  openGraph: {
    title: 'Portfolio | MUSE & CO',
    description: 'Meet our curated selection of elegant companions based in Cape Town and available across South Africa.',
  },
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children
}
