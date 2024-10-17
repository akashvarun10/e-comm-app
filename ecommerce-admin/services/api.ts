const API_BASE_URL = process.env.API_BASE_URL ;

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
  getCollections: () => fetchWithAuth('/collections'),
  createCollection: (data: { name: string; description?: string }) =>
    fetchWithAuth('/collections/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),

  // Products
  getProducts: () => fetchWithAuth('/products'),
  createProduct: (data: { name: string; price: number; description?: string }) =>
    fetchWithAuth('/products/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  updateProduct: (id: string, data: { name?: string; price?: number; description?: string }) =>
    fetchWithAuth(`/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  deleteProduct: (id: string) =>
    fetchWithAuth(`/products/${id}`, { method: 'DELETE' }),
};