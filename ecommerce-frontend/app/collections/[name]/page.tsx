// 'use client'

// import { useEffect, useState } from 'react'
// import Link from 'next/link'
// import Image from 'next/image'
// import { useParams } from 'next/navigation'
// import { useUser } from '@clerk/nextjs'
// import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import { Skeleton } from "@/components/ui/skeleton"
// import { PackageOpen, Search, Sliders } from 'lucide-react'
// import ProtectedPrice from '@/components/ProctectedPrice'
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Label } from "@/components/ui/label"
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion"
// import { api } from '@/lib/api'

// interface Collection {
//   _id: string
//   name: string
//   description: string
//   colorStart: string
//   colorEnd: string
// }

// interface Product {
//   _id: string
//   name: string
//   images: string[]
//   price: number
//   brand: string
//   sizes: string[]
//   colors: string[]
//   tags: string[]
// }

// interface FilterState {
//   brand: string[]
//   size: string[]
//   color: string[]
//   priceRange: [number, number]
//   tags: string[]
// }

// interface AvailableFilters {
//   brands: string[]
//   sizes: string[]
//   colors: string[]
//   tags: string[]
//   maxPrice: number
// }

// function ProductCard({ product }: { product: Product }) {
//   return (
//     <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
//       <CardContent className="p-0 relative aspect-square">
//         <Image
//           src={product.images[0] || '/placeholder.svg'}
//           alt={product.name}
//           fill
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//           className="object-cover transition-transform duration-300 hover:scale-105"
//         />
//       </CardContent>
//       <CardFooter className="p-4">
//         <div className="w-full">
//           <h2 className="text-lg font-semibold truncate">{product.name}</h2>
//           <p className="text-sm text-muted-foreground mt-1">
//             <ProtectedPrice price={product.price} />
//           </p>
//         </div>
//       </CardFooter>
//     </Card>
//   )
// }

// function ProductGrid({ products }: { products: Product[] }) {
//   if (products.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <PackageOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
//         <h2 className="text-2xl font-semibold mb-2">No Products Found</h2>
//         <p className="text-muted-foreground">
//           Try adjusting your filters or search terms.
//         </p>
//       </div>
//     )
//   }

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
//       {products.map((product) => (
//         <Link key={product._id} href={`/products/${product._id}`}>
//           <ProductCard product={product} />
//         </Link>
//       ))}
//     </div>
//   )
// }

// function LoadingGrid() {
//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
//       {[...Array(8)].map((_, i) => (
//         <Skeleton key={i} className="w-full aspect-square" />
//       ))}
//     </div>
//   )
// }

// function FilterSidebar({ filters, setFilters, availableFilters, isSignedIn }: {
//   filters: FilterState,
//   setFilters: React.Dispatch<React.SetStateAction<FilterState>>,
//   availableFilters: AvailableFilters,
//   isSignedIn: boolean
// }) {
//   const handleFilterChange = (filterType: keyof FilterState, value: string | number | number[]) => {
//     setFilters(prev => ({
//       ...prev,
//       [filterType]: Array.isArray(prev[filterType])
//         ? (prev[filterType] as string[]).includes(value as string)
//           ? (prev[filterType] as string[]).filter(item => item !== value)
//           : [...prev[filterType] as string[], value as string]
//         : value
//     }))
//   }

