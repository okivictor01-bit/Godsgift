import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    console.log('🔔 Webhook received from Paystack');
    
    const body = await request.json();
    console.log('Event type:', body.event);

    // Only process successful payments
    if (body.event !== 'charge.success') {
      console.log('Ignoring event:', body.event);
      return NextResponse.json({ message: 'Event ignored' });
    }

    // Initialize Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, metadata } = body.data;
    console.log('Payment reference:', data.reference);
    console.log('Amount:', data.amount / 100);

    // Check if order already exists
    const { data: existingOrder } = await supabase
      .from('orders')
      .select('id')
      .eq('reference', data.reference)
      .single();

    if (existingOrder) {
      console.log('Order already exists');
      return NextResponse.json({ message: 'Order already exists' });
    }

    // Parse cart items from metadata
    let cartItems = [];
    if (metadata?.cart_items) {
      try {
        cartItems = JSON.parse(metadata.cart_items);
      } catch (e) {
        console.error('Failed to parse cart items');
      }
    }

    // Create the order
    const { error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_email: data.customer?.email || metadata?.email || 'unknown@example.com',
        customer_name: metadata?.name || 'Customer',
        customer_phone: metadata?.phone || '',
        amount: data.amount / 100,
        status: 'paid',
        reference: data.reference,
        paid_at: new Date().toISOString(),
        delivery_address: metadata?.address || ''
      });

    if (orderError) {
      console.error('Failed to create order:', orderError);
      return NextResponse.json({ error: orderError.message }, { status: 500 });
    }

    console.log('✅ Order created successfully');

    // Create order items and update stock
    for (const item of cartItems) {
      await supabase.from('order_items').insert({
        order_id: data.reference,
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price
      });

      // Reduce stock
      const { data: product } = await supabase
        .from('products')
        .select('stock')
        .eq('id', item.id)
        .single();

      if (product && product.stock !== null) {
        await supabase
          .from('products')
          .update({ stock: product.stock - item.quantity })
          .eq('id', item.id);
      }
    }

    return NextResponse.json({ message: 'Success' });
  } catch (error) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
