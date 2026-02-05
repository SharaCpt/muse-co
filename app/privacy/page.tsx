export default function PrivacyPage() {
  return (
    <main className="bg-deep-black pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="space-y-8 animate-[fadeIn_0.5s_ease-in]">
          <h1 className="font-playfair text-4xl md:text-5xl text-champagne-gold tracking-wider mb-12">
            Privacy Policy
          </h1>

          <div className="space-y-6 text-off-white/80 font-inter leading-relaxed">
            <section>
              <h2 className="text-champagne-gold text-xl mb-4">Information We Collect</h2>
              <p>
                When you contact us through our website, we collect your name, email address, and any information you provide in your message. This information is used solely to respond to your inquiry.
              </p>
            </section>

            <section>
              <h2 className="text-champagne-gold text-xl mb-4">How We Use Your Information</h2>
              <p>
                We use the information you provide to:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                <li>Respond to your inquiries</li>
                <li>Provide information about our services</li>
                <li>Communicate regarding potential bookings</li>
              </ul>
            </section>

            <section>
              <h2 className="text-champagne-gold text-xl mb-4">Data Protection</h2>
              <p>
                We take the protection of your personal information seriously. Your data is stored securely and is never shared with third parties without your explicit consent.
              </p>
            </section>

            <section>
              <h2 className="text-champagne-gold text-xl mb-4">Contact</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us via WhatsApp at +27 60 776 9793.
              </p>
            </section>

            <p className="text-sm text-off-white/60 pt-8">
              Last updated: January 2026
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
