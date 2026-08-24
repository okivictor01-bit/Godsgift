import type { Metadata } from 'next';
import Header from './components/Header';

export const metadata: Metadata = {
  title: "Godsgift Store",
  description: "Premium products at affordable prices",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <Header />
        {children}
      </body>
    </html>
  );
}
