'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { Plus, Minus, ShoppingCart, Tag, ChevronRight, ArrowUp } from 'lucide-react'
import ProtectedPrice from '@/components/ProctectedPrice'
import { useUser } from '@clerk/nextjs'
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"

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
  const { addToCart } = useCart()
  const { isSignedIn } = useUser()
  const [showBackToTop, setShowBackToTop] = useState(false)
  const { toast } = useToast()
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err))

    fetch(`http://localhost:3001/products/${id}/related`)
      .then((res) => res.json())
      .then((data) => setRelatedProducts(data))
      .catch((err) => console.error(err))

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [id])

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (product && isSignedIn) {
      const cartItem = {
        productId: product._id,
        name: product.name,
        price: product.discountPrice || product.price,
        quantity: quantity,
        image: product.images[0],
      }
      addToCart(cartItem)
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000) // Hide alert after 3 seconds
    } else if (!isSignedIn) {
      toast({
        title: "Login required",
        description: "Please log in to add items to your cart.",
        variant: "destructive",
        duration: 3000,
      })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {showAlert && (
        <Alert className="mb-4">
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            {quantity} x {product.name} has been added to your cart.
          </AlertDescription>
        </Alert>
      )}

      <nav className="flex mb-4 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <Link href={`/collections/${product.collectionId.name}`} className="hover:text-primary">{product.collectionId.name}</Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <span className="text-primary">{product.name}</span>
      </nav>

      <Card className="overflow-hidden mb-8 shadow-lg">
        <div className="md:flex">
          <div className="md:w-1/2 p-6">
            <Carousel className="w-full max-w-md mx-auto">
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                      <Image
                        src={image}
                        alt={`${product.name} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <CardContent className="md:w-1/2 p-6">
            <CardHeader className="px-0">
              <CardTitle className="text-3xl font-bold">{product.name}</CardTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="secondary">{product.brand}</Badge>
                {product.featured && <Badge variant="default">Featured</Badge>}
                <Badge variant="outline">{product.collectionId.name}</Badge>
              </div>
            </CardHeader>
            <Separator className="my-4" />
            <div className="space-y-4">
              <div className="flex items-baseline justify-between">
                <ProtectedPrice price={product.price} discountPrice={product.discountPrice} />
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-xl font-semibold">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <ScrollArea className="h-24 rounded-md border p-4">
                <p>{product.description || 'No description available.'}</p>
              </ScrollArea>
              {((product.colors && product.colors.length > 0) || (product.sizes && product.sizes.length > 0)) && (
                <div className="space-y-2">
                  {product.colors && product.colors.length > 0 && (
                    <div className="flex items-center gap-2">
                      <strong>Colors:</strong>
                      <div className="flex gap-1">
                        {product.colors.map((color, index) => (
                          <div key={index} className="w-6 h-6 rounded-full border" style={{ backgroundColor: color }}></div>
                        ))}
                      </div>
                    </div>
                  )}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="flex items-center gap-2">
                      <strong>Sizes:</strong>
                      <div className="flex gap-1">
                        {product.sizes.map((size, index) => (
                          <Badge key={index} variant="secondary">{size}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button className="w-full" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" /> {isSignedIn ? 'Add to Cart' : 'Login to Add to Cart'}
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>

      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct._id} href={`/products/${relatedProduct._id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <Image
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="p-4">
                    <div>
                      <h3 className="text-lg font-semibold line-clamp-1">{relatedProduct.name}</h3>
                      <ProtectedPrice price={relatedProduct.price} discountPrice={relatedProduct.discountPrice} />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {showBackToTop && (
        <Button
          className="fixed bottom-4 right-4 rounded-full shadow-lg"
          size="icon"
          onClick={scrollToTop}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </main>
  )
}