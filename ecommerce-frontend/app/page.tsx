//app/page.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Our Store</h1>
      <p className="text-xl mb-8">Discover our amazing collections and products.</p>
      <Link href="/collections">
        <Button size="lg">Browse Collections</Button>
      </Link>
    </div>
  )
}