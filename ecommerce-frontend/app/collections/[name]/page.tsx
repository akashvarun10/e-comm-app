//app/collections/[name]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { PackageOpen } from 'lucide-react'
import ProtectedPrice from '@/components/ProctectedPrice'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

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
      <CardContent className="p-0 relative h-48">
        <Image
          src={product.images[0] || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </CardContent>
      <CardFooter className="p-4">
        <div>
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-sm text-muted-foreground">
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
        <h2 className="text-2xl font-semibold mb-2">No Products Here</h2>
        <p className="text-muted-foreground">
          There are currently no products available in this collection.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <Skeleton key={i} className="w-full h-64" />
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
    <aside className="w-full md:w-1/4 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Brand</h2>
        {availableFilters.brands.map(brand => (
          <div key={brand} className="flex items-center space-x-2">
            <Checkbox
              id={`brand-${brand}`}
              checked={filters.brand.includes(brand)}
              onCheckedChange={() => handleFilterChange('brand', brand)}
            />
            <Label htmlFor={`brand-${brand}`}>{brand}</Label>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Size</h2>
        {availableFilters.sizes.map(size => (
          <div key={size} className="flex items-center space-x-2">
            <Checkbox
              id={`size-${size}`}
              checked={filters.size.includes(size)}
              onCheckedChange={() => handleFilterChange('size', size)}
            />
            <Label htmlFor={`size-${size}`}>{size}</Label>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Color</h2>
        {availableFilters.colors.map(color => (
          <div key={color} className="flex items-center space-x-2">
            <Checkbox
              id={`color-${color}`}
              checked={filters.color.includes(color)}
              onCheckedChange={() => handleFilterChange('color', color)}
            />
            <Label htmlFor={`color-${color}`}>{color}</Label>
          </div>
        ))}
      </div>
      {isSignedIn && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Price Range</h2>
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
        </div>
      )}
      <div>
        <h2 className="text-lg font-semibold mb-2">Tags</h2>
        {availableFilters.tags.map(tag => (
          <div key={tag} className="flex items-center space-x-2">
            <Checkbox
              id={`tag-${tag}`}
              checked={filters.tags.includes(tag)}
              onCheckedChange={() => handleFilterChange('tags', tag)}
            />
            <Label htmlFor={`tag-${tag}`}>{tag}</Label>
          </div>
        ))}
      </div>
      <Button
        onClick={() => setFilters({
          brand: [],
          size: [],
          color: [],
          priceRange: [0, availableFilters.maxPrice],
          tags: []
        })}
      >
        Clear Filters
      </Button>
    </aside>
  )
}

export default function CollectionDetailPage() {
  const params = useParams()
  const encodedName = params.name as string
  const name = decodeURIComponent(encodedName)
  const [allProducts, setAllProducts] = useState<Product[]>([])
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

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`http://localhost:3001/products/collections/name/${encodedName}/products`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setAllProducts(data)
        setFilteredProducts(data)
        
        // Extract available filters from the fetched products
        const brands = Array.from(new Set(data.map((p: Product) => p.brand))) as string[]
        const sizes = Array.from(new Set(data.flatMap((p: Product) => p.sizes))) as string[]
        const colors = Array.from(new Set(data.flatMap((p: Product) => p.colors))) as string[]
        const tags = Array.from(new Set(data.flatMap((p: Product) => p.tags))) as string[]
        const maxPrice = Math.max(...data.map((p: Product) => p.price))

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
        console.error('Error fetching products:', err)
        setAllProducts([])
        setFilteredProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [encodedName])

  useEffect(() => {
    const applyFilters = () => {
      const filtered = allProducts.filter(product => {
        const matchesBrand = filters.brand.length === 0 || filters.brand.includes(product.brand)
        const matchesSize = filters.size.length === 0 || product.sizes.some(size => filters.size.includes(size))
        const matchesColor = filters.color.length === 0 || product.colors.some(color => filters.color.includes(color))
        const matchesPrice = isSignedIn ? (product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]) : true
        const matchesTags = filters.tags.length === 0 || product.tags.some(tag => filters.tags.includes(tag))
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())

        return matchesBrand && matchesSize && matchesColor && matchesPrice && matchesTags && matchesSearch
      })

      setFilteredProducts(filtered)
    }

    applyFilters()
  }, [filters, searchTerm, allProducts, isSignedIn])

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 capitalize">{name} Collection</h1>
        <LoadingGrid />
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">{name} Collection</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <FilterSidebar 
          filters={filters} 
          setFilters={setFilters} 
          availableFilters={availableFilters} 
          isSignedIn={isSignedIn}
        />
        <div className="w-full md:w-3/4">
          <div className="mb-4">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-sm"
            />
          </div>
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </main>
  )
}