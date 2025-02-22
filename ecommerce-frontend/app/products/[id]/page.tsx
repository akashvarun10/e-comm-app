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
import { motion, AnimatePresence } from 'framer-motion'

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
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-t-4 border-primary rounded-full"
        />
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
      setTimeout(() => setShowAlert(false), 3000)
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
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Alert className="mb-4">
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                {quantity} x {product.name} has been added to your cart.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="flex mb-4 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <Link href={`/collections/${product.collectionId.name}`} className="hover:text-primary transition-colors">{product.collectionId.name}</Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <span className="text-primary">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <Carousel className="w-full max-w-md mx-auto">
                <CarouselContent>
                  {product.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="aspect-square relative overflow-hidden rounded-lg"
                      >
                        <Image
                          src={image}
                          alt={`${product.name} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <CardHeader className="px-0 pt-0">
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
                            <motion.div
                              key={index}
                              whileHover={{ scale: 1.2 }}
                              className="w-6 h-6 rounded-full border cursor-pointer"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {product.sizes && product.sizes.length > 0 && (
                      <div className="flex items-center gap-2">
                        <strong>Sizes:</strong>
                        <div className="flex gap-1">
                          {product.sizes.map((size, index) => (
                            <motion.div key={index} whileHover={{ scale: 1.1 }}>
                              <Badge variant="secondary">{size}</Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <motion.div key={index} whileHover={{ scale: 1.05 }}>
                      <Badge variant="outline">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
                <Button className="w-full" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-4 w-4" /> {isSignedIn ? 'Add to Cart' : 'Login to Add to Cart'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {relatedProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct, index) => (
              <motion.div
                key={relatedProduct._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/products/${relatedProduct._id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-0">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="aspect-square relative overflow-hidden"
                      >
                        <Image
                          src={relatedProduct.images[0]}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    </CardContent>
                    <CardFooter className="p-4">
                      <div>
                        <h3 className="text-lg font-semibold line-clamp-1">{relatedProduct.name}</h3>
                        <ProtectedPrice price={relatedProduct.price} discountPrice={relatedProduct.discountPrice} />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4"
          >
            <Button
              className="rounded-full shadow-lg"
              size="icon"
              onClick={scrollToTop}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  )
}