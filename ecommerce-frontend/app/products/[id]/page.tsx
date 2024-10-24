'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { Plus, Minus, ShoppingCart } from 'lucide-react'

interface Product {
  _id: string
  name: string
  images: string[]
  price: number
  discountPrice?: number
  brand: string
  description?: string
}

export default function ProductPage() {
  const params = useParams()
  const id = params?.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const { isSignedIn } = useAuth()
  const { addToCart } = useCart()

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
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
      <Card className="overflow-hidden">
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
              <Badge variant="secondary" className="mt-2">{product.brand}</Badge>
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
    </main>
  )
}