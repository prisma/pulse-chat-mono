import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {  NextAuthProvider } from "./providers"
import AuthProvider from "./contexts/auth.context"
import Header from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pulse Chat',
  description: 'Realtime chat powered by Prisma\'s Pulse',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={`${inter.className} h-screen overflow-hidden w-full bg-gray-100 flex flex-col`}>
        <NextAuthProvider>
          <AuthProvider>
            <Header/>
            <main className="flex flex-1 overflow-scroll">
              {children}
            </main>
          </AuthProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
