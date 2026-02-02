import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'BYTEWISE Electronics | Premium Electronics Store',
  description: 'Shop the latest electronics at BYTEWISE CONSULTING LLP. Premium TVs, Laptops, Smartphones, and more with best prices and fast delivery.',
  keywords: 'electronics, TV, laptop, smartphone, gadgets, BYTEWISE, online shopping',
  authors: [{ name: 'BYTEWISE CONSULTING LLP' }],
  openGraph: {
    title: 'BYTEWISE Electronics | Premium Electronics Store',
    description: 'Shop the latest electronics with best prices and fast delivery.',
    url: 'https://bytewise.store',
    siteName: 'BYTEWISE Electronics',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
