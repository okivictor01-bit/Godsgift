'use client';

export default function WhatsAppButton() {
  // REPLACE WITH YOUR CLIENT'S WHATSAPP NUMBER (with country code, no + or spaces)
  const phoneNumber = '2348000000000'; 
  const message = 'Hello! I am interested in your products.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '60px',
        height: '60px',
        backgroundColor: '#25D366',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        zIndex: 1000,
        textDecoration: 'none',
        transition: 'transform 0.2s'
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      aria-label="Chat on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="35"
        height="35"
        fill="white"
      >
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958C9.722 31.016 12.742 32 16.004 32 24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.302 22.602c-.39 1.1-1.932 2.014-3.164 2.28-.846.18-1.95.324-5.67-1.214-4.762-1.972-7.826-6.81-8.064-7.124-.228-.314-1.932-2.572-1.932-4.904s1.222-3.472 1.658-3.95c.436-.478.952-.596 1.268-.596.314 0 .63.002.904.016.29.014.68-.11 1.064.812.39.94 1.328 3.24 1.444 3.476.118.236.196.512.04.826-.158.314-.236.512-.472.788-.236.276-.496.616-.708.828-.236.236-.482.492-.208.964.276.472 1.222 2.018 2.622 3.264 1.804 1.606 3.326 2.104 3.8 2.34.472.236.748.198 1.024-.118.276-.316 1.182-1.38 1.498-1.854.314-.472.63-.394 1.064-.236.436.158 2.756 1.3 3.228 1.536.472.236.788.354.904.55.118.198.118 1.14-.272 2.24z"/>
      </svg>
    </a>
  );
}
