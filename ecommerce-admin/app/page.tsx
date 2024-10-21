import { SignIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">E-commerce Admin Dashboard</h1>
      <SignIn routing="hash" afterSignInUrl="/dashboard" />
      </main>
  )
}
