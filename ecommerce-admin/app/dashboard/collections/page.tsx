"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { api } from "@/services/api"

const collectionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
})

type CollectionFormData = z.infer<typeof collectionSchema>

export default function CollectionsPage() {
  const [collections, setCollections] = useState<CollectionFormData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CollectionFormData>({
    resolver: zodResolver(collectionSchema),
  })

  useEffect(() => {
    fetchCollections()
  }, [])

  const fetchCollections = async () => {
    setIsLoading(true)
    try {
      const data = await api.getCollections()
      setCollections(data)
    } catch (error) {
      console.error("Failed to fetch collections:", error)
      toast({
        title: "Error",
        description: "Failed to fetch collections. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: CollectionFormData) => {
    setIsLoading(true)
    try {
      await api.createCollection(data)
      reset()
      fetchCollections()
      toast({
        title: "Success",
        description: "Collection added successfully!",
      })
    } catch (error) {
      console.error("Failed to create collection:", error)
      toast({
        title: "Error",
        description: "Failed to add collection. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">Collections</h2>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Collection</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Collection"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div>
        <h3 className="text-2xl font-semibold mb-4">Existing Collections</h3>
        {isLoading ? (
          <p>Loading collections...</p>
        ) : collections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {collections.map((collection) => (
              <Card key={collection.name}>
                <CardHeader>
                  <CardTitle>{collection.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{collection.description || "No description provided."}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p>No collections found. Add a new collection to get started.</p>
        )}
      </div>
    </div>
  )
}