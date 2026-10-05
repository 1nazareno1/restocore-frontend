/**
 * CENTRAL DE API - RestoCore
 * 
 * TODO: Manu -> ¡Hola! Cualquier cosita que no enteindas mandame a este numero 2317 578215 (ahre que ya me tenes agendado). 
 * Actualmente todas estas funciones devuelven datos falsos y simulan 
 * una demora de red de 1 segundo para que funcionen los loadings en el panel.
 * 
 * La tarea actual seria reemplazar el contenido de cada función con los fetch() reales 
 * apuntando a tus endpoints de FastAPI / Next.js API Routes.
 */

// ==========================================
// 1. AUTENTICACIÓN
// ==========================================
export const authApi = {
  // TODO: Manu -> POST /api/v1/auth/login
  login: async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulamos demora
    
    // Acá deberías devolver el JWT real
    if (email && password) {
      return { token: 'token_jwt_falso_12345', user: { name: 'Chef Marco', role: 'admin' } };
    }
    throw new Error('Credenciales inválidas');
  }
};

// ==========================================
// 2. CONFIGURACIÓN (SETTINGS)
// ==========================================
export const settingsApi = {
  // TODO: Manu -> PUT o PATCH /api/v1/settings/general
  updateGeneral: async (data: { name: string; phone: string; address: string }) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log("Datos guardados en BD:", data);
    return { success: true, message: 'Configuración actualizada' };
  },

  // TODO: Manu -> PUT o PATCH /api/v1/settings/branding
  updateBranding: async (data: { brandColor: string; brandLight: string }) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log("Color guardado en BD:", data);
    return { success: true, message: 'Branding actualizado' };
  }
};

// ==========================================
// 3. CATEGORÍAS (CRUD)
// ==========================================
export const categoriesApi = {
  // TODO: Manu -> GET /api/v1/categories
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      { id: '1', name: 'Entradas', order: 1 },
      { id: '2', name: 'Pizzas a la leña', order: 2 },
      { id: '3', name: 'Bebidas', order: 3 },
    ];
  },

  // TODO: Manu -> POST /api/v1/categories
  create: async (data: { name: string }) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { id: Math.random().toString(), name: data.name, order: 99 };
  },

  // TODO: Manu -> PUT o PATCH /api/v1/categories/{id}
  update: async (id: string, data: { name: string }) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { id, name: data.name, order: 99 };
  },

  // TODO: Manu -> DELETE /api/v1/categories/{id}
  delete: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true };
  }
};

// ==========================================
// 4. PLATOS (PRODUCTS CRUD)
// ==========================================
type ProductData = {
  name: string;
  categories: string[];
  price: number;
  isActive: boolean;
  image: string;
};

export const productsApi = {
  // TODO: Manu -> GET /api/v1/products
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return [
      { id: '1', name: 'Wagyu Ribeye', categories: ['Platos principales'], price: 65.00, isActive: true, image: 'https://images.unsplash.com/photo-1544025162-831514bc1113?auto=format&fit=crop&w=150&q=80' },
      { id: '2', name: 'Truffle Risotto', categories: ['Platos principales', 'Especiales'], price: 28.00, isActive: true, image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=150&q=80' },
      { id: '3', name: 'Hamburguesa Doble', categories: ['Platos principales'], price: 18.00, isActive: false, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=150&q=80' },
      { id: '4', name: 'Empanadas Salteñas', categories: ['Entradas'], price: 12.00, isActive: true, image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?auto=format&fit=crop&w=150&q=80' },
      { id: '5', name: 'Tiramisú', categories: ['Postres'], price: 9.50, isActive: true, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=150&q=80' },
    ];
  },

  // TODO: Manu -> POST /api/v1/products
  create: async (data: ProductData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { id: Math.random().toString(), ...data };
  },

  // TODO: Manu -> PUT o PATCH /api/v1/products/{id}
  update: async (id: string, data: ProductData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { id, ...data };
  },

  // TODO: Manu -> DELETE /api/v1/products/{id}
  delete: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true };
  }
};