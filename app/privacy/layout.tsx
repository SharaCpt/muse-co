import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'MUSE & CO privacy policy. Learn how we protect your personal information and maintain strict confidentiality.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | MUSE & CO',
    description: 'Learn how MUSE & CO protects your personal information and maintains strict confidentiality.',
    url: '/privacy',
  },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children
}
