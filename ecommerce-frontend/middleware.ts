import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: [
    // Exclude Next.js internals and static files unless referenced in search params
    '/((?!_next|.*\\.(html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Apply middleware to API and TRPC routes
    '/(api|trpc)(.*)',
  ],
}
