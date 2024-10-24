// app/collections/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  images: string[];
}

export default function CollectionDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3001/products?collectionId=${id}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Products</h1>
      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <li key={product._id} className="border p-4">
            <Link href={`/products/${product._id}`}>
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <h2 className="text-xl mt-2">{product.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
