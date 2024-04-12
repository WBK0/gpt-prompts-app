import ToastProvider from "@components/Providers/ToastProvider";
import "@styles/globals.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import type { Metadata } from 'next'
import SessionProvider from "@components/Providers/UserProvider";
import { ThemeProvider } from "@contexts/ThemeContext";
import AuthTheme from "@components/AuthTheme";

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
          <SessionProvider>
            <ThemeProvider>
              <AuthTheme />
              {children}
            </ThemeProvider>
          </SessionProvider>
        </ToastProvider>
      </body>
    </html>
  )
}