// "use client"

// import { useState, useEffect, useCallback } from "react"
// import { useForm, Controller } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Checkbox } from "@/components/ui/checkbox"
// import { api } from "@/services/api"
// import { useToast } from "@/hooks/use-toast"
// import { Toaster } from "@/components/ui/toaster"

// const productSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   brand: z.string().min(1, "Brand is required"),
//   collectionId: z.string().min(1, "Collection is required"),
//   images: z.array(z.string()).min(1, "At least one image is required").max(4, "Maximum 4 images allowed"),
//   price: z.number().min(0, "Price must be a positive number"),
//   discountPrice: z.number().min(0, "Discount price must be a positive number").optional(),
//   colors: z.array(z.string()),
//   sizes: z.array(z.string()),
//   tags: z.array(z.string()),
//   featured: z.boolean(),
// })

// type ProductFormData = z.infer<typeof productSchema>

// export default function ProductsPage() {
//   const [products, setProducts] = useState<ProductFormData[]>([])
//   const [collections, setCollections] = useState<{ _id: string; name: string }[]>([])
//   const { register, handleSubmit, control, reset, formState: { errors } } = useForm<ProductFormData>({
//     resolver: zodResolver(productSchema),
//   })
//   const { toast } = useToast()

//   const fetchProducts = useCallback(async () => {
//     try {
//       const data = await api.getProducts()
//       setProducts(data)
//     } catch (error) {
//       console.error("Failed to fetch products:", error)
//       toast({
//         title: "Error",
//         description: "Failed to fetch products. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }, [toast])

//   const fetchCollections = useCallback(async () => {
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
//     }
//   }, [toast])

//   useEffect(() => {
//     fetchProducts()
//     fetchCollections()
//   }, [fetchProducts, fetchCollections])

//   const onSubmit = async (data: ProductFormData) => {
//     try {
//       await api.createProduct(data)
//       reset()
//       fetchProducts()
//       toast({
//         title: "Success",
//         description: "Product added successfully!",
//       })
//     } catch (error) {
//       console.error("Failed to create product:", error)
//       toast({
//         title: "Error",
//         description: "Failed to add product. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">Products</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <Label htmlFor="name">Name</Label>
//             <Input id="name" {...register("name")} />
//             {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
//           </div>
//           <div>
//             <Label htmlFor="brand">Brand</Label>
//             <Input id="brand" {...register("brand")} />
//             {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>}
//           </div>
//           <div>
//             <Label htmlFor="collectionId">Collection</Label>
//             <Controller
//               name="collectionId"
//               control={control}
//               render={({ field }) => (
//                 <Select onValueChange={field.onChange} defaultValue={field.value}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a collection" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {collections.map((collection) => (
//                       <SelectItem key={collection._id} value={collection._id}>{collection.name}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               )}
//             />
//             {errors.collectionId && <p className="text-red-500 text-sm mt-1">{errors.collectionId.message}</p>}
//           </div>
//           <div>
//             <Label htmlFor="images">Images (comma-separated URLs)</Label>
//             <Input id="images" {...register("images")} />
//             {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>}
//           </div>
//           <div>
//             <Label htmlFor="price">Price</Label>
//             <Input id="price" type="number" {...register("price", { valueAsNumber: true })} />
//             {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
//           </div>
//           <div>
//             <Label htmlFor="discountPrice">Discount Price (optional)</Label>
//             <Input id="discountPrice" type="number" {...register("discountPrice", { valueAsNumber: true })} />
//             {errors.discountPrice && <p className="text-red-500 text-sm mt-1">{errors.discountPrice.message}</p>}
//           </div>
//           <div>
//             <Label htmlFor="colors">Colors (comma-separated)</Label>
//             <Input id="colors" {...register("colors")} />
//           </div>
//           <div>
//             <Label htmlFor="sizes">Sizes (comma-separated)</Label>
//             <Input id="sizes" {...register("sizes")} />
//           </div>
//           <div>
//             <Label htmlFor="tags">Tags (comma-separated)</Label>
//             <Input id="tags" {...register("tags")} />
//           </div>
//           <div className="flex items-center space-x-2">
//             <Controller
//               name="featured"
//               control={control}
//               render={({ field }) => (
//                 <Checkbox
//                   id="featured"
//                   checked={field.value}
//                   onCheckedChange={field.onChange}
//                 />
//               )}
//             />
//             <Label htmlFor="featured">Featured</Label>
//           </div>
//         </div>
//         <Button type="submit" className="w-full">Add Product</Button>
//       </form>
//       <div>
//         <h3 className="text-xl font-semibold mb-4">Existing Products</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {products.map((product) => (
//             <div key={product.name} className="bg-white p-4 rounded shadow">
//               <h4 className="font-bold">{product.name}</h4>
//               <p>Brand: {product.brand}</p>
//               <p>Price: ${product.price}</p>
//               <p>Collection: {collections.find(c => c._id === product.collectionId)?.name}</p>
//               <p>Tags: {product.tags.join(", ")}</p>
//               <p>Featured: {product.featured ? "Yes" : "No"}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//       <Toaster />
//     </div>
//   )
// }

// app/dashboard/products/page.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { api } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";


