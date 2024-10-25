// "use client"

// import { useState, useEffect } from "react"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { toast } from "@/hooks/use-toast"
// import { api } from "@/services/api"

// const collectionSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   description: z.string().optional(),
// })

// type CollectionFormData = z.infer<typeof collectionSchema>

// export default function CollectionsPage() {
//   const [collections, setCollections] = useState<CollectionFormData[]>([])
//   const [isLoading, setIsLoading] = useState(false)
//   const { register, handleSubmit, reset, formState: { errors } } = useForm<CollectionFormData>({
//     resolver: zodResolver(collectionSchema),
//   })

//   useEffect(() => {
//     fetchCollections()
//   }, [])

//   const fetchCollections = async () => {
//     setIsLoading(true)
//     try {
//       const data = await api.getCollections()
//       setCollections(data)
//     } catch (error) {
//       console.error("Failed to fetch collections:", error)
//       toast({
//         title: "Error",
//         description: "Failed to fetch collections. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const onSubmit = async (data: CollectionFormData) => {
//     setIsLoading(true)
//     try {
//       await api.createCollection(data)
//       reset()
//       fetchCollections()
//       toast({
//         title: "Success",
//         description: "Collection added successfully!",
//       })
//     } catch (error) {
//       console.error("Failed to create collection:", error)
//       toast({
//         title: "Error",
//         description: "Failed to add collection. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="container mx-auto py-8">
//       <h2 className="text-3xl font-bold mb-6">Collections</h2>
//       <Card className="mb-8">
//         <CardHeader>
//           <CardTitle>Add New Collection</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <div>
//               <Label htmlFor="name">Name</Label>
//               <Input id="name" {...register("name")} />
//               {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
//             </div>
//             <div>
//               <Label htmlFor="description">Description</Label>
//               <Textarea id="description" {...register("description")} />
//             </div>
//             <Button type="submit" disabled={isLoading}>
//               {isLoading ? "Adding..." : "Add Collection"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//       <div>
//         <h3 className="text-2xl font-semibold mb-4">Existing Collections</h3>
//         {isLoading ? (
//           <p>Loading collections...</p>
//         ) : collections.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {collections.map((collection) => (
//               <Card key={collection.name}>
//                 <CardHeader>
//                   <CardTitle>{collection.name}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-muted-foreground">{collection.description || "No description provided."}</p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         ) : (
//           <p>No collections found. Add a new collection to get started.</p>
//         )}
//       </div>
//     </div>
//   )
// }

'use client'

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
  image: z.string().optional(),
  gradientStart: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format").optional(),
  gradientEnd: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format").optional(),
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
            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" {...register("image")} />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label htmlFor="gradientStart">Gradient Start Color</Label>
                <div className="flex items-center space-x-2">
                  <Input id="gradientStart" type="color" {...register("gradientStart")} className="w-12 h-12 p-1" />
                  <Input {...register("gradientStart")} placeholder="#3490dc" />
                </div>
                {errors.gradientStart && <p className="text-red-500 text-sm">{errors.gradientStart.message}</p>}
              </div>
              <div className="flex-1">
                <Label htmlFor="gradientEnd">Gradient End Color</Label>
                <div className="flex items-center space-x-2">
                  <Input id="gradientEnd" type="color" {...register("gradientEnd")} className="w-12 h-12 p-1" />
                  <Input {...register("gradientEnd")} placeholder="#6574cd" />
                </div>
                {errors.gradientEnd && <p className="text-red-500 text-sm">{errors.gradientEnd.message}</p>}
              </div>
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
                  <p className="text-muted-foreground mb-2">{collection.description || "No description provided."}</p>
                  {collection.image ? (
                    <img src={collection.image} alt={collection.name} className="w-full h-32 object-cover rounded-md" />
                  ) : (
                    <div 
                      className="w-full h-32 rounded-md flex items-center justify-center text-white font-bold"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${collection.gradientStart || '#3490dc'}, ${collection.gradientEnd || '#6574cd'})`
                      }}
                    >
                      {collection.name}
                    </div>
                  )}
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