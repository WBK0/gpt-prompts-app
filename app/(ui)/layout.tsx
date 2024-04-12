import Footer from "@components/Footer";
import Navbar from "@components/Navbar/Navbar";
import ToastProvider from "@components/Providers/ToastProvider";
import UserProvider from "@components/Providers/UserProvider";
import { ThemeProvider } from "@contexts/ThemeContext";
import "@styles/globals.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prompts app',
  description: 'Prompts app is a platform for sharing and creating prompts for creative writing.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-zinc-900">
        <ToastProvider>
          <UserProvider>
            <ThemeProvider>
              <Navbar />
              <div className="container mx-auto pt-12 min-h-screen">
                {children}
              </div>
              <Footer />
            </ThemeProvider>
          </UserProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
