import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import ClientRootLayout from '@/app/ClientRootLayout'
import Footer from '@/components/common/Footer'
import { AuthProvider } from '@/context/AuthContext'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Cosifind',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={poppins.variable}>
      <body className="font-sans overflow-x-hidden">
        <AuthProvider>
          <ClientRootLayout>{children}</ClientRootLayout>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  )
}