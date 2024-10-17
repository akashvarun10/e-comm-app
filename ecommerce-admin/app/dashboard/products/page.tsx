"use client"

import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { api } from "@/services/api"

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  collectionId: z.string().min(1, "Collection is required"),
  images: z.array(z.string()).min(1, "At least one image is required").max(4, "Maximum 4 images allowed"),
  price: z.number().min(0, "Price must be a positive number"),
  discountPrice: z.number().min(0, "Discount price must be a positive number").optional(),
  colors: z.array(z.string()),
  sizes: z.array(z.string()),
  featured: z.boolean(),
})

type ProductFormData = z.infer<typeof productSchema>

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductFormData[]>([])
  const [collections, setCollections] = useState<{ _id: string; name: string }[]>([])
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  })

  useEffect(() => {
    fetchProducts()
    fetchCollections()
  }, [])

  const fetchProducts = async () => {
    try {
      const data = await api.getProducts()
      setProducts(data)
    } catch (error) {
      console.error("Failed to fetch products:", error)
    }
  }

  const fetchCollections = async () => {
    try {
      const data = await api.getCollections()
      setCollections(data)
    } catch (error) {
      console.error("Failed to fetch collections:", error)
    }
  }

  const onSubmit = async (data: ProductFormData) => {
    try {
      await api.createProduct(data)
      reset()
      fetchProducts()
    } catch (error) {
      console.error("Failed to create product:", error)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="collectionId">Collection</Label>
          <Controller
            name="collectionId"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a collection" />
                </SelectTrigger>
                <SelectContent>
                  {collections.map((collection) => (
                    <SelectItem key={collection._id} value={collection._id}>{collection.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.collectionId && <p className="text-red-500 text-sm">{errors.collectionId.message}</p>}
        </div>
        <div>
          <Label htmlFor="images">Images (comma-separated URLs)</Label>
          <Input id="images" {...register("images")} />
          {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input id="price" type="number" {...register("price", { valueAsNumber: true })} />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>
        <div>
          <Label htmlFor="discountPrice">Discount Price (optional)</Label>
          <Input id="discountPrice" type="number" {...register("discountPrice", { valueAsNumber: true })} />
          {errors.discountPrice && <p className="text-red-500 text-sm">{errors.discountPrice.message}</p>}
        </div>
        <div>
          <Label htmlFor="colors">Colors (comma-separated)</Label>
          <Input id="colors" {...register("colors")} />
        </div>
        <div>
          <Label htmlFor="sizes">Sizes (comma-separated)</Label>
          <Input id="sizes" {...register("sizes")} />
        </div>
        <div className="flex items-center space-x-2">
          <Controller
            name="featured"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="featured"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="featured">Featured</Label>
        </div>
        <Button type="submit">Add Product</Button>
      </form>
      <div>
        <h3 className="text-xl font-semibold mb-2">Existing Products</h3>
        <ul className="space-y-2">
          {products.map((product) => (
            <li key={product.name} className="bg-white p-4 rounded shadow">
              <h4 className="font-bold">{product.name}</h4>
              <p>Price: ${product.price}</p>
              <p>Collection: {collections.find(c => c._id === product.collectionId)?.name}</p>
              <p>Featured: {product.featured ? "Yes" : "No"}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}