//   const handlePriceChange = (index: 0 | 1, value: string) => {
//     const numValue = value === '' ? (index === 0 ? 0 : availableFilters.maxPrice) : parseInt(value, 10)
//     if (!isNaN(numValue)) {
//       setFilters(prev => ({
//         ...prev,
//         priceRange: index === 0
//           ? [numValue, Math.max(numValue, prev.priceRange[1])]
//           : [prev.priceRange[0], numValue]
//       }))
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <Accordion type="single" collapsible className="w-full">
//         <AccordionItem value="brand">
//           <AccordionTrigger>Brand</AccordionTrigger>
//           <AccordionContent>
//             <div className="grid grid-cols-2 gap-2">
//               {availableFilters.brands.map(brand => (
//                 <div key={brand} className="flex items-center space-x-2">
//                   <Checkbox
//                     id={`brand-${brand}`}
//                     checked={filters.brand.includes(brand)}
//                     onCheckedChange={() => handleFilterChange('brand', brand)}
//                   />
//                   <Label htmlFor={`brand-${brand}`} className="text-sm">{brand}</Label>
//                 </div>
//               ))}
//             </div>
//           </AccordionContent>
//         </AccordionItem>
//         <AccordionItem value="size">
//           <AccordionTrigger>Size</AccordionTrigger>
//           <AccordionContent>
//             <div className="flex flex-wrap gap-2">
//               {availableFilters.sizes.map(size => (
//                 <Button
//                   key={size}
//                   variant={filters.size.includes(size) ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => handleFilterChange('size', size)}
//                 >
//                   {size}
//                 </Button>
//               ))}
//             </div>
//           </AccordionContent>
//         </AccordionItem>
//         <AccordionItem value="color">
//           <AccordionTrigger>Color</AccordionTrigger>
//           <AccordionContent>
//             <div className="flex flex-wrap gap-2">
//               {availableFilters.colors.map(color => (
//                 <Button
//                   key={color}
//                   variant={filters.color.includes(color) ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => handleFilterChange('color', color)}
//                   className="capitalize"
//                 >
//                   {color}
//                 </Button>
//               ))}
//             </div>
//           </AccordionContent>
//         </AccordionItem>
//         {isSignedIn && (
//           <AccordionItem value="price">
//             <AccordionTrigger>Price Range</AccordionTrigger>
//             <AccordionContent>
//               <div className="flex items-center space-x-2">
//                 <Input
//                   type="number"
//                   placeholder="Min"
//                   value={filters.priceRange[0] || ''}
//                   onChange={(e) => handlePriceChange(0, e.target.value)}
//                   className="w-24"
//                   min="0"
//                 />
//                 <span>to</span>
//                 <Input
//                   type="number"
//                   placeholder="Max"
//                   value={filters.priceRange[1] === availableFilters.maxPrice ? '' : filters.priceRange[1]}
//                   onChange={(e) => handlePriceChange(1, e.target.value)}
//                   className="w-24"
//                   min={filters.priceRange[0]}
//                 />
//               </div>
//             </AccordionContent>
//           </AccordionItem>
//         )}
//         <AccordionItem value="tags">
//           <AccordionTrigger>Tags</AccordionTrigger>
//           <AccordionContent>
//             <div className="flex flex-wrap gap-2">
//               {availableFilters.tags.map(tag => (
//                 <Button
//                   key={tag}
//                   variant={filters.tags.includes(tag) ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => handleFilterChange('tags', tag)}
//                 >
//                   {tag}
//                 </Button>
//               ))}
//             </div>
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>
//       <Button
//         onClick={() => setFilters({
//           brand: [],
//           size: [],
//           color: [],
//           priceRange: [0, availableFilters.maxPrice],
//           tags: []
//         })}
//         variant="outline"
//         className="w-full"
//       >
//         Clear Filters
//       </Button>
//     </div>
//   )
// }

