import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'MUSE & CO privacy policy. Learn how we protect your personal information and maintain strict confidentiality.',
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children
}
