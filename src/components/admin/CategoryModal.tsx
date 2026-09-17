
import React from 'react';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CategoryModal({ isOpen, onClose }: CategoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm font-sans">
      <div className="bg-white rounded-2xl w-full max-w-[420px] p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Nueva categoría</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-1.5 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="mb-8">
          <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-2">
            Nombre de la categoría *
          </label>
          <input
            type="text"
            placeholder="Ej: Hamburguesas"
            autoFocus
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-[#c64010]/10 focus:border-[#c64010] transition-all font-medium text-gray-900 placeholder:text-gray-400 placeholder:font-normal"
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <button 
            onClick={onClose} 
            className="px-4 py-2.5 text-xs font-bold text-gray-500 hover:text-gray-800 uppercase tracking-wider transition-colors"
          >
            Cancelar
          </button>
          <button 
            className="bg-[#c64010] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#a8360d] transition-colors shadow-sm"
          >
            Crear Categoría
          </button>
        </div>

      </div>
    </div>

    

   


  );
}