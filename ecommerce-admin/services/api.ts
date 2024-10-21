const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  // Add authentication logic here (e.g., add a token to headers)
  const response = await fetch(`${API_BASE_URL}${url}`, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export const api = {
  // Collections
  getCollections: () => fetchWithAuth('/collections/collections'),
  createCollection: (data: { name: string; description?: string }) =>
    fetchWithAuth('/collections/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  getCollectionById: (id: string) => fetchWithAuth(`/collections/collections/${id}`),

  // Products
  getProducts: () => fetchWithAuth('/products'),
  createProduct: (data: {
    name: string;
    collectionName: string;
    price: number;
    images: string[];
    discountPrice?: number;
    colors?: string[];
    sizes?: string[];
    featured?: boolean;
  }) =>
    fetchWithAuth('/products/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  updateProduct: (id: string, data: {
    name?: string;
    price?: number;
    images?: string[];
    discountPrice?: number;
    colors?: string[];
    sizes?: string[];
    featured?: boolean;
  }) =>
    fetchWithAuth(`/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  deleteProduct: (id: string) =>
    fetchWithAuth(`/products/${id}`, { method: 'DELETE' }),
  filterProducts: (params: {
    brand?: string;
    size?: string;
    color?: string;
    priceRange?: string;
    featured?: boolean;
  }) =>
    fetchWithAuth(`/products/filter?${new URLSearchParams(params as Record<string, string>)}`),
};