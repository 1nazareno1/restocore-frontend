"use client";
import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/public/ProductCard';

// 1. MOCK DE DATOS (Lo que Manu nos va a mandar desde la Base de Datos)
const MOCK_DB_RESPONSE = {
  restaurant: {
    name: "RestoCore Bistro",
    brandColor: "#c64010", // El color que elijan en el panel
  },
  categories: [
    {
      id: "entradas",
      name: "Entradas",
      products: [
        { id: "e1", name: "Bruschetta al Pomodoro", description: "Pan de masa madre tostado con tomates frescos, ajo, albahaca y aceite de oliva extra virgen.", price: 7.50, imageUrl: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=200&q=80" },
        { id: "e2", name: "Calamari Fritti", description: "Anillos de calamar crujientes ligeramente espolvoreados con harina y fritos.", price: 9.00, imageUrl: null }
      ]
    },
    {
      id: "pizzas",
      name: "Pizzas a la leña",
      products: [
        { id: "p1", name: "Margherita Vera", description: "Salsa de tomate San Marzano, mozzarella fior di latte, albahaca fresca.", price: 12.50, imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=200&q=80", featured: true },
        { id: "p2", name: "Diavola", description: "Salsa de tomate, mozzarella, nduja picante de Calabria, salami picante.", price: 14.50, imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=200&q=80" }
      ]
    }
  ]
};

export default function PublicMenuPage({ params }: { params: { tenantSlug: string } }) {
  // 2. ESTADOS PARA LA BASE DE DATOS
  const [isLoading, setIsLoading] = useState(true);
  const [menuData, setMenuData] = useState<any>(null);

  // 3. EFECTO DE CARGA INICIAL
  useEffect(() => {
    const fetchMenuFromDatabase = async () => {
      setIsLoading(true);
      
      // TODO: Manu -> Acá va el fetch real: fetch(`/api/v1/tenants/${params.tenantSlug}/menu`)
      // Simulamos que la base de datos tarda 1 segundo en responder
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMenuData(MOCK_DB_RESPONSE);
      
      // Aplicamos el color que vino de la base de datos al CSS global
      document.documentElement.style.setProperty('--brand-color', MOCK_DB_RESPONSE.restaurant.brandColor);
      
      setIsLoading(false);
    };

    fetchMenuFromDatabase();
  }, [params.tenantSlug]);

  // Pantalla de carga mientras trae los datos de la BD
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center font-sans">
        <svg className="w-10 h-10 animate-spin text-brand mb-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-gray-500 font-medium animate-pulse">Cargando el menú...</p>
      </div>
    );
  }

  // Si no hay datos por algún error
  if (!menuData) return <div className="p-8 text-center text-red-500">Error al cargar el menú.</div>;

  return (
    <main className="min-h-screen bg-[#fafafa] pb-12 font-sans">
      
      {/* Header del Restaurante (Datos dinámicos) */}
      <header className="bg-white px-4 py-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
          <span className="text-xl">🍕</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900">{menuData.restaurant.name}</h1>
      </header>

      {/* Navegación de Categorías (Generada automáticamente desde la BD) */}
      <nav className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
        <ul className="flex items-center gap-2 overflow-x-auto px-4 py-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {menuData.categories.map((category: any, index: number) => (
            <li key={`nav-${category.id}`}>
              <button 
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-semibold transition-colors
                  ${index === 0 
                    ? 'bg-brand text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                  }`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Contenedor Principal del Menú */}
      <div className="max-w-md mx-auto mt-6 px-4 space-y-10">
        {menuData.categories.map((category: any) => (
          <section key={category.id}>
            
            {/* Título de la Categoría */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-[2px] bg-brand"></div>
              <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
            </div>
            
            {/* Lista de Platos */}
            <div className="space-y-4">
              {category.products.map((product: any) => (
                <ProductCard 
                  key={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  featured={product.featured}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}