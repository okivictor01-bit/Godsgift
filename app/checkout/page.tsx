  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Give the browser a tiny moment to ensure the Script component has initialized
    setTimeout(() => {
      const PaystackPop = (window as any).PaystackPop;

      if (!PaystackPop) {
        alert('Error: Payment system failed to load. Please refresh the page and try again.');
        setLoading(false);
        return;
      }

      try {
        const handler = PaystackPop.setup({
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
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
      } catch (error) {
        console.error('Paystack error:', error);
        alert('An error occurred while opening the payment window. Please try again.');
        setLoading(false);
      }
    }, 500); // 500ms delay ensures the script is fully ready
  };
