import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <nav style={{
          padding: '1rem 2rem',
          backgroundColor: '#1a1a1a',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Godsgift Store
          </Link>
          <Link href="/cart" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1rem' }}>
             Cart
          </Link>
        </nav>
        {children}
      </body>
    </html>
  )
}
