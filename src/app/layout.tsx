import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import { twMerge } from 'tailwind-merge';
import { Navbar } from '@/components/ui/navbar';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DevRoast',
  description: 'Paste your code. Get roasted.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          jetbrainsMono.variable,
          'antialiased bg-neutral-950',
        )}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
