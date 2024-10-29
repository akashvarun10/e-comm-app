'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import FeaturedProducts from "@/components/FeaturedProducts"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function HomePage() {
  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      initial="initial"
      animate="animate"
      variants={stagger}
    >
      <motion.h1 
        className="text-4xl font-bold mb-6 text-center"
        variants={fadeInUp}
      >
        Welcome to Our Store
      </motion.h1>
      <motion.p 
        className="text-xl mb-8 text-center"
        variants={fadeInUp}
      >
        Discover our amazing collections and products.
      </motion.p>

      <motion.div 
        className="text-center mt-8"
        variants={fadeInUp}
      >
        <Link href="/collections">
          <Button 
            size="lg"
            className="transition-transform hover:scale-105"
          >
            Browse All Collections
          </Button>
        </Link>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className="mt-12"
      >
        <FeaturedProducts />
      </motion.div>
    </motion.div>
  )
}