import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Join MUSE & CO',
  description: 'Join Cape Town\'s most exclusive companion agency. MUSE & CO is looking for exceptional, elegant women to join our elite team. Apply now for a confidential consultation.',
  openGraph: {
    title: 'Join MUSE & CO | Model Recruitment Cape Town',
    description: 'Join Cape Town\'s most exclusive companion agency. We\'re looking for exceptional women.',
  },
}

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return children
}
