"use client"

import { useState, useEffect, useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { api } from "@/services/api"
import { Pencil, Trash2 } from "lucide-react"

const collectionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  colorStart: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format").default("#0000ff"),
  colorEnd: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format").default("#ff00ff"),
})

type CollectionFormData = z.infer<typeof collectionSchema>

interface Collection extends CollectionFormData {
  _id: string;
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [collectionToDelete, setCollectionToDelete] = useState<string | null>(null)

  const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm<CollectionFormData>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      name: "",
      description: "",
      colorStart: "#0000ff",
      colorEnd: "#ff00ff",
    },
  })

  const fetchCollections = useCallback(async () => {
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
  }, [])

  useEffect(() => {
    fetchCollections()
  }, [fetchCollections])

  const onSubmit = async (data: CollectionFormData) => {
    setIsLoading(true)
    try {
      if (editingCollection) {
        await api.updateCollection(editingCollection._id, data)
        toast({
          title: "Success",
          description: "Collection updated successfully!",
        })
      } else {
        await api.createCollection(data)
        toast({
          title: "Success",
          description: "Collection added successfully!",
        })
      }
      resetForm()
      fetchCollections()
    } catch (error) {
      console.error("Failed to save collection:", error)
      toast({
        title: "Error",
        description: "Failed to save collection. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (collection: Collection) => {
    setEditingCollection(collection)
    reset(collection)
  }

  const handleDelete = async (id: string) => {
    setIsLoading(true)
    try {
      await api.deleteCollection(id)
      toast({
        title: "Success",
        description: "Collection deleted successfully!",
      })
      fetchCollections()
    } catch (error) {
      console.error("Failed to delete collection:", error)
      toast({
        title: "Error",
        description: "Failed to delete collection. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setDeleteDialogOpen(false)
      setCollectionToDelete(null)
    }
  }

  const resetForm = () => {
    setEditingCollection(null)
    reset({
      name: "",
      description: "",
      colorStart: "#0000ff",
      colorEnd: "#ff00ff",
    })
  }

  const handleColorChange = (field: "colorStart" | "colorEnd", value: string) => {
    setValue(field, value)
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">Collections</h2>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingCollection ? "Edit Collection" : "Add New Collection"}</CardTitle>
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
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label htmlFor="colorStart">Start Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="colorStart"
                    type="color"
                    {...register("colorStart")}
                    className="w-12 h-12 p-1 rounded"
                    onChange={(e) => handleColorChange("colorStart", e.target.value)}
                  />
                  <Input
                    type="text"
                    {...register("colorStart")}
                    className="flex-1"
                    placeholder="#0000ff"
                    value={watch("colorStart")}
                    onChange={(e) => handleColorChange("colorStart", e.target.value)}
                  />
                </div>
                {errors.colorStart && <p className="text-red-500 text-sm">{errors.colorStart.message}</p>}
              </div>
              <div className="flex-1">
                <Label htmlFor="colorEnd">End Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="colorEnd"
                    type="color"
                    {...register("colorEnd")}
                    className="w-12 h-12 p-1 rounded"
                    onChange={(e) => handleColorChange("colorEnd", e.target.value)}
                  />
                  <Input
                    type="text"
                    {...register("colorEnd")}
                    className="flex-1"
                    placeholder="#ff00ff"
                    value={watch("colorEnd")}
                    onChange={(e) => handleColorChange("colorEnd", e.target.value)}
                  />
                </div>
                {errors.colorEnd && <p className="text-red-500 text-sm">{errors.colorEnd.message}</p>}
              </div>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : (editingCollection ? "Update Collection" : "Add Collection")}
            </Button>
            {editingCollection && (
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel Edit
              </Button>
            )}
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
              <Card key={collection._id}>
                <CardHeader>
                  <CardTitle>{collection.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{collection.description || "No description provided."}</p>
                  <div className="mt-2 flex items-center space-x-2">
                    <div
                      className="w-6 h-6 rounded"
                      style={{ backgroundColor: collection.colorStart }}
                      title="Start Color"
                    />
                    <span>to</span>
                    <div
                      className="w-6 h-6 rounded"
                      style={{ backgroundColor: collection.colorEnd }}
                      title="End Color"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(collection)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="destructive" size="sm" onClick={() => setCollectionToDelete(collection._id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure you want to delete this collection?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete the collection.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={() => collectionToDelete && handleDelete(collectionToDelete)}>
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
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