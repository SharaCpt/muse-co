import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Elite Companion Services — Cape Town, Johannesburg & Nationwide',
  description: 'Luxury companion services across South Africa. VIP hostesses, private companions, travel escorts & bespoke event staffing in Cape Town, Johannesburg, Durban, Pretoria. International arrangements available worldwide.',
  keywords: 'companion services Cape Town, VIP escort Johannesburg, luxury hostess Durban, private companion South Africa, travel escort Pretoria, bespoke events, elite nightlife companions',
  openGraph: {
    title: 'Elite Companion Services | MUSE & CO — Cape Town, Johannesburg & South Africa',
    description: 'Luxury companion services across South Africa. VIP hostesses, private companions, travel escorts & bespoke events in Cape Town, Johannesburg, Durban.',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
