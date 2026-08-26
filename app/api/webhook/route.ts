import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('🔔 Webhook received!');
  return NextResponse.json({ message: 'Webhook working!' });
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'API route exists!' });
}
