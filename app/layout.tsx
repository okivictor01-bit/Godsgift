import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import Footer from '@/app/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "God'sGift Essence - Premium Fragrances & Body Care",
  description: 'Scented by Grace, Made to Leave a Mark. Shop authentic perfumes, body sprays, and skincare products. Nationwide delivery across Nigeria.',
  keywords: 'perfume, fragrance, body spray, skincare, Nigeria, Godsgift, essence, beauty',
  authors: [{ name: "God'sGift Essence" }],
  openGraph: {
    title: "God'sGift Essence - Premium Fragrances",
    description: 'Scented by Grace, Made to  Leave a Mark',
    type: 'website',
    locale: 'en_NG',
    siteName: "God'sGift Essence",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
