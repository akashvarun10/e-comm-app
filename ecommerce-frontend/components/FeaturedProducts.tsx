'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import ProtectedPrice from '@/components/ProctectedPrice'

interface Product {
  _id: string
  name: string
  price: number
  discountPrice?: number
  images: string[]
  tags: string[]
}

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('http://localhost:3001/products/filter/products?featured=true')
        if (!response.ok) {
          throw new Error(`Failed to fetch featured products: ${response.status}`)
        }
        const data = await response.json()
        setFeaturedProducts(data)
      } catch (error) {
        console.error('Error fetching featured products:', error)
        setError('Failed to load featured products. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <Skeleton className="h-48 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px] mt-2" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (featuredProducts.length === 0) {
    return (
      <Alert>
        <AlertTitle>No Featured Products</AlertTitle>
        <AlertDescription>There are no featured products available at the moment.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProducts.map((product) => (
          <Card key={product._id} className="flex flex-col">
            <CardHeader>
              <Image
                src={product.images[0] || '/placeholder.svg?height=200&width=200'}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="flex-grow">
              <CardTitle className="mb-2">{product.name}</CardTitle>
              <div className="flex flex-wrap gap-2 mb-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <ProtectedPrice price={product.price} discountPrice={product.discountPrice} />
            </CardContent>
            <CardFooter>
              <Link href={`/products/${product._id}`} className="w-full">
                <Button variant="outline" className="w-full">View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}