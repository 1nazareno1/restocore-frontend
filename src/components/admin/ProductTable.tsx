import React from 'react';

// Definimos la estructura de un Plato
export interface Product {
  id: string;
  name: string;
  categories: string[];
  price: number;
  isActive: boolean;
  image: string;
}

// Definimos los "cables" que recibe la tabla
interface ProductTableProps {
  products: Product[];
  onToggleStatus: (id: string) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductTable({
  products,
  onToggleStatus,
  onEdit,
  onDelete
}: ProductTableProps) {
  return (
    <div className="overflow-x-auto min-h-[350px] font-sans">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50 border-b border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            <th className="px-6 py-4 rounded-tl-2xl">Plato</th>
            <th className="px-6 py-4">Categorías</th>
            <th className="px-6 py-4">Precio</th>
            <th className="px-6 py-4">Estado</th>
            <th className="px-6 py-4 text-right rounded-tr-2xl">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          
          {/* Si no hay resultados de búsqueda */}
          {products.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-gray-400 font-medium">
                No se encontraron platos que coincidan con tu búsqueda.
              </td>
            </tr>
          )}

          {/* Mapeamos los platos */}
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
              
              {/* Imagen y Nombre */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200/50">
                    <img src={product.image} alt={product.name} className={`w-full h-full object-cover transition-all duration-300 ${!product.isActive && 'grayscale opacity-50'}`} />
                  </div>
                  <span className={`font-bold text-base transition-colors duration-300 ${product.isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                    {product.name}
                  </span>
                </div>
              </td>

              {/* Categorías */}
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-2">
                  {product.categories.map((cat, idx) => (
                    <span key={idx} className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide transition-colors duration-300 ${product.isActive ? 'bg-gray-100 text-gray-500' : 'bg-gray-50 text-gray-300'}`}>
                      {cat}
                    </span>
                  ))}
                </div>
              </td>

              {/* Precio */}
              <td className={`px-6 py-4 font-bold transition-colors duration-300 ${product.isActive ? 'text-gray-700' : 'text-gray-400'}`}>
                ${product.price.toFixed(2)}
              </td>

              {/* Estado (Switch visual) */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => onToggleStatus(product.id)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${product.isActive ? 'bg-brand' : 'bg-gray-300'}`}
                  >
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${product.isActive ? 'translate-x-4' : 'translate-x-1'}`} />
                  </button>
                  <span className={`text-xs font-bold transition-colors duration-300 ${product.isActive ? 'text-gray-500' : 'text-gray-400'}`}>
                    {product.isActive ? 'Visible' : 'Oculto'}
                  </span>
                </div>
              </td>

              {/* Acciones */}
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => onEdit(product)} 
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                  <button 
                    onClick={() => onDelete(product)} 
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}