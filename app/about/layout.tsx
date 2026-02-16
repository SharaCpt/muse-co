import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About MUSE & CO — Cape Town Companion Agency Since 2011',
  description: 'MUSE & CO has been connecting discerning clients with elegant companions since 2011. Based in Cape Town, serving clients across South Africa. Founded by Shara — exceptional women, absolute discretion.',
  openGraph: {
    title: 'About | MUSE & CO',
    description: 'Cape Town\'s trusted companion agency since 2011. Exceptional women, absolute discretion.',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
