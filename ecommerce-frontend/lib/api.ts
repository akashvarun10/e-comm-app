// services/api.ts
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  // Add authentication logic here (e.g., add a token to headers)
  const response = await fetch(`${API_BASE_URL}${url}`, options);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        message: errorData.message || "An error occurred",
      })
    );
  }
  return response.json();
}

export const api = {
  // Collections
  getCollections: () => fetchWithAuth("/collections/collections"),

  getCollectionById: (id: string) =>
    fetchWithAuth(`/collections/collections/${id}`),

  createCollection: (data: {
    name: string;
    description?: string;
    colorStart: string;
    colorEnd: string;
  }) =>
    fetchWithAuth("/collections/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
  updateCollection: (
    id: string,
    data: {
      name: string;
      description?: string;
      colorStart: string;
      colorEnd: string;
    }
  ) =>
    fetchWithAuth(`/collections/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...data }),
    }),
  deleteCollection: (id: string) =>
    fetchWithAuth(`/collections/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }),

  // Products
  getProducts: () => fetchWithAuth("/products"),
  createProduct: (data: FormData) =>
    fetchWithAuth("/products/create", {
      method: "POST",
      body: data, // FormData includes the headers automatically
    }),
  updateProduct: (id: string, data: FormData) =>
    fetchWithAuth(`/products/${id}`, {
      method: "PUT",
      body: data,
    }),
  deleteProduct: (id: string) =>
    fetchWithAuth(`/products/${id}`, { method: "DELETE" }),
  filterProducts: (params: {
    brand?: string;
    size?: string;
    color?: string;
    priceRange?: string;
    featured?: boolean;
    tags?: string[];
  }) =>
    fetchWithAuth(
      `/products/filter?${new URLSearchParams(
        params as Record<string, string>
      )}`
    ),
};


// // services/api.ts

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

// async function fetchWithAuth(url: string, options: RequestInit = {}) {
//   const token = localStorage.getItem("authToken"); // Replace with your auth retrieval method
//   const headers = new Headers(options.headers || {});

//   if (token) {
//     headers.append("Authorization", `Bearer ${token}`);
//   }

//   const response = await fetch(`${API_BASE_URL}${url}`, { ...options, headers });

//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({}));
//     throw new Error(
//       JSON.stringify({
//         status: response.status,
//         statusText: response.statusText,
//         message: errorData.message || "An error occurred",
//       })
//     );
//   }
//   return response.json();
// }

// // Type definitions for request payloads
// interface CollectionData {
//   name: string;
//   description?: string;
//   colorStart: string;
//   colorEnd: string;
// }

// interface ProductFilterParams {
//   brand?: string;
//   size?: string;
//   color?: string;
//   priceRange?: string;
//   featured?: boolean;
//   tags?: string[];
// }

// export const api = {
//   // Collections
//   getCollections: () => fetchWithAuth("/collections/collections"),

//   getCollectionById: (id: string) =>
//     fetchWithAuth(`/collections/collections/${id}`),

//   createCollection: (data: CollectionData) =>
//     fetchWithAuth("/collections/create", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     }),

//   updateCollection: (id: string, data: CollectionData) =>
//     fetchWithAuth(`/collections/update`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id, ...data }),
//     }),

//   deleteCollection: (id: string) =>
//     fetchWithAuth(`/collections/delete`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id }),
//     }),

//   // Products
//   getProducts: () => fetchWithAuth("/products"),

//   createProduct: (data: FormData) =>
//     fetchWithAuth("/products/create", {
//       method: "POST",
//       body: data,
//     }),

//   updateProduct: (id: string, data: FormData) =>
//     fetchWithAuth(`/products/${id}`, {
//       method: "PUT",
//       body: data,
//     }),

//   deleteProduct: (id: string) =>
//     fetchWithAuth(`/products/${id}`, { method: "DELETE" }),

//   filterProducts: (params: ProductFilterParams) =>
//     fetchWithAuth(
//       `/products/filter?${new URLSearchParams(
//         params as Record<string, string>
//       ).toString()}`
//     ),
// };
