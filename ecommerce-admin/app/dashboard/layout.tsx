'use client'

import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { LayoutDashboard, LayoutGrid, Package, Menu } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <Sidebar className="border-r hidden lg:block">
          <SidebarHeader className="flex h-14 items-center border-b px-4">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <Package className="h-6 w-6" />
              <span className="">E-commerce Admin</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/collections">
                    <LayoutGrid className="mr-2 h-4 w-4" />
                    Collections
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/products">
                    <Package className="mr-2 h-4 w-4" />
                    Products
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background px-4 lg:px-6">
            <div className="flex items-center">
              <SidebarTrigger className="lg:hidden">
                <Menu className="h-6 w-6" />
              </SidebarTrigger>
              <h1 className="ml-2 text-lg font-semibold lg:hidden">E-commerce Admin</h1>
            </div>
            <UserButton afterSignOutUrl="/" />
          </header>
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            <div className="mx-auto w-full max-w-7xl space-y-4">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}