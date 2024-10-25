// // components/ProtectedPrice.tsx
// 'use client';

// import { useUser } from '@clerk/nextjs';
// import React from 'react';

// interface ProtectedPriceProps {
//   price: number;
// }

// const ProtectedPrice: React.FC<ProtectedPriceProps> = ({ price }) => {
//   const { isSignedIn } = useUser();

//   return (
//     <span>
//       {isSignedIn ? `$${price.toFixed(2)}` : 'Login to see the price'}
//     </span>
//   );
// };

// export default ProtectedPrice;


'use client';

import { useUser } from '@clerk/nextjs';
import React from 'react';

interface ProtectedPriceProps {
  price: number;
  discountPrice?: number;
}

const ProtectedPrice: React.FC<ProtectedPriceProps> = ({ price, discountPrice }) => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <span className="text-lg font-semibold">Login to see the price</span>;
  }

  return (
    <div className="flex items-center">
      <span className="text-xl font-bold text-primary">${(discountPrice || price).toFixed(2)}</span>
      {discountPrice && (
        <span className="ml-2 text-lg text-gray-500 line-through">
          ${price.toFixed(2)}
        </span>
      )}
    </div>
  );
};

export default ProtectedPrice;