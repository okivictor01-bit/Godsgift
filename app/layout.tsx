import type { Metadata } from 'next';
import Header from './components/Header';

export const metadata: Metadata = {
  title: "God'sGift Essence",
  description: "Scented by grace, made to leave a mark.",
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, sans-serif' }}>
        <Header />
        {children}
      </body>
    </html>
  );
}
