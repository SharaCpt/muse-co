import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Become an Elite Escort — Now Recruiting Cape Town & Johannesburg',
  description: 'MUSE & CO is recruiting elite escorts and models in Cape Town and Johannesburg. Premium earnings, complete safety, and total discretion. Apply now for a confidential consultation.',
  alternates: {
    canonical: '/join',
  },
  openGraph: {
    title: 'Join MUSE & CO',
    description: 'Join Cape Town\'s most exclusive escort agency. Premium earnings, complete safety, total discretion.',
    url: '/join',
  },
}

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return children
}
