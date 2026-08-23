const onSuccess = async (reference: any) => {
  setIsProcessing(true);
  try {
    // Insert order with minimal required fields
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          total_amount: totalAmount,
          paystack_reference: reference.reference,
          status: 'paid',
          shipping_address: {
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            email: formData.email
          }
        }
      ])
      .select()
      .single();

    if (orderError) {
      throw new Error(`Failed to save order: ${orderError.message}`);
    }

    if (!orderData) {
      throw new Error('No order data returned');
    }

    // Insert order items
    const orderItems = cart.map(item => ({
      order_id: orderData.id,
      product_id: item.id,
      product_name: item.name,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      throw new Error(`Failed to save items: ${itemsError.message}`);
    }

    localStorage.removeItem('cart');
    alert('Payment successful! Thank you for your order.');
    router.push('/');
  } catch (error: any) {
    console.error('Order save error:', error);
    alert(`Payment successful! Reference: ${reference.reference}\n\nNote: There was an issue saving order details, but your payment is confirmed. We'll contact you shortly.`);
    // Clear cart anyway since payment succeeded
    localStorage.removeItem('cart');
    setTimeout(() => {
      router.push('/');
    }, 3000);
  } finally {
    setIsProcessing(false);
  }
};
