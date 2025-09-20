'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/store/cart';
import { CartLink } from '@/components/cart-link';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description?: string;
}

// Mock products data - in a real app, this would come from an API
const products: Product[] = [
  {
    id: 1,
    name: 'Ray-Ban Aviator',
    price: 159.99,
    category: 'glasses',
    image: '/images/products/rayban.jpg',
    description: 'Classic aviator sunglasses with gold frame',
  },
  {
    id: 2,
    name: 'Ray-Ban Wayfarer',
    price: 149.99,
    category: 'glasses',
    image: '/images/products/wayfarer.jpg',
    description: 'Iconic wayfarer style sunglasses',
  },
  {
    id: 3,
    name: 'Leather Belt Brown',
    price: 49.99,
    category: 'belts',
    image: '/images/products/belt.jpg',
    description: 'Premium leather belt with classic buckle',
  },
  {
    id: 4,
    name: 'Classic Watch',
    price: 299.99,
    category: 'watches',
    image: '/images/products/watch.jpg',
    description: 'Elegant timepiece with leather strap',
  },
];

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;
  const { addItem } = useCart();

  const categoryProducts = products.filter(
    (product) => product.category === categoryId
  );

  const categoryTitles: { [key: string]: string } = {
    glasses: 'Eyewear Collection',
    belts: 'Premium Belts',
    watches: 'Luxury Watches',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <CartLink />
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">
          {categoryTitles[categoryId] || 'Products'}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categoryProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  <Button onClick={() => addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image
                  })}>
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {categoryProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}