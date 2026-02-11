import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Join Our Team — Model Recruitment Cape Town & Johannesburg',
  description: 'Join South Africa\'s most exclusive companion agency. MUSE & CO is recruiting exceptional, elegant women in Cape Town, Johannesburg & Durban. Premium earnings, total safety, absolute discretion. Apply now for a confidential consultation.',
  keywords: 'join companion agency South Africa, model recruitment Cape Town, escort agency hiring Johannesburg, become companion Durban, luxury model jobs, elite hostess recruitment',
  openGraph: {
    title: 'Join MUSE & CO | Model Recruitment — Cape Town, Johannesburg & South Africa',
    description: 'Join South Africa\'s most exclusive companion agency. Recruiting exceptional women in Cape Town, Johannesburg & Durban.',
  },
}

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return children
}
