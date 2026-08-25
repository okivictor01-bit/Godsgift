import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Verify this is a successful charge
    if (body.event !== 'charge.success') {
      return NextResponse.json({ message: 'Event not processed' });
    }

    // Initialize Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Extract payment data
    const { data, metadata } = body.data;
    
    // Check if order already exists
    const { data: existingOrder } = await supabase
      .from('orders')
      .select('id')
      .eq('reference', data.reference)
      .single();

    if (existingOrder) {
      return NextResponse.json({ message: 'Order already exists' });
    }

    // Get cart items from metadata (you'll need to pass this during checkout)
    const cartItems = metadata?.cart_items ? JSON.parse(metadata.cart_items) : [];

    // Insert the order
    const { error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_email: data.customer?.email || metadata?.email,
        customer_name: metadata?.name || 'Unknown',
        customer_phone: metadata?.phone || '',
        amount: data.amount / 100, // Convert from kobo to naira
        status: 'paid',
        reference: data.reference,
        paid_at: new Date(data.paid_at).toISOString(),
        delivery_address: metadata?.address || ''
      });

    if (orderError) {
      console.error('Order insertion error:', orderError);
      return NextResponse.json({ error: orderError.message }, { status: 500 });
    }

    // Insert order items
    for (const item of cartItems) {
      await supabase.from('order_items').insert({
        order_id: data.reference,
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price
      });

      // Update product stock
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

    return NextResponse.json({ message: 'Order created successfully' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
  }
}
