import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us — South Africa\'s Premier Companion Agency',
  description: 'MUSE & CO is South Africa\'s leading luxury companion agency. 15+ years curating elite companionship in Cape Town, Johannesburg, Durban and worldwide. Founded by Shara — exceptional women, absolute discretion.',
  keywords: 'luxury companion agency South Africa, elite escort Cape Town, about MUSE & CO, companion agency Johannesburg, Shara founder, luxury escorts Durban',
  openGraph: {
    title: 'About MUSE & CO | South Africa\'s Premier Luxury Companion Agency',
    description: '15+ years curating elite companionship across South Africa — Cape Town, Johannesburg, Durban and worldwide. Exceptional women, absolute discretion.',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
