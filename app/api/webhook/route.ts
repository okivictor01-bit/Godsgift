import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  return NextResponse.json({ 
    message: 'Webhook is working!',
    method: 'POST received'
  });
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    message: 'Webhook endpoint exists!',
    method: 'GET received'
  });
}
