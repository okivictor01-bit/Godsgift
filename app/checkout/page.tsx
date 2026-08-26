  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const PaystackPop = (window as any).PaystackPop;
      const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

      // Debug: Check what we have
      console.log('PaystackPop exists:', !!PaystackPop);
      console.log('Public Key:', publicKey);
      console.log('Amount:', totalAmount * 100);

      if (!PaystackPop) {
        alert('ERROR: Paystack script not loaded. Please refresh the page.');
        setLoading(false);
        return;
      }

      if (!publicKey) {
        alert('ERROR: Paystack public key is missing. Contact support.');
        setLoading(false);
        return;
      }

      if (totalAmount <= 0) {
        alert('ERROR: Invalid cart amount.');
        setLoading(false);
        return;
      }

      try {
        const handler = PaystackPop.setup({
          key: publicKey,
          email: formData.email,
          amount: totalAmount * 100,
          currency: 'NGN',
          ref: 'GG_' + Math.floor(Math.random() * 1000000000 + 1),
          metadata: {
            name: formData.name,
            phone: formData.phone,
            address: formData.address
          },
          callback: async function (response: any) {
            await saveOrderToDatabase(response.reference);
            alert('Payment successful! Your order has been placed.');
            localStorage.removeItem('cart');
            router.push('/');
          },
          onClose: function () {
            alert('Payment window closed.');
            setLoading(false);
          }
        });
        
        handler.openIframe();
      } catch (error: any) {
        console.error('Paystack setup error:', error);
        alert(`Paystack Error: ${error.message || 'Unknown error'}`);
        setLoading(false);
      }
    }, 1000); // Increased delay to ensure script loads
  };
