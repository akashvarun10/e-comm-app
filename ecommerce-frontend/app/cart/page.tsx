// // 'use client'

// // import { useCart } from '@/context/CartContext'
// // import { Button } from '@/components/ui/button'
// // import Link from 'next/link'
// // import { Trash2 } from 'lucide-react'

// // export default function CartPage() {
// //   const { cartItems, removeFromCart, clearCart } = useCart()

// //   const handleRemove = (productId: string) => {
// //     removeFromCart(productId)
// //   }

// //   const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

// //   if (cartItems.length === 0) {
// //     return (
// //       <div className="text-center">
// //         <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
// //         <p className="mb-6">Your cart is empty.</p>
// //         <Link href="/collections">
// //           <Button>Continue Shopping</Button>
// //         </Link>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div>
// //       <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
// //       <div className="space-y-4">
// //         {cartItems.map((item) => (
// //           <div key={item.productId} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
// //             <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
// //             <div className="flex-1">
// //               <h2 className="text-xl font-semibold">{item.name}</h2>
// //               <p className="text-gray-600">Quantity: {item.quantity}</p>
// //               <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
// //             </div>
// //             <Button variant="destructive" size="icon" onClick={() => handleRemove(item.productId)}>
// //               <Trash2 className="h-4 w-4" />
// //             </Button>
// //           </div>
// //         ))}
// //       </div>
// //       <div className="mt-8 bg-gray-100 p-4 rounded-lg">
// //         <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
// //         <div className="mt-4 space-x-4">
// //           <Button onClick={clearCart} variant="outline">Clear Cart</Button>
// //           <Button>Proceed to Checkout</Button>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// 'use client'

// import { useCart } from '@/context/CartContext'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// import { Separator } from '@/components/ui/separator'
// import { ScrollArea } from '@/components/ui/scroll-area'
// import { Input } from '@/components/ui/input'
// import Link from 'next/link'
// import Image from 'next/image'
// import { Trash2, ShoppingBag, ArrowRight, Plus, Minus } from 'lucide-react'

// export default function CartPage() {
//   const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart()

//   const handleRemove = (productId: string) => {
//     removeFromCart(productId)
//   }

//   const handleUpdateQuantity = (productId: string, newQuantity: number) => {
//     if (newQuantity > 0) {
//       updateQuantity(productId, newQuantity)
//     }
//   }

//   const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
//   const tax = subtotal * 0.1 // Assuming 10% tax
//   const total = subtotal + tax

//   if (cartItems.length === 0) {
//     return (
//       <Card className="max-w-2xl mx-auto mt-12">
//         <CardHeader>
//           <CardTitle className="text-3xl font-bold text-center">Your Cart</CardTitle>
//         </CardHeader>
//         <CardContent className="text-center">
//           <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-4" />
//           <p className="text-xl mb-6">Your cart is empty.</p>
//           <Link href="/collections">
//             <Button className="w-full sm:w-auto">
//               Continue Shopping
//               <ArrowRight className="ml-2 h-4 w-4" />
//             </Button>
//           </Link>
//         </CardContent>
//       </Card>
//     )
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">Your Shopping Cart</h1>
//       <div className="grid md:grid-cols-3 gap-8">
//         <Card className="md:col-span-2">
//           <CardHeader>
//             <CardTitle>Cart Items ({cartItems.length})</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ScrollArea className="h-[calc(100vh-400px)]">
//               {cartItems.map((item) => (
//                 <div key={item.productId} className="flex items-center space-x-4 py-4">
//                   <div className="relative w-24 h-24 rounded-md overflow-hidden">
//                     <Image
//                       src={item.image}
//                       alt={item.name}
//                       layout="fill"
//                       objectFit="cover"
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <h2 className="text-lg font-semibold">{item.name}</h2>
//                     <p className="text-sm text-gray-500">Price: ${item.price.toFixed(2)}</p>
//                     <div className="flex items-center mt-2">
//                       <Button
//                         variant="outline"
//                         size="icon"
//                         onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
//                       >
//                         <Minus className="h-4 w-4" />
//                       </Button>
//                       <Input
//                         type="number"
//                         value={item.quantity}
//                         onChange={(e) => handleUpdateQuantity(item.productId, parseInt(e.target.value))}
//                         className="w-16 mx-2 text-center"
//                       />
//                       <Button
//                         variant="outline"
//                         size="icon"
//                         onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
//                       >
//                         <Plus className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>
//                   <Button variant="destructive" size="icon" onClick={() => handleRemove(item.productId)}>
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </div>
//               ))}
//             </ScrollArea>
//           </CardContent>
//           <CardFooter>
//             <Button onClick={clearCart} variant="outline" className="w-full">
//               Clear Cart
//             </Button>
//           </CardFooter>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Order Summary</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-2">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span>${subtotal.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Tax (10%)</span>
//                 <span>${tax.toFixed(2)}</span>
//               </div>
//               <Separator />
//               <div className="flex justify-between font-bold">
//                 <span>Total</span>
//                 <span>${total.toFixed(2)}</span>
//               </div>
//             </div>
//           </CardContent>
//           <CardFooter>
//             <Button className="w-full">
//               Proceed to Checkout
//               <ArrowRight className="ml-2 h-4 w-4" />
//             </Button>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   )
// }

'use client'

import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus, LogIn } from 'lucide-react'
import { useUser } from '@clerk/nextjs'

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart()
  const { isSignedIn} = useUser()

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
      <Card className="max-w-2xl mx-auto mt-12">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Your Cart</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <LogIn className="w-24 h-24 mx-auto text-gray-300 mb-4" />
          <p className="text-xl mb-6">Please log in to view your cart.</p>
          <Link href="/sign-in">
            <Button className="w-full sm:w-auto">
              Log In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  if (cartItems.length === 0) {
    return (
      <Card className="max-w-2xl mx-auto mt-12">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Your Cart</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-4" />
          <p className="text-xl mb-6">Your cart is empty.</p>
          <Link href="/collections">
            <Button className="w-full sm:w-auto">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Shopping Cart</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Cart Items ({cartItems.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-400px)]">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex items-center space-x-4 py-4">
                  <div className="relative w-24 h-24 rounded-md overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-500">Price: ${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
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
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button variant="destructive" size="icon" onClick={() => handleRemove(item.productId)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <Button onClick={clearCart} variant="outline" className="w-full">
              Clear Cart
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
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