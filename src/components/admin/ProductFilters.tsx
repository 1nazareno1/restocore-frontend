import React from 'react';

interface ProductFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
}

export default function ProductFilters({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  categories
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 font-sans">
      
      {/* Lupa y Buscador */}
      <div className="relative flex-1">
        <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input 
          type="text" 
          placeholder="Buscar platos..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c64010]/20 focus:border-[#c64010] transition-colors text-gray-900 font-medium placeholder:text-gray-400"
        />
      </div>

      {/* Select de Categorías */}
      <select 
        value={categoryFilter} 
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#c64010]/20 focus:border-[#c64010] min-w-[220px]"
      >
        <option value="TODAS LAS CATEGORÍAS">TODAS LAS CATEGORÍAS</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

    </div>
  );
}