const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  collectionName: z.string().min(1, "Collection is required"),
  images: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required")
    .max(4, "Maximum 4 images allowed"),
  price: z.number().min(0, "Price must be a positive number"),
  discountPrice: z
    .number()
    .min(0, "Discount price must be a positive number")
    .optional(),
  colors: z
    .string()
    .optional()
    .transform((v) =>
      v ? v.split(",").map((s) => s.trim()).filter(Boolean) : []
    ),
  sizes: z
    .string()
    .optional()
    .transform((v) =>
      v ? v.split(",").map((s) => s.trim()).filter(Boolean) : []
    ),
  tags: z
    .string()
    .optional()
    .transform((v) =>
      v ? v.split(",").map((s) => s.trim()).filter(Boolean) : []
    ),
  featured: z.boolean().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [collections, setCollections] = useState<
    { _id: string; name: string }[]
  >([]);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      featured: false,
      colors: [], // Changed to empty array
      sizes: [], // Changed to empty array
      tags: [], // Changed to empty array
    },
  });
  const { toast } = useToast();

  const fetchProducts = useCallback(async () => {
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast({
        title: "Error",
        description: "Failed to fetch products. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const fetchCollections = useCallback(async () => {
    try {
      const data = await api.getCollections();
      setCollections(data);
    } catch (error) {
      console.error("Failed to fetch collections:", error);
      toast({
        title: "Error",
        description: "Failed to fetch collections. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchProducts();
    fetchCollections();
  }, [fetchProducts, fetchCollections]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      // Create FormData object
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("brand", data.brand);
      formData.append("collectionName", data.collectionName);
      formData.append("price", data.price.toString());

      if (data.discountPrice !== undefined) {
        formData.append("discountPrice", data.discountPrice.toString());
      }

      formData.append("featured", data.featured ? "true" : "false");

      data.images.forEach((image) => {
        formData.append("images", image);
      });

      data.colors.forEach((color) => formData.append("colors", color));
      data.sizes.forEach((size) => formData.append("sizes", size));
      data.tags.forEach((tag) => formData.append("tags", tag));

      await api.createProduct(formData);
      reset();
      fetchProducts();
      toast({
        title: "Success",
        description: "Product added successfully!",
      });
    } catch (error) {
      console.error("Failed to create product:", error);
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Watch for image changes to display previews
  const images = watch("images");

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Products</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          {/* Brand */}
          <div>
            <Label htmlFor="brand">Brand</Label>
            <Input id="brand" {...register("brand")} />
            {errors.brand && (
              <p className="text-red-500 text-sm mt-1">
                {errors.brand.message}
              </p>
            )}
          </div>
          {/* Collection */}
          <div>
            <Label htmlFor="collectionName">Collection</Label>
            <Controller
              name="collectionName"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a collection" />
                  </SelectTrigger>
                  <SelectContent>
                    {collections.map((collection) => (
                      <SelectItem key={collection._id} value={collection.name}>
                        {collection.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.collectionName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.collectionName.message}
              </p>
            )}
          </div>
          {/* Images */}
          <div>
            <Label htmlFor="images">Images (max 4)</Label>
            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                if (files.length > 4) {
                  toast({
                    title: "Error",
                    description: "You can upload a maximum of 4 images.",
                    variant: "destructive",
                  });
                  e.target.value = "";
                  return;
                }
                setValue("images", files);
              }}
            />
            {errors.images && (
              <p className="text-red-500 text-sm mt-1">
                {errors.images.message}
              </p>
            )}
            {/* Image Previews */}
            {images && images.length > 0 && (
              <div className="mt-2 flex space-x-2">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>
          {/* Price */}
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>
          {/* Discount Price */}
          <div>
            <Label htmlFor="discountPrice">Discount Price (optional)</Label>
            <Input
              id="discountPrice"
              type="number"
              step="0.01"
              {...register("discountPrice", { valueAsNumber: true })}
            />
            {errors.discountPrice && (
              <p className="text-red-500 text-sm mt-1">
                {errors.discountPrice.message}
              </p>
            )}
          </div>
          {/* Colors */}
          <div>
            <Label htmlFor="colors">Colors (comma-separated)</Label>
            <Input id="colors" {...register("colors")} />
          </div>
          {/* Sizes */}
          <div>
            <Label htmlFor="sizes">Sizes (comma-separated)</Label>
            <Input id="sizes" {...register("sizes")} />
          </div>
          {/* Tags */}
          <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input id="tags" {...register("tags")} />
          </div>
          {/* Featured */}
          <div className="flex items-center space-x-2">
            <Controller
              name="featured"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="featured"
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
              )}
            />
            <Label htmlFor="featured">Featured</Label>
          </div>
        </div>
        <Button type="submit" className="w-full">
          Add Product
        </Button>
      </form>
      <div>
        <h3 className="text-xl font-semibold mb-4">Existing Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded shadow">
              <h4 className="font-bold">{product.name}</h4>
              <p>Brand: {product.brand}</p>
              <p>Price: ${product.price}</p>
              <p>Collection: {product.collectionId?.name}</p>
              <p>Tags: {product.tags?.join(", ")}</p>
              <p>Featured: {product.featured ? "Yes" : "No"}</p>
              {/* Display product images */}
              {product.images && product.images.length > 0 && (
                <div className="mt-2 flex space-x-2">
                  {product.images.map((imgUrl: string, index: number) => (
                    <img
                      key={index}
                      src={imgUrl}
                      alt="Product Image"
                      className="w-20 h-20 object-cover rounded"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
