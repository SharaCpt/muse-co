import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about MUSE & CO - Cape Town\'s premier luxury companion agency. 15 years of excellence curating elite companionship and sophisticated lifestyle experiences worldwide.',
  openGraph: {
    title: 'About MUSE & CO | Elite Companion Agency Cape Town',
    description: '15 years of excellence curating elite companionship and sophisticated lifestyle experiences in Cape Town, South Africa.',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
