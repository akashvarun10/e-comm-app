"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/services/api"

const collectionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
})

type CollectionFormData = z.infer<typeof collectionSchema>

export default function CollectionsPage() {
  const [collections, setCollections] = useState<CollectionFormData[]>([])
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CollectionFormData>({
    resolver: zodResolver(collectionSchema),
  })

  useEffect(() => {
    fetchCollections()
  }, [])

  const fetchCollections = async () => {
    try {
      const data = await api.getCollections()
      setCollections(data)
    } catch (error) {
      console.error("Failed to fetch collections:", error)
    }
  }

  const onSubmit = async (data: CollectionFormData) => {
    try {
      await api.createCollection(data)
      reset()
      fetchCollections()
    } catch (error) {
      console.error("Failed to create collection:", error)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Collections</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description")} />
        </div>
        <Button type="submit">Add Collection</Button>
      </form>
      <div>
        <h3 className="text-xl font-semibold mb-2">Existing Collections</h3>
        <ul className="space-y-2">
          {collections.map((collection) => (
            <li key={collection.name} className="bg-white p-4 rounded shadow">
              <h4 className="font-bold">{collection.name}</h4>
              <p>{collection.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}