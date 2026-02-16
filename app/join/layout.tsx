import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Join Our Team — Now Recruiting in Cape Town & Johannesburg',
  description: 'MUSE & CO is looking for confident, elegant women to join our companion team. Premium earnings, complete safety, and total discretion. Apply now for a confidential consultation.',
  openGraph: {
    title: 'Join MUSE & CO',
    description: 'Join Cape Town\'s most exclusive companion agency. Premium earnings, complete safety, total discretion.',
  },
}

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return children
}
