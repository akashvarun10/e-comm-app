import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'E-commerce Admin Dashboard',
  description: 'Admin dashboard for managing products and collections',
  viewport: 'width=device-width, initial-scale=1',  // Mobile responsiveness
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta name="description" content={metadata.description} />
          <meta name="viewport" content={metadata.viewport} />
          <title>{metadata.title}</title>
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
