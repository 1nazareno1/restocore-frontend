"use client";
import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/modal'; 
import CategoryList from '@/components/admin/CategoryList';

const INITIAL_CATEGORIES = [
  { id: '1', name: 'Entradas y aperitivos' },
  { id: '2', name: 'Platos principales' },
  { id: '3', name: 'Pizzas a la leña' },
  { id: '4', name: 'Especiales de temporada' },
];

export default function CategoriesPage() {
  // . Arrancamos vacío y con estado de carga
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'delete' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [categoryName, setCategoryName] = useState('');

  //  El useEffect que simula la carga desde Supabase
  useEffect(() => {
    const fetchInitialCategories = async () => {
      setIsLoading(true);
      
      // TODO: Manu -> Acá va el GET real a la base de datos
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulamos 0.8s de espera
      
      setCategories(INITIAL_CATEGORIES);
      setIsLoading(false);
    };

    fetchInitialCategories();
  }, []);

  const handleOpenCreate = () => {
    setCategoryName('');
    setSelectedCategory(null);
    setModalMode('create');
  };

  const handleOpenEdit = (category: any) => {
    setCategoryName(category.name);
    setSelectedCategory(category);
    setModalMode('edit');
  };

  const handleSave = async () => {
    if (!categoryName.trim()) return;

    if (modalMode === 'create') {
      // TODO: Manu -> Acá va el POST a la base de datos
      const newCategory = { id: Date.now().toString(), name: categoryName };
      setCategories([...categories, newCategory]);
    } else if (modalMode === 'edit' && selectedCategory) {
      // TODO: Manu -> Acá va el PUT/PATCH a la base de datos
      setCategories(categories.map(c => c.id === selectedCategory.id ? { ...c, name: categoryName } : c));
    }
    setModalMode(null);
  };

  const handleDelete = async () => {
    if (selectedCategory) {
      // TODO: Manu -> Acá va el DELETE a la base de datos
      setCategories(categories.filter(c => c.id !== selectedCategory.id));
    }
    setModalMode(null);
  };

  return (
    <div className="max-w-4xl py-6 font-sans">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Categorías</h1>
          <p className="text-gray-500 mt-1">Organiza el orden de aparición en tu carta digital.</p>
        </div>
        
        <button 
          onClick={handleOpenCreate}
          className="bg-[#c64010] text-white px-5 py-2.5 rounded-lg font-bold text-sm tracking-wide hover:bg-[#a8360d] transition-colors shadow-sm flex items-center gap-2 uppercase shrink-0"
        >
         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
          Agregar Categoría
        </button>
      </div>

      {/* El condicional que muestra la animación o la lista real */}
      {isLoading ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center min-h-[350px] text-gray-400">
          <svg className="w-8 h-8 animate-spin text-[#c64010] mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="font-medium animate-pulse">Cargando categorías...</p>
        </div>
      ) : (
        <CategoryList 
          categories={categories}
          onEdit={handleOpenEdit}
          onDelete={(cat) => { setSelectedCategory(cat); setModalMode('delete'); }}
        />
      )}

      {modalMode && (
        <Modal
          isOpen={!!modalMode}
          onClose={() => setModalMode(null)}
          title={modalMode === 'create' ? 'Nueva categoría' : modalMode === 'edit' ? 'Editar categoría' : 'Eliminar categoría'}
        >
          
          {(modalMode === 'create' || modalMode === 'edit') && (
            <>
              <div className="mb-8">
                <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Nombre de la categoría *
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Ej: Hamburguesas"
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-[#c64010]/10 focus:border-[#c64010] transition-all font-medium text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3">
                <button 
                  onClick={() => setModalMode(null)} 
                  className="px-4 py-2.5 text-xs font-bold text-gray-500 hover:text-gray-800 uppercase tracking-wider transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSave}
                  className="bg-[#c64010] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#a8360d] transition-colors shadow-sm"
                >
                  {modalMode === 'edit' ? 'Guardar Cambios' : 'Crear Categoría'}
                </button>
              </div>
            </>
          )}

          {modalMode === 'delete' && selectedCategory && (
            <>
              <p className="text-gray-600 text-sm mb-8">
                ¿Estás seguro de que querés eliminar la categoría <span className="font-bold">"{selectedCategory.name}"</span>? Esta acción no se puede deshacer.
              </p>
              
              <div className="flex items-center justify-end gap-3">
                <button 
                  onClick={() => setModalMode(null)} 
                  className="px-4 py-2.5 text-xs font-bold text-gray-500 hover:text-gray-800 uppercase tracking-wider transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleDelete}
                  className="bg-[#da292e] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#b92024] transition-colors shadow-sm"
                >
                  Eliminar
                </button>
              </div>
            </>
          )}

        </Modal>
      )}
    </div>
  );
}