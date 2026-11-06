"use client";
import React, { useState, useEffect, useRef } from 'react';
import Modal from '@/components/ui/modal'; 
import ProductFilters from '@/components/admin/ProductFilters';
import ProductTable, { Product } from '@/components/admin/ProductTable';
import Pagination from '@/components/admin/Pagination';
import { productsApi } from '@/lib/api';

const CATEGORIES_LIST = ['Platos principales', 'Entradas', 'Postres', 'Especiales', 'Pizzas a la leña'];
const ITEMS_PER_PAGE = 3;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'delete' | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // 1. Agregamos la referencia y el estado para la imagen
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Le sumamos 'image' al formData inicial
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Platos principales',
    isActive: true,
    image: ''
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('TODAS LAS CATEGORÍAS');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchInitialProducts = async () => {
      const token = localStorage.getItem('resto_token');
      if (!token) {
        console.warn("No hay token para cargar los platos");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const initialProducts = await productsApi.getAll(token);
        setProducts(initialProducts);
      } catch (error) {
        console.error("Error al cargar los platos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'TODAS LAS CATEGORÍAS' || product.categories.includes(categoryFilter);
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const toggleProductStatus = async (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const token = localStorage.getItem('resto_token');
    if (!token) {
      alert("Sesión expirada. Por favor, iniciá sesión de nuevo.");
      return;
    }

    const newIsActive = !product.isActive;

    setProducts(products.map(p => p.id === productId ? { ...p, isActive: newIsActive } : p));

    try {
      const updateData = {
        name: product.name,
        categoryId: product.categories[0], 
        basePrice: product.price,
        isAvailable: newIsActive,
        imageUrl: product.image
      };
      
      await productsApi.update(productId, updateData, token);
    } catch (error) {
      console.error("Error al actualizar la visibilidad del plato:", error);
      setProducts(products.map(p => p.id === productId ? { ...p, isActive: product.isActive } : p));
      alert("Hubo un error al guardar el cambio. Intentá de nuevo.");
    }
  };

  // 2. Función para procesar el archivo seleccionado
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      setImagePreview(tempUrl);
      setFormData(prev => ({ ...prev, image: tempUrl })); 
    }
  };

  const handleOpenCreate = () => {
    setFormData({ name: '', price: '', category: 'Platos principales', isActive: true, image: '' });
    setImagePreview(null); // Limpiamos la foto previa
    setModalMode('create');
    setSelectedProduct(null);
  };

  const handleOpenEdit = (product: Product) => {
    setFormData({ 
      name: product.name, 
      price: product.price.toString(), 
      category: product.categories[0], 
      isActive: product.isActive,
      image: product.image
    });
    setImagePreview(product.image); // Cargamos la foto del plato a editar
    setSelectedProduct(product);
    setModalMode('edit');
  };

  const handleSaveProduct = async () => {
    if (!formData.name.trim()) return; 

    const token = localStorage.getItem('resto_token');
    if (!token) {
      alert("Sesión expirada. Por favor, iniciá sesión de nuevo.");
      return;
    }

    setIsLoading(true);
    try {
      const productData = {
        name: formData.name,
        categoryId: formData.category,
        basePrice: parseFloat(formData.price) || 0,
        isAvailable: formData.isActive,
        // Usamos la imagen subida o un placeholder por defecto
        imageUrl: formData.image || 'https://images.unsplash.com/photo-1544025162-831514bc1113?auto=format&fit=crop&w=150&q=80'
      };

      if (modalMode === 'create') {
        const newProduct = await productsApi.create(productData, token);
        const mappedNewProduct = {
          ...newProduct,
          categories: [newProduct.categoryId],
          price: newProduct.basePrice,
          isActive: newProduct.isAvailable,
          image: newProduct.imageUrl
        };
        setProducts([mappedNewProduct, ...products]);
      } else if (modalMode === 'edit' && selectedProduct) {
        const updatedProduct = await productsApi.update(selectedProduct.id, productData, token);
        const mappedUpdatedProduct = {
          ...updatedProduct,
          categories: [updatedProduct.categoryId],
          price: updatedProduct.basePrice,
          isActive: updatedProduct.isAvailable,
          image: updatedProduct.imageUrl
        };
        setProducts(products.map(p => p.id === selectedProduct.id ? mappedUpdatedProduct : p));
      }
      setModalMode(null);
    } catch (error) {
      console.error("Error al guardar el plato:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (selectedProduct) {
      const token = localStorage.getItem('resto_token');
      if (!token) return;

      setIsLoading(true);
      try {
        await productsApi.delete(selectedProduct.id, token);
        setProducts(products.filter(p => p.id !== selectedProduct.id));
        setModalMode(null);
      } catch (error) {
        console.error("Error al eliminar el plato:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="max-w-6xl py-6 font-sans">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Gestionar Platos</h1>
          <p className="text-gray-500 mt-1">Administrar los artículos de su menú y disponibilidad.</p>
        </div>
        <button 
          onClick={handleOpenCreate}
          className="bg-brand text-white px-5 py-2.5 rounded-lg font-bold text-sm tracking-wide hover:bg-[#a8360d] transition-colors shadow-sm flex items-center gap-2 uppercase shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
          Agregar Nuevo Plato
        </button>
      </div>

      <ProductFilters 
        searchQuery={searchQuery}
        onSearchChange={(value) => { setSearchQuery(value); setCurrentPage(1); }}
        categoryFilter={categoryFilter}
        onCategoryChange={(value) => { setCategoryFilter(value); setCurrentPage(1); }}
        categories={CATEGORIES_LIST}
      />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] overflow-hidden">
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[350px] text-gray-400">
            <svg className="w-8 h-8 animate-spin text-brand mb-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="font-medium animate-pulse">Cargando platos...</p>
          </div>
        ) : (
          <>
            <ProductTable 
              products={paginatedProducts}
              onToggleStatus={toggleProductStatus}
              onEdit={handleOpenEdit}
              onDelete={(product) => { setSelectedProduct(product); setModalMode('delete'); }}
            />
            
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredProducts.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
            />
          </>
        )}

      </div>

      {modalMode && (
        <Modal
          isOpen={!!modalMode}
          onClose={() => setModalMode(null)}
          title={modalMode === 'create' ? 'Nuevo plato' : modalMode === 'edit' ? 'Editar plato' : 'Eliminar plato'}
        >
          {(modalMode === 'create' || modalMode === 'edit') && (
            <div className="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              
              {/* 3. Reemplazamos la cajita de imagen con el input oculto interactivo */}
              <div className="mb-5">
                <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2">Imagen</label>
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  accept="image/png, image/jpeg, image/webp" 
                  className="hidden" 
                />

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-32 border-2 border-dashed border-brand/30 rounded-xl flex flex-col items-center justify-center text-brand hover:bg-orange-50 transition-colors cursor-pointer overflow-hidden relative"
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center bg-orange-50/50 w-full h-full justify-center">
                      <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <span className="text-xs font-medium">Haz clic para subir una imagen</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2">Nombre del plato *</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Ej: Hamburguesa Doble" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand text-gray-900 font-medium" 
                />
              </div>

              <div className="mb-5">
                <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2">Descripción</label>
                <textarea 
                  rows={3} 
                  placeholder="Descripción del plato" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand resize-none text-gray-900 font-medium"
                ></textarea>
              </div>

              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2">Precio *</label>
                  <input 
                    type="text" 
                    value={formData.price} 
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="$ Ej: 8500" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand text-gray-900 font-medium" 
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2">Categorías *</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand bg-white text-gray-900 font-medium"
                  >
                    {CATEGORIES_LIST.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-8 border border-gray-100">
                <div>
                  <p className="font-bold text-gray-900">Visibilidad</p>
                  <p className="text-xs text-gray-500 mt-0.5">Mostrar este artículo en el menú en vivo</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, isActive: !formData.isActive})}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${formData.isActive ? 'bg-brand' : 'bg-gray-300'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button onClick={() => setModalMode(null)} className="px-4 py-2.5 text-xs font-bold text-gray-500 hover:text-gray-800 uppercase tracking-wider transition-colors">Cancelar</button>
                <button 
                  onClick={handleSaveProduct}
                  className="bg-brand text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#a8360d] transition-colors shadow-sm"
                >
                  {modalMode === 'edit' ? 'Guardar Cambios' : '+ Crear Plato'}
                </button>
              </div>
            </div>
          )}

          {modalMode === 'delete' && selectedProduct && (
            <>
              <p className="text-gray-600 text-sm mb-8">
                ¿Estás seguro de que querés eliminar <span className="font-bold">"{selectedProduct.name}"</span>?
              </p>
              <div className="flex items-center justify-end gap-3">
                <button onClick={() => setModalMode(null)} className="px-4 py-2.5 text-xs font-bold text-gray-500 hover:text-gray-800 uppercase tracking-wider transition-colors">Cancelar</button>
                <button 
                  onClick={handleDeleteProduct}
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