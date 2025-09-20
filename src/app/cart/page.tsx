'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/lib/store/cart';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/cart/whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
        }),
      });

      const data = await response.json();
      if (data.url) {
        clearCart();
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Failed to process checkout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg p-4 flex items-center gap-4 shadow-sm"
                >
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-bold">${getTotal().toFixed(2)}</span>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handleCheckout}
                  disabled={isLoading || items.length === 0}
                  className="w-full"
                >
                  {isLoading ? 'Processing...' : 'Checkout via WhatsApp'}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}