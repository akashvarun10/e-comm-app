// app/Providers.tsx
'use client';

import { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: ReactNode }) {
  return (
      <ClerkProvider>
        <CartProvider>{children}</CartProvider>
      </ClerkProvider>
    
  );
}
