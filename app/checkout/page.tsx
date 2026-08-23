const onSuccess = async (reference: any) => {
  setIsProcessing(true);
  try {
    // Prepare shipping address as JSON
    const shippingAddress = {
      full_name: formData.name,
      phone: formData.phone,
      address: formData.address,
      email: formData.email
    };

    // Insert order with correct column names
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          user_id: null, // Or use actual user ID if you have auth
          total_amount: totalAmount,
          paystack_reference: reference.reference,
          status: 'paid',
          shipping_address: shippingAddress
        }
      ])
      .select()
      .single();

    if (orderError) {
      console.error('Order insert error:', orderError);
      throw orderError;
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
      console.error('Order items error:', itemsError);
      throw itemsError;
    }

    localStorage.removeItem('cart');
    alert('Payment successful! Thank you for your order.');
    router.push('/');
  } catch (error) {
    console.error('Error saving order:', error);
    alert('Payment was successful, but there was an error saving your order. Please contact support with reference: ' + reference.reference);
  } finally {
    setIsProcessing(false);
  }
};
