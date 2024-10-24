// components/ProtectedPrice.tsx
'use client';

import { useUser } from '@clerk/nextjs';
import React from 'react';

interface ProtectedPriceProps {
  price: number;
}

const ProtectedPrice: React.FC<ProtectedPriceProps> = ({ price }) => {
  const { isSignedIn } = useUser();

  return (
    <span>
      {isSignedIn ? `$${price.toFixed(2)}` : 'Login to see the price'}
    </span>
  );
};

export default ProtectedPrice;
