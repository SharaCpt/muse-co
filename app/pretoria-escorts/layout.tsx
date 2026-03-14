import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Elite Escorts Pretoria — VIP Companions in the Capital City',
  description: 'MUSE & CO provides elite escorts in Pretoria and Centurion. Premium escort services for diplomatic events, private dinners, nightlife & luxury companionship. VIP escorts in Waterkloof, Brooklyn, Menlyn, Hatfield & across Tshwane.',
  alternates: {
    canonical: '/pretoria-escorts',
  },
  openGraph: {
    title: 'Elite Escorts Pretoria | MUSE & CO',
    description: 'Premium escort services in Pretoria & Centurion. VIP escorts for diplomatic events, private arrangements & luxury experiences in the capital.',
    url: '/pretoria-escorts',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elite Escorts Pretoria | MUSE & CO',
    description: 'Premium escort services in Pretoria & Centurion. VIP escorts for luxury experiences in the capital.',
  },
}

export default function PretoriaLayout({ children }: { children: React.ReactNode }) {
  return children
}
