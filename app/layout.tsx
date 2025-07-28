import type { Metadata } from 'next'
import { Poppins } from 'next/font/google' // ✅ Import correcto
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // ajusta según lo que uses
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
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={poppins.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
