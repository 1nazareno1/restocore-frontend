import React from 'react';

// Definimos los "cables" que le vamos a conectar desde la página principal
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange
}: PaginationProps) {
  
  // Si no hay páginas, no mostramos nada
  if (totalPages === 0) return null;

  return (
    <div className="border-t border-gray-100 p-4 flex items-center justify-between text-sm text-gray-500 font-sans">
      
      {/* Texto de información */}
      <p>
        Mostrando {(currentPage - 1) * itemsPerPage + 1}-
        {Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems} elementos
      </p>
      
      {/* Botonera */}
      <div className="flex items-center gap-1">
        
        {/* Botón Anterior */}
        <button 
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="p-1 hover:text-gray-900 disabled:opacity-30 disabled:hover:text-gray-500 transition-opacity"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
        </button>
        
        {/* Números de página */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button 
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-7 h-7 rounded-full font-bold flex items-center justify-center transition-colors ${
              currentPage === page ? 'bg-[#c64010] text-white' : 'hover:bg-gray-100 font-medium text-gray-600'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Botón Siguiente */}
        <button 
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-1 hover:text-gray-900 disabled:opacity-30 disabled:hover:text-gray-500 transition-opacity"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
        </button>

      </div>
    </div>
  );
}