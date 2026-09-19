import React from 'react';
import ProductCard from '@/components/public/ProductCard';

// 1. Mock de datos
const MOCK_CATEGORIES = [
  {
    id: "entradas",
    name: "Entradas",
    products: [
      { 
        id: "e1", 
        name: "Bruschetta al Pomodoro", 
        description: "Pan de masa madre tostado con tomates frescos, ajo, albahaca y aceite de oliva extra virgen.", 
        price: 7.50, 
        imageUrl: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=200&q=80" 
      },
      { 
        id: "e2", 
        name: "Calamari Fritti", 
        description: "Anillos de calamar crujientes ligeramente espolvoreados con harina y fritos.", 
        price: 9.00, 
        imageUrl: null 
      }
    ]
  },
  {
    id: "pizzas",
    name: "Pizzas a la leña",
    products: [
      { 
        id: "p1", 
        name: "Margherita Vera", 
        description: "Salsa de tomate San Marzano, mozzarella fior di latte, albahaca fresca.", 
        price: 12.50, 
        imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=200&q=80",
        featured: true
      },
      { 
        id: "p2", 
        name: "Diavola", 
        description: "Salsa de tomate, mozzarella, nduja picante de Calabria, salami picante.", 
        price: 14.50, 
        imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=200&q=80" 
      }
    ]
  }
];

const TABS = ["Entradas", "Pizzas", "Pastas", "Postres", "Bebidas"];

export default function PublicMenuPage({ params }: { params: { tenantSlug: string } }) {
  return (
    <main className="min-h-screen bg-[#fafafa] pb-12 font-sans">
      
      {/* Header del Restaurante */}
      <header className="bg-white px-4 py-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
          <span className="text-xl">🍕</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900">RestoCore</h1>
      </header>

      {/* Navegación de Categorías Sticky */}
      <nav className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
        <ul className="flex items-center gap-2 overflow-x-auto px-4 py-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {TABS.map((tab, index) => (
            <li key={tab}>
              <button 
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-semibold transition-colors
                  ${index === 0 
                    ? 'bg-brand text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                  }`}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Contenedor Principal del Menú */}
      <div className="max-w-md mx-auto mt-6 px-4 space-y-10">
        {MOCK_CATEGORIES.map((category) => (
          <section key={category.id}>
            
            {/* Título de la Categoría */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-[2px] bg-brand"></div>
              <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
            </div>
            
            {/* Lista de Platos iterando sobre category.products y llamando al componente nuevo */}
            <div className="space-y-4">
              {category.products.map((product) => (
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