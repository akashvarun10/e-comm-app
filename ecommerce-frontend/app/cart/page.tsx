'use client'

import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus, LogIn } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart()
  const { isSignedIn } = useUser()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleRemove = (productId: string) => {
    removeFromCart(productId)
  }

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity)
    }
  }

  const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  if (!isSignedIn) {
    return (
      <Card className="max-w-md mx-auto mt-12">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Your Cart</CardTitle>
        </CardHeader>
        <CardContent className="text-center p-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <LogIn className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
            <p className="text-xl mb-8">Please log in to view your cart.</p>
            <Link href="/sign-in">
              <Button className="w-full sm:w-auto">
                Log In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <ShoppingBag className="w-12 h-12 text-primary" />
        </motion.div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <Card className="max-w-md mx-auto mt-12">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Your Cart</CardTitle>
        </CardHeader>
        <CardContent className="text-center p-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
            <p className="text-xl mb-8">Your cart is empty.</p>
            <Link href="/collections">
              <Button className="w-full sm:w-auto">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Your Shopping Cart
      </motion.h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Cart Items ({cartItems.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-400px)] p-4">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.productId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.1 }}
                    className="flex items-center space-x-4 py-6 border-b last:border-b-0"
                  >
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-sm text-muted-foreground">Price: ${item.price.toFixed(2)}</p>
                      <div className="flex items-center mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                          className="rounded-full"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleUpdateQuantity(item.productId, parseInt(e.target.value))}
                          className="w-16 mx-2 text-center"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                          className="rounded-full"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemove(item.productId)}
                      className="rounded-full"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </ScrollArea>
          </CardContent>
          <CardFooter className="bg-muted/50">
            <Button onClick={clearCart} variant="outline" className="w-full">
              Clear Cart
            </Button>
          </CardFooter>
        </Card>
        <Card className="lg:sticky lg:top-8 h-fit">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="flex justify-between text-lg">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-xl">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              Proceed to Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}