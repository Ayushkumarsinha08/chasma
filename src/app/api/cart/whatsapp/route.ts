import { NextResponse } from 'next/server';

// Replace this with your WhatsApp business number (country code + number, no spaces or special characters)
const WHATSAPP_BUSINESS_NUMBER = "917070622289"; // Replace with your number

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items } = body;

    // Format cart items for WhatsApp message
    const cartItemsText = items
      .map((item: any) => 
        `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
      )
      .join('\n');

    const total = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    // Create WhatsApp message
    const message = `New Order:\n\n${cartItemsText}\n\nTotal: $${total.toFixed(2)}`;
    
    // Create WhatsApp URL with business number
    const whatsappUrl = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(message)}`;

    return NextResponse.json({ url: whatsappUrl });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process cart' },
      { status: 500 }
    );
  }
}