"use client"

import { useState, useEffect } from 'react'
import { account } from '@/lib/appwrite'
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import Link from "next/link"
import { SignUp } from "@/components/SignUp"
import { SignIn } from "@/components/SignIn"

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showSignUp, setShowSignUp] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await account.getSession('current')
        if (session) {
          const user = await account.get()
          setUser(user)
        }
      } catch (error) {
        console.error('No active session:', error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  const handleSignOut = async () => {
    try {
      await account.deleteSession('current')
      setUser(null)
    } catch (error) {
      console.error('Failed to sign out:', error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex min-h-screen">
      {/* Left half: Welcome message */}
      <div className="flex-1 bg-background p-8 flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-4">Welcome to E-commerce</h1>
          <p className="text-muted-foreground">Your one-stop shop for all your needs.</p>
        </div>
        <div className="flex justify-between items-center">
          <Button variant="outline" asChild>
            <Link href={user ? "/dashboard" : "#"}>
              {user ? "Go to Dashboard" : "Learn More"}
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>

      {/* Right half: Authentication */}
      <div className="flex-1 bg-muted flex items-center justify-center">
        {!user ? (
          <div className="space-y-4">
            {showSignUp ? <SignUp /> : <SignIn />}
            <div className="text-center">
              <p>{showSignUp ? "Already have an account?" : "Don't have an account?"}</p>
              <Button variant="link" onClick={() => setShowSignUp(!showSignUp)}>
                {showSignUp ? "Sign In" : "Sign Up"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Welcome back!</h2>
            <p>You're signed in. Enjoy shopping!</p>
            <Button 
              variant="outline" 
              onClick={handleSignOut}
              className="mt-4"
            >
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}