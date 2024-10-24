// app/layout.tsx
import { Providers } from './Providers'
import Navbar from '@/components/Navbar'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <footer className="py-6 text-center text-sm text-gray-500">
                <p>© {new Date().getFullYear()} Our Store. All rights reserved.</p>
              </footer>
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}