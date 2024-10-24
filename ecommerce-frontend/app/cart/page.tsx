'use client'

import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart()

  const handleRemove = (productId: string) => {
    removeFromCart(productId)
  }

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  if (cartItems.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p className="mb-6">Your cart is empty.</p>
        <Link href="/collections">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.productId} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
              <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
            </div>
            <Button variant="destructive" size="icon" onClick={() => handleRemove(item.productId)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-gray-100 p-4 rounded-lg">
        <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
        <div className="mt-4 space-x-4">
          <Button onClick={clearCart} variant="outline">Clear Cart</Button>
          <Button>Proceed to Checkout</Button>
        </div>
      </div>
    </div>
  )
}