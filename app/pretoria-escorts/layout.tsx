import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Escorts Pretoria — Premium Escort Agency Centurion & Tshwane',
  description: 'Looking for escorts in Pretoria? MUSE & CO provides premium escorts in Waterkloof, Brooklyn, Menlyn, Hatfield, Centurion & across Tshwane. Elite escort services for diplomatic events, private dinners, nightlife & luxury companionship.',
  alternates: {
    canonical: '/pretoria-escorts',
  },
  openGraph: {
    title: 'Escorts Pretoria | MUSE & CO',
    description: 'Premium escort agency in Pretoria & Centurion. Elite escorts for diplomatic events, private arrangements & luxury experiences in the capital.',
    url: '/pretoria-escorts',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Escorts Pretoria | MUSE & CO',
    description: 'Premium escort agency in Pretoria & Centurion. Elite escorts for luxury experiences in the capital.',
  },
}

export default function PretoriaLayout({ children }: { children: React.ReactNode }) {
  return children
}
