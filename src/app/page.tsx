'use client';

import Image from "next/image";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CartLink } from '@/components/cart-link';
import { useCart } from '@/lib/store/cart';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

const categories: Category[] = [
  {
    id: 'glasses',
    name: 'Eyewear',
    description: 'Stylish frames and sunglasses',
    image: '/images/categories/glasses.jpg',
  },
  {
    id: 'belts',
    name: 'Belts',
    description: 'Premium leather belts',
    image: '/images/categories/belts.jpg',
  },
  {
    id: 'watches',
    name: 'Watches',
    description: 'Luxury timepieces',
    image: '/images/categories/watches.jpg',
  },
];

const featuredProducts: Product[] = [
  {
    id: 1,
    name: 'Ray-Ban Aviator',
    price: 159.99,
    category: 'glasses',
    image: '/images/products/rayban.jpg',
  },
  {
    id: 2,
    name: 'Leather Belt Brown',
    price: 49.99,
    category: 'belts',
    image: '/images/products/belt.jpg',
  },
  {
    id: 3,
    name: 'Classic Watch',
    price: 299.99,
    category: 'watches',
    image: '/images/products/watch.jpg',
  },
];

export default function Home() {
  const { addItem } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      <CartLink />
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Premium Fashion Accessories</h1>
          <p className="text-xl mb-8">Discover our collection of eyewear, belts, and watches</p>
          <Link href="/category/glasses">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              href={'/category/' + category.id}
              key={category.id}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-[4/3] relative">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-sm opacity-90">{category.description}</p>
                </div>
                <Image src={category.image} alt={category.name} fill className="object-cover" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">\${product.price.toFixed(2)}</span>
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
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-8">Subscribe to our newsletter for new products and exclusive offers</p>
          <form className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg text-black"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About Us</h3>
            <p className="text-gray-400">Premium fashion accessories for the modern lifestyle.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-400">
              {categories.map((category) => (
                <li key={category.id}>{category.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Contact Us</li>
              <li>Shipping Info</li>
              <li>Returns & Exchanges</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Twitter</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
