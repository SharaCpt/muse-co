import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'MUSE & CO terms of service. Read our booking terms, confidentiality policies, and service agreements.',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'Terms of Service | MUSE & CO',
    description: 'MUSE & CO booking terms, confidentiality policies, and service agreements.',
    url: '/terms',
  },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children
}
