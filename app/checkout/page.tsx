const onSuccess = async (reference: any) => {
  setIsProcessing(true);
  try {
    const orderDataToInsert: any = {
      total_amount: totalAmount,
      paystack_reference: reference.reference,
      status: 'paid',
      shipping_address: {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        email: formData.email
      }
    };

    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([orderDataToInsert])
      .select()
      .single();

    if (orderError) {
      console.error('Order error:', orderError);
      throw new Error(`Order failed: ${orderError.message}`);
    }
    
    if (!orderData) {
      throw new Error('No order data returned');
    }

    // Try to save order items, but don't fail if it doesn't work
    try {
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
        console.warn('Order items save failed (non-critical):', itemsError);
      }
    } catch (itemsError) {
      console.warn('Order items error (non-critical):', itemsError);
    }

    localStorage.removeItem('cart');
    alert('Payment successful! Thank you for your order. Order Reference: ' + reference.reference);
    router.push('/');
  } catch (error: any) {
    console.error('Critical save error:', error);
    alert(`Payment was processed (Ref: ${reference.reference}) but there was an issue. Please contact support.`);
    localStorage.removeItem('cart');
    setTimeout(() => router.push('/'), 3000);
  } finally {
    setIsProcessing(false);
  }
};
