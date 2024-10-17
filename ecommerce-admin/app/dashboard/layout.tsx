import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">E-commerce Admin</h1>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>
      <div className="flex-grow flex">
        <nav className="bg-gray-800 w-64 p-4">
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard" className="text-white hover:text-gray-300">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/dashboard/collections" className="text-white hover:text-gray-300">
                Collections
              </Link>
            </li>
            <li>
              <Link href="/dashboard/products" className="text-white hover:text-gray-300">
                Products
              </Link>
            </li>
          </ul>
        </nav>
        <main className="flex-grow p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  )
}