// export default function CollectionDetailPage() {
//   const params = useParams()
//   const encodedName = params.name as string
//   const name = decodeURIComponent(encodedName)
//   const [collection, setCollection] = useState<Collection | null>(null)
//   const [allProducts, setAllProducts] = useState<Product[]>([])
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [filters, setFilters] = useState<FilterState>({
//     brand: [],
//     size: [],
//     color: [],
//     priceRange: [0, 1000],
//     tags: []
//   })
//   const [availableFilters, setAvailableFilters] = useState<AvailableFilters>({
//     brands: [],
//     sizes: [],
//     colors: [],
//     tags: [],
//     maxPrice: 1000
//   })
//   const { isSignedIn = false } = useUser()
//   const [sortOption, setSortOption] = useState('featured')

//   useEffect(() => {
//     const fetchCollectionAndProducts = async () => {
//       setIsLoading(true)
//       try {
//         // Fetch collection data
//         const collectionResponse = await api.getCollections()
//         const collectionData = collectionResponse.find((c: Collection) => c.name === name)
//         setCollection(collectionData || null)

//         // Fetch products
//         const productsResponse = await fetch(`http://localhost:3001/products/collections/name/${encodedName}/products`)
//         if (!productsResponse.ok) {
//           throw new Error(`HTTP error! status: ${productsResponse.status}`)
//         }
//         const productsData = await productsResponse.json()
//         setAllProducts(productsData)
//         setFilteredProducts(productsData)
        
//         // Extract available filters from the fetched products
//         const brands = Array.from(new Set(productsData.map((p: Product) => p.brand))) as string[]
//         const sizes = Array.from(new Set(productsData.flatMap((p: Product) => p.sizes))) as string[]
//         const colors = Array.from(new Set(productsData.flatMap((p: Product) => p.colors))) as string[]
//         const tags = Array.from(new Set(productsData.flatMap((p: Product) => p.tags))) as string[]
//         const maxPrice = Math.max(...productsData.map((p: Product) => p.price))

//         setAvailableFilters({
//           brands,
//           sizes,
//           colors,
//           tags,
//           maxPrice
//         })

//         setFilters(prev => ({
//           ...prev,
//           priceRange: [0, maxPrice]
//         }))
//       } catch (err) {
//         console.error('Error fetching collection and products:', err)
//         setCollection(null)
//         setAllProducts([])
//         setFilteredProducts([])
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchCollectionAndProducts()
//   }, [encodedName, name])

//   // ... (keep the existing useEffect for applying filters)

//   if (isLoading) {
//     return (
//       <main className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-6 capitalize">{name} Collection</h1>
//         <LoadingGrid />
//       </main>
//     )
//   }

//   return (
//     <main className="container mx-auto px-4 py-8">
//       {collection && (
//         <div
//           className="rounded-lg text-white py-20 px-8 text-center mb-8"
//           style={{
//             background: `linear-gradient(to right, ${collection.colorStart}, ${collection.colorEnd})`,
//           }}
//         >
//           <h1 className="text-4xl font-bold mb-4">{collection.name}</h1>
//           <p className="text-xl mb-8">{collection.description}</p>
//           <Button size="lg" variant="secondary">Explore Collection</Button>
//         </div>
//       )}
//       <div className="flex flex-col lg:flex-row gap-8">
//         <aside className="w-full lg:w-1/4 hidden lg:block">
//           <FilterSidebar 
//             filters={filters} 
//             setFilters={setFilters} 
//             availableFilters={availableFilters} 
//             isSignedIn={isSignedIn}
//           />
//         </aside>
//         <div className="w-full lg:w-3/4">
//           <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
//             <div className="relative w-full sm:w-auto">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search products..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 w-full sm:w-[300px]"
//               />
//             </div>
//             <div className="flex items-center gap-4 w-full sm:w-auto">
//               <Select value={sortOption} onValueChange={setSortOption}>
//                 <SelectTrigger className="w-full sm:w-[180px]">
//                   <SelectValue placeholder="Sort by" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="featured">Featured</SelectItem>
//                   <SelectItem value="price-low-high">Price: Low to High</SelectItem>
//                   <SelectItem value="price-high-low">Price: High to Low</SelectItem>
//                   <SelectItem value="name-a-z">Name: A to Z</SelectItem>
//                   <SelectItem value="name-z-a">Name: Z to A</SelectItem>
//                 </SelectContent>
//               </Select>
//               <Sheet>
//                 <SheetTrigger asChild>
//                   <Button variant="outline" className="lg:hidden">
//                     <Sliders className="mr-2 h-4 w-4" />
//                     Filters
//                   </Button>
//                 </SheetTrigger>
//                 <SheetContent side="left">
//                   <SheetHeader>
//                     <SheetTitle>Filters</SheetTitle>
//                     <SheetDescription>
//                       Refine your product search
//                     </SheetDescription>
//                   </SheetHeader>
//                   <div className="mt-4">
//                     <FilterSidebar 
//                       filters={filters} 
//                       setFilters={setFilters} 
//                       availableFilters={availableFilters} 
//                       isSignedIn={isSignedIn}
//                     />
//                   </div>
//                 </SheetContent>
//               </Sheet>
//             </div>
//           </div>
//           <ProductGrid products={filteredProducts} />
//         </div>
//       </div>
//     </main>
//   )
// }


'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { PackageOpen, Search, Sliders } from 'lucide-react'
import ProtectedPrice from '@/components/ProctectedPrice'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { api } from '@/lib/api'

interface Collection {
  _id: string
  name: string
  description: string
  colorStart: string
  colorEnd: string
}

interface Product {
  _id: string
  name: string
  images: string[]
  price: number
  brand: string
  sizes: string[]
  colors: string[]
  tags: string[]
}

interface FilterState {
  brand: string[]
  size: string[]
  color: string[]
  priceRange: [number, number]
  tags: string[]
}

interface AvailableFilters {
  brands: string[]
  sizes: string[]
  colors: string[]
  tags: string[]
  maxPrice: number
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0 relative aspect-square">
        <Image
          src={product.images[0] || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </CardContent>
      <CardFooter className="p-4">
        <div className="w-full">
          <h2 className="text-lg font-semibold truncate">{product.name}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            <ProtectedPrice price={product.price} />
          </p>
        </div>
      </CardFooter>
    </Card>
  )
}

function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <PackageOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">No Products Found</h2>
        <p className="text-muted-foreground">
          Try adjusting your filters or search terms.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <Link key={product._id} href={`/products/${product._id}`}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  )
}

function LoadingGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {[...Array(8)].map((_, i) => (
        <Skeleton key={i} className="w-full aspect-square" />
      ))}
    </div>
  )
}

function FilterSidebar({ filters, setFilters, availableFilters, isSignedIn }: {
  filters: FilterState,
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>,
  availableFilters: AvailableFilters,
  isSignedIn: boolean
}) {
  const handleFilterChange = (filterType: keyof FilterState, value: string | number | number[]) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: Array.isArray(prev[filterType])
        ? (prev[filterType] as string[]).includes(value as string)
          ? (prev[filterType] as string[]).filter(item => item !== value)
          : [...prev[filterType] as string[], value as string]
        : value
    }))
  }

  const handlePriceChange = (index: 0 | 1, value: string) => {
    const numValue = value === '' ? (index === 0 ? 0 : availableFilters.maxPrice) : parseInt(value, 10)
    if (!isNaN(numValue)) {
      setFilters(prev => ({
        ...prev,
        priceRange: index === 0
          ? [numValue, Math.max(numValue, prev.priceRange[1])]
          : [prev.priceRange[0], numValue]
      }))
    }
  }

  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="brand">
          <AccordionTrigger>Brand</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              {availableFilters.brands.map(brand => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={filters.brand.includes(brand)}
                    onCheckedChange={() => handleFilterChange('brand', brand)}
                  />
                  <Label htmlFor={`brand-${brand}`} className="text-sm">{brand}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="size">
          <AccordionTrigger>Size</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {availableFilters.sizes.map(size => (
                <Button
                  key={size}
                  variant={filters.size.includes(size) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange('size', size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="color">
          <AccordionTrigger>Color</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {availableFilters.colors.map(color => (
                <Button
                  key={color}
                  variant={filters.color.includes(color) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange('color', color)}
                  className="capitalize"
                >
                  {color}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        {isSignedIn && (
          <AccordionItem value="price">
            <AccordionTrigger>Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange[0] || ''}
                  onChange={(e) => handlePriceChange(0, e.target.value)}
                  className="w-24"
                  min="0"
                />
                <span>to</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange[1] === availableFilters.maxPrice ? '' : filters.priceRange[1]}
                  onChange={(e) => handlePriceChange(1, e.target.value)}
                  className="w-24"
                  min={filters.priceRange[0]}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
        <AccordionItem value="tags">
          <AccordionTrigger>Tags</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {availableFilters.tags.map(tag => (
                <Button
                  key={tag}
                  variant={filters.tags.includes(tag) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange('tags', tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button
        onClick={() => setFilters({
          brand: [],
          size: [],
          color: [],
          priceRange: [0, availableFilters.maxPrice],
          tags: []
        })}
        variant="outline"
        className="w-full"
      >
        Clear Filters
      </Button>
    </div>
  )
}

export default function CollectionDetailPage() {
  const params = useParams()
  const encodedName = params.name as string
  const name = decodeURIComponent(encodedName)
  const [collection, setCollection] = useState<Collection | null>(null)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<FilterState>({
    brand: [],
    size: [],
    color: [],
    priceRange: [0, 1000],
    tags: []
  })
  const [availableFilters, setAvailableFilters] = useState<AvailableFilters>({
    brands: [],
    sizes: [],
    colors: [],
    tags: [],
    maxPrice: 1000
  })
  const { isSignedIn = false } = useUser()
  const [sortOption, setSortOption] = useState('featured')

  useEffect(() => {
    const fetchCollectionAndProducts = async () => {
      setIsLoading(true)
      try {
        // Fetch collection data
        const collectionResponse = await api.getCollections()
        const collectionData = collectionResponse.find((c: Collection) => c.name === name)
        setCollection(collectionData || null)

        // Fetch products
        const productsResponse = await fetch(`http://localhost:3001/products/collections/name/${encodedName}/products`)
        if (!productsResponse.ok) {
          throw new Error(`HTTP error! status: ${productsResponse.status}`)
        }
        const productsData = await productsResponse.json()
        setFilteredProducts(productsData)
        
        // Extract available filters from the fetched products
        const brands = Array.from(new Set(productsData.map((p: Product) => p.brand))) as string[]
        const sizes = Array.from(new Set(productsData.flatMap((p: Product) => p.sizes))) as string[]
        const colors = Array.from(new Set(productsData.flatMap((p: Product) => p.colors))) as string[]
        const tags = Array.from(new Set(productsData.flatMap((p: Product) => p.tags))) as string[]
        const maxPrice = Math.max(...productsData.map((p: Product) => p.price))

        setAvailableFilters({
          brands,
          sizes,
          colors,
          tags,
          maxPrice
        })

        setFilters(prev => ({
          ...prev,
          priceRange: [0, maxPrice]
        }))
      } catch (err) {
        console.error('Error fetching collection and products:', err)
        setCollection(null)
        setFilteredProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchCollectionAndProducts()
  }, [encodedName, name])

  useEffect(() => {
    const applyFilters = () => {
      const filtered = filteredProducts.filter(product => {
        const matchesBrand = filters.brand.length === 0 || filters.brand.includes(product.brand)
        const matchesSize = filters.size.length === 0 || product.sizes.some(size => filters.size.includes(size))
        const matchesColor = filters.color.length === 0 || product.colors.some(color => filters.color.includes(color))
        const matchesPrice = isSignedIn ? (product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]) : true
        const matchesTags = filters.tags.length === 0 || product.tags.some(tag => filters.tags.includes(tag))
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())

        return matchesBrand && matchesSize && matchesColor && matchesPrice && matchesTags && matchesSearch
      })

      // Apply sorting
      switch (sortOption) {
        case 'price-low-high':
          filtered.sort((a, b) => a.price - b.price)
          break
        case 'price-high-low':
          filtered.sort((a, b) => b.price - a.price)
          break
        case 'name-a-z':
          filtered.sort((a, b) => a.name.localeCompare(b.name))
          break
        case 'name-z-a':
          filtered.sort((a, b) => b.name.localeCompare(a.name))
          break
        // 'featured' is the default, no sorting needed
      }

      setFilteredProducts(filtered)
    }

    applyFilters()
  }, [filters, searchTerm, isSignedIn, sortOption])

  return (
    <main className="container mx-auto px-4 py-8">
      {collection && (
        <div
          className="rounded-lg text-white py-20 px-8 text-center mb-8"
          style={{
            background: `linear-gradient(to right, ${collection.colorStart}, ${collection.colorEnd})`,
          }}
        >
          <h1 className="text-4xl font-bold  mb-4">{collection.name}</h1>
          <p className="text-xl mb-8">{collection.description}</p>
        </div>
      )}
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4 hidden lg:block">
          <FilterSidebar 
            filters={filters} 
            setFilters={setFilters} 
            availableFilters={availableFilters} 
            isSignedIn={isSignedIn}
          />
        </aside>
        <div className="w-full lg:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-[300px]"
              />
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                  <SelectItem value="name-a-z">Name: A to Z</SelectItem>
                  <SelectItem value="name-z-a">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <Sliders className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Refine your product search
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-4">
                    <FilterSidebar 
                      filters={filters} 
                      setFilters={setFilters} 
                      availableFilters={availableFilters} 
                      isSignedIn={isSignedIn}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          {isLoading ? <LoadingGrid /> : <ProductGrid products={filteredProducts} />}
        </div>
      </div>
    </main>
  )
}