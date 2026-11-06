const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5221/api/v1';

async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Error HTTP: ${response.status}`);
  }
  
  return response.json();
}

// ==========================================
// 1. MENÚ PÚBLICO
// ==========================================
export const publicApi = {
  getMenu: async (tenantSlug: string) => {
    return fetchApi(`/tenants/${tenantSlug}/menu`, { cache: 'no-store' });
  }
};

// ==========================================
// 2. AUTENTICACIÓN
// ==========================================
export const authApi = {
  login: async (email: string, password: string) => {
    return fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }
};

// ==========================================
// 3. CONFIGURACIÓN (SETTINGS)
// ==========================================
export const settingsApi = {
  // Nueva función para traer los datos al cargar la pantalla
  getProfile: async (token: string) => {
    return fetchApi('/admin/tenant/profile', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  },

  updateGeneral: async (data: { name: string; phone: string; address: string }, token: string) => {
    return fetchApi('/admin/tenant/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { 'Authorization': `Bearer ${token}` }
    });
  },

  updateBranding: async (data: { brandColor: string; brandLight: string }, token: string) => {
    return fetchApi('/admin/branding', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }
};

// ==========================================
// 4. CATEGORÍAS (CRUD)
// ==========================================
export const categoriesApi = {
  getAll: async (token: string) => fetchApi('/admin/categories', { headers: { 'Authorization': `Bearer ${token}` } }),
  create: async (data: { name: string }, token: string) => fetchApi('/admin/categories', { method: 'POST', body: JSON.stringify(data), headers: { 'Authorization': `Bearer ${token}` } }),
  update: async (id: string, data: { name: string }, token: string) => fetchApi(`/admin/categories/${id}`, { method: 'PUT', body: JSON.stringify(data), headers: { 'Authorization': `Bearer ${token}` } }),
  delete: async (id: string, token: string) => fetchApi(`/admin/categories/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } })
};

// ==========================================
// 5. PLATOS (MENU ITEMS CRUD)
// ==========================================
type ProductData = { name: string; categoryId: string; basePrice: number; isAvailable: boolean; imageUrl?: string; };

export const productsApi = {
  getAll: async (token: string) => fetchApi('/admin/items', { headers: { 'Authorization': `Bearer ${token}` } }),
  create: async (data: ProductData, token: string) => fetchApi('/admin/items', { method: 'POST', body: JSON.stringify(data), headers: { 'Authorization': `Bearer ${token}` } }),
  update: async (id: string, data: ProductData, token: string) => fetchApi(`/admin/items/${id}`, { method: 'PUT', body: JSON.stringify(data), headers: { 'Authorization': `Bearer ${token}` } }),
  delete: async (id: string, token: string) => fetchApi(`/admin/items/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } })
};