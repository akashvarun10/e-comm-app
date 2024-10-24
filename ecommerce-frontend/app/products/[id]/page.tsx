// 'use client'

// import { useEffect, useState } from 'react'
// import { useParams } from 'next/navigation'
// import { useAuth } from '@clerk/nextjs'
// import { Button } from '@/components/ui/button'
// import { useCart } from '@/context/CartContext'
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
// import { Badge } from "@/components/ui/badge"
// import { Plus, Minus, ShoppingCart } from 'lucide-react'

// interface Product {
//   _id: string
//   name: string
//   images: string[]
//   price: number
//   discountPrice?: number
//   brand: string
//   description?: string
// }

// export default function ProductPage() {
//   const params = useParams()
//   const id = params?.id as string
//   const [product, setProduct] = useState<Product | null>(null)
//   const [quantity, setQuantity] = useState(1)
//   const { isSignedIn } = useAuth()
//   const { addToCart } = useCart()

//   useEffect(() => {
//     fetch(`http://localhost:3001/products/${id}`)
//       .then((res) => res.json())
//       .then((data) => setProduct(data))
//       .catch((err) => console.error(err))
//   }, [id])

//   if (!product) {
//     return (
//       <div className="flex justify-center items-center h-96">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
//       </div>
//     )
//   }

//   const handleAddToCart = () => {
//     if (product) {
//       const cartItem = {
//         productId: product._id,
//         name: product.name,
//         price: product.discountPrice || product.price,
//         quantity: quantity,
//         image: product.images[0],
//       }
//       addToCart(cartItem)
//       alert('Product added to cart!')
//     }
//   }

//   return (
//     <main className="container mx-auto px-4 py-8">
//       <Card className="overflow-hidden">
//         <div className="md:flex">
//           <div className="md:w-1/2">
//             <Carousel className="w-full max-w-xs mx-auto">
//               <CarouselContent>
//                 {product.images.map((image, index) => (
//                   <CarouselItem key={index}>
//                     <img src={image} alt={`${product.name} - Image ${index + 1}`} className="w-full h-96 object-cover" />
//                   </CarouselItem>
//                 ))}
//               </CarouselContent>
//               <CarouselPrevious />
//               <CarouselNext />
//             </Carousel>
//           </div>
//           <CardContent className="md:w-1/2 p-6">
//             <CardHeader>
//               <CardTitle className="text-3xl font-bold">{product.name}</CardTitle>
//               <Badge variant="secondary" className="mt-2">{product.brand}</Badge>
//             </CardHeader>
//             <div className="mt-4">
//               {isSignedIn ? (
//                 <div className="flex items-center">
//                   <span className="text-2xl font-bold">
//                     ${(product.discountPrice || product.price).toFixed(2)}
//                   </span>
//                   {product.discountPrice && (
//                     <span className="ml-2 text-lg text-gray-500 line-through">
//                       ${product.price.toFixed(2)}
//                     </span>
//                   )}
//                 </div>
//               ) : (
//                 <p className="text-2xl font-bold">Login to view the price</p>
//               )}
//             </div>
//             <p className="mt-4">{product.description || 'No description available.'}</p>
//             {isSignedIn && (
//               <div className="mt-6">
//                 <div className="flex items-center space-x-4 mb-4">
//                   <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
//                     <Minus className="h-4 w-4" />
//                   </Button>
//                   <span className="text-xl font-semibold">{quantity}</span>
//                   <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
//                     <Plus className="h-4 w-4" />
//                   </Button>
//                 </div>
//                 <Button className="w-full" onClick={handleAddToCart}>
//                   <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
//                 </Button>
//               </div>
//             )}
//           </CardContent>
//         </div>
//       </Card>
//     </main>
//   )
// }

'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Plus, Minus, ShoppingCart, Tag } from 'lucide-react'

interface Product {
  _id: string
  name: string
  images: string[]
  price: number
  discountPrice?: number
  brand: string
  description?: string
  tags: string[]
  colors?: string[]
  sizes?: string[]
  featured: boolean
  collectionId: {
    _id: string
    name: string
  }
}

export default function ProductPage() {
  const params = useParams()
  const id = params?.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [quantity, setQuantity] = useState(1)
  const { isSignedIn } = useAuth()
  const { addToCart } = useCart()

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err))

    fetch(`http://localhost:3001/products/${id}/related`)
      .then((res) => res.json())
      .then((data) => setRelatedProducts(data))
      .catch((err) => console.error(err))
  }, [id])

  if (!product) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        productId: product._id,
        name: product.name,
        price: product.discountPrice || product.price,
        quantity: quantity,
        image: product.images[0],
      }
      addToCart(cartItem)
      alert('Product added to cart!')
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:w-1/2">
            <Carousel className="w-full max-w-xs mx-auto">
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <img src={image} alt={`${product.name} - Image ${index + 1}`} className="w-full h-96 object-cover" />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <CardContent className="md:w-1/2 p-6">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">{product.name}</CardTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="secondary">{product.brand}</Badge>
                {product.featured && <Badge variant="default">Featured</Badge>}
                <Badge variant="outline">{product.collectionId.name}</Badge>
              </div>
            </CardHeader>
            <div className="mt-4">
              {isSignedIn ? (
                <div className="flex items-center">
                  <span className="text-2xl font-bold">
                    ${(product.discountPrice || product.price).toFixed(2)}
                  </span>
                  {product.discountPrice && (
                    <span className="ml-2 text-lg text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>
              ) : (
                <p className="text-2xl font-bold">Login to view the price</p>
              )}
            </div>
            <p className="mt-4">{product.description || 'No description available.'}</p>
            {(product.colors?.length > 0 || product.sizes?.length > 0) && (
              <div className="mt-4">
                {product.colors && (
                  <div className="mb-2">
                    <strong>Colors:</strong> {product.colors.join(', ')}
                  </div>
                )}
                {product.sizes && (
                  <div>
                    <strong>Sizes:</strong> {product.sizes.join(', ')}
                  </div>
                )}
              </div>
            )}
            <div className="flex flex-wrap gap-2 mt-4">
              {product.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
            {isSignedIn && (
              <div className="mt-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-xl font-semibold">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button className="w-full" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </div>
            )}
          </CardContent>
        </div>
      </Card>

      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct._id} href={`/products/${relatedProduct._id}`}>
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <img
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover"
                    />
                  </CardContent>
                  <CardFooter className="p-4">
                    <h3 className="text-lg font-semibold">{relatedProduct.name}</h3>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}