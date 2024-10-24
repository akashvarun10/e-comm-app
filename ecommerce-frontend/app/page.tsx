// //app/page.tsx
// import Link from 'next/link'
// import { Button } from '@/components/ui/button'

// export default function HomePage() {
//   return (
//     <div className="text-center">
//       <h1 className="text-4xl font-bold mb-6">Welcome to Our Store</h1>
//       <p className="text-xl mb-8">Discover our amazing collections and products.</p>
//       <Link href="/collections">
//         <Button size="lg">Browse Collections</Button>
//       </Link>
//     </div>
//   )
// }

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface Product {
  _id: string
  name: string
  images: string[]
  price: number
  discountPrice?: number
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">Welcome to Our Store</h1>
        <p className="text-xl mb-8">Discover our amazing collections and products.</p>
        <Link href="/collections">
          <Button size="lg">Browse Collections</Button>
        </Link>
      </div>

      {products.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Our Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link key={product._id} href={`/products/${product._id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                  </CardContent>
                  <CardFooter className="p-4">
                    <div>
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${(product.discountPrice || product.price).toFixed(2)}
                      </p>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
