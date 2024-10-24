'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Collection {
  _id: string
  name: string
  description: string
  image: string
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('http://localhost:3001/collections/collections')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch collections')
        }
        return res.json()
      })
      .then((data) => {
        setCollections(data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError('Failed to load collections. Please try again later.')
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState message={error} />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      <h2 className="text-3xl font-bold mb-6 text-center">Our Collections</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <CollectionCard key={collection._id} collection={collection} />
        ))}
      </div>
    </div>
  )
}

// function HeroSection() {
//   return (
//     <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-20 mb-12 rounded-lg text-center">
//       <h1 className="text-4xl font-bold mb-4">Explore Our Collections</h1>
//       <p className="text-xl mb-8">Discover unique pieces that define your style</p>
//       <Button size="lg" variant="secondary">Shop Now</Button>
//     </div>
//   )
// }

function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-pink-500 text-white py-20 mb-12 rounded-lg text-center">
      <h1 className="text-4xl font-bold mb-4">Explore Our Collections</h1>
      <p className="text-xl mb-8">Discover unique pieces that define your style</p>
      <Button size="lg" variant="secondary">Shop Now</Button>
    </div>
  )
}

function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>{collection.name}</CardTitle>
        <CardDescription>{collection.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <img 
          src={collection.image || '/placeholder.svg'} 
          alt={collection.name} 
          className="w-full h-48 object-cover rounded-md transition-transform duration-300 hover:scale-105"
        />
      </CardContent>
      <CardFooter>
        <Link href={`/collections/${collection.name}`} className="w-full">
          <Button className="w-full">View Products</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

function LoadingState() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-40 w-full mb-12 rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="w-full h-48 rounded-md" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  )
}