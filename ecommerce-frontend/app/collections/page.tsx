'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Collection {
  _id: string
  name: string
  description: string
  image: string // Assuming you add an image field to your collections
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([])

  useEffect(() => {
    fetch('http://localhost:3001/collections/collections')
      .then((res) => res.json())
      .then((data) => setCollections(data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Our Collections</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <Card key={collection._id}>
            <CardHeader>
              <CardTitle>{collection.name}</CardTitle>
              <CardDescription>{collection.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <img src={collection.image || '/placeholder.svg'} alt={collection.name} className="w-full h-48 object-cover rounded-md" />
            </CardContent>
            <CardFooter>
              <Link href={`/collections/${collection._id}`}>
                <Button>View Products</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}