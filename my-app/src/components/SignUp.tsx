"use client"

import { useState } from 'react'
import { account, ID } from '@/lib/appwrite'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      await account.create(ID.unique(), email, password)
      await account.createSession(email, password)
      router.push('/dashboard')
    } catch (e) {
      setError('Failed to sign up. Please try again.')
      console.error(e)
    }
  }

  return (
    <form onSubmit={handleSignUp} className="space-y-4 w-full max-w-sm">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" className="w-full">Sign Up</Button>
    </form>
  )
}