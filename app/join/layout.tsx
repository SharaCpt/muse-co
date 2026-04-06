import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Become a Model — Now Recruiting Companions in Cape Town & Johannesburg',
  description: 'MUSE & CO is recruiting models and companions in Cape Town and Johannesburg. Premium earnings, complete safety, and total discretion. Apply now for a confidential consultation with Shara.',
  alternates: {
    canonical: '/join',
  },
  openGraph: {
    title: 'Join MUSE & CO — Model Recruitment',
    description: 'Join South Africa\'s most exclusive companion agency. Premium earnings, complete safety, total discretion.',
    url: '/join',
  },
}

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return children
}
