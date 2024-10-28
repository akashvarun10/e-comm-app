// //app/components/Navbar.tsx
// 'use client'

// import { useEffect, useState } from 'react'
// import Link from 'next/link'
// import { useCart } from '@/context/CartContext'
// import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
// import { ShoppingCart, Menu, Moon, Sun } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
// import { Input } from '@/components/ui/input'
// import { useTheme } from 'next-themes'
// import { ThemeProvider } from 'next-themes'

// interface Collection {
//   _id: string
//   name: string
// }

// function ModeToggle() {
//   const { setTheme, theme } = useTheme()

//   return (
//     <Button
//       variant="ghost"
//       size="icon"
//       onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
//       aria-label="Toggle theme"
//     >
//       <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//       <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//     </Button>
//   )
// }

// function NavbarContent() {
//   const [collections, setCollections] = useState<Collection[]>([])
//   const { cartItems } = useCart()

//   useEffect(() => {
//     fetch('http://localhost:3001/collections/collections')
//       .then((res) => res.json())
//       .then((data) => setCollections(data))
//       .catch((err) => console.error(err))
//   }, [])

//   return (
//     <nav className="border-b">
//       <div className="flex items-center justify-between p-4">
//         <div className="flex items-center space-x-4">
//           <Button variant="ghost" className="md:hidden">
//             <Menu className="h-6 w-6" />
//           </Button>
//           <Link href="/" className="font-bold text-xl">
//             Our Store
//           </Link>
//         </div>
//         <div className="hidden md:flex space-x-4">
//           {collections.map((collection) => (
//             <Link 
//               key={collection._id} 
//               href={`/collections/${encodeURIComponent(collection.name)}`} 
//               className="text-sm font-medium hover:text-primary transition-colors"
//             >
//               {collection.name}
//             </Link>
//           ))}
//         </div>
//         <div className="flex items-center space-x-4">
//           <div className="hidden md:block">
//             <Input type="search" placeholder="Search..." className="w-[200px]" />
//           </div>
//           <Link href="/cart" className="flex items-center space-x-1 hover:text-primary transition-colors">
//             <ShoppingCart className="h-5 w-5" />
//             <span className="text-sm font-medium">({cartItems.length})</span>
//           </Link>
//           <SignedIn>
//             <UserButton afterSignOutUrl="/" />
//           </SignedIn>
//           <SignedOut>
//             <SignInButton>
//               <Button variant="outline" size="sm">
//                 Sign In
//               </Button>
//             </SignInButton>
//           </SignedOut>
//           <ModeToggle />
//         </div>
//       </div>
//       <div className="md:hidden p-4">
//         <Input type="search" placeholder="Search..." className="w-full" />
//       </div>
//       <div className="md:hidden p-4">
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" className="w-full">
//               Collections
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent className="w-full">
//             {collections.map((collection) => (
//               <DropdownMenuItem key={collection._id} asChild>
//                 <Link href={`/collections/${encodeURIComponent(collection.name)}`}>
//                   {collection.name}
//                 </Link>
//               </DropdownMenuItem>
//             ))}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </nav>
//   )
// }

// export default function Navbar() {
//   return (
//     <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
//       <NavbarContent />
//     </ThemeProvider>
//   )
// }

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/context/CartContext'
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import { ShoppingCart, Menu, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { useTheme } from 'next-themes'
import { ThemeProvider } from 'next-themes'

interface Collection {
  _id: string
  name: string
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}

const slideDown = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
}

function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === 'light' ? (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  )
}

function NavbarContent() {
  const [collections, setCollections] = useState<Collection[]>([])
  const { cartItems } = useCart()

  useEffect(() => {
    fetch('http://localhost:3001/collections/collections')
      .then((res) => res.json())
      .then((data) => setCollections(data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <motion.nav
      className="border-b"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link href="/" className="font-bold text-xl">
              Our Store
            </Link>
          </motion.div>
        </div>
        <motion.div className="hidden md:flex space-x-4" variants={slideDown}>
          {collections.map((collection) => (
            <motion.div key={collection._id} whileHover={{ scale: 1.1 }}>
              <Link 
                href={`/collections/${encodeURIComponent(collection.name)}`} 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {collection.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="flex items-center space-x-4" variants={slideDown}>
          <motion.div className="hidden md:block" whileHover={{ scale: 1.05 }}>
            <Input type="search" placeholder="Search..." className="w-[200px]" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link href="/cart" className="flex items-center space-x-1 hover:text-primary transition-colors">
              <ShoppingCart className="h-5 w-5" />
              <span className="text-sm font-medium">({cartItems.length})</span>
            </Link>
          </motion.div>
          <SignedIn>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <UserButton afterSignOutUrl="/" />
            </motion.div>
          </SignedIn>
          <SignedOut>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <SignInButton>
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </SignInButton>
            </motion.div>
          </SignedOut>
          <ModeToggle />
        </motion.div>
      </div>
      <motion.div
        className="md:hidden p-4"
        initial="hidden"
        animate="visible"
        variants={slideDown}
      >
        <Input type="search" placeholder="Search..." className="w-full" />
      </motion.div>
      <motion.div
        className="md:hidden p-4"
        initial="hidden"
        animate="visible"
        variants={slideDown}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full">
              Collections
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            {collections.map((collection) => (
              <DropdownMenuItem key={collection._id} asChild>
                <Link href={`/collections/${encodeURIComponent(collection.name)}`}>
                  {collection.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
    </motion.nav>
  )
}

export default function Navbar() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NavbarContent />
    </ThemeProvider>
  )
}