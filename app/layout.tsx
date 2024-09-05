import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { FarmerProvider } from '@/context/FarmerProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Brain Agriculture Frontend Challenge',
  description: 'Brain Agriculture Frontend Challenge'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} overflow-hidden`}
        suppressHydrationWarning={true}
      >
        <FarmerProvider>{children}</FarmerProvider>
      </body>
    </html>
  );
}
