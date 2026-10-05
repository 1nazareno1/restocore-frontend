import React from 'react';

// import Image from 'next/image';

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  imageUrl?: string | null;
  featured?: boolean;
  allergens?: string[]; //  Agregamos los alérgenos
  currencySymbol?: string; //  Moneda dinámica (por defecto $)
}

export default function ProductCard({ 
  name, 
  description, 
  price, 
  imageUrl, 
  featured,
  allergens = [],
  currencySymbol = '$' 
}: ProductCardProps) {
  return (
    <article className="flex bg-white p-3 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-50 gap-4 overflow-hidden relative">
      
      {/* Info del Plato */}
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <div className="flex items-start gap-2">
            <h3 className="font-bold text-gray-900 leading-tight">{name}</h3>
            {featured && (
              <span className="bg-brand/10 text-brand text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase mt-0.5 shrink-0">
                Popular
              </span>
            )}
          </div>
          <p className="mt-1.5 text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {description}
          </p>
          
          {/*  Renderizado de Alérgenos si los hay */}
          {allergens.length > 0 && (
            <div className="flex gap-1 mt-2">
              {allergens.map((allergen, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-500 text-[9px] font-medium px-1.5 py-0.5 rounded-sm" title={allergen}>
                  {allergen}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/*  Símbolo de moneda dinámico y color de marca */}
        <p className="mt-3 font-bold text-brand">
          {currencySymbol}{price.toFixed(2)}
        </p>
      </div>

      {/* Imagen o Placeholder */}
      <div className="w-[100px] h-[100px] flex-shrink-0 rounded-xl overflow-hidden bg-brand-light border border-brand/10 flex items-center justify-center relative">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover"
            loading="lazy" 
          />
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand opacity-50">
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
            <path d="M7 2v20"/>
            <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
          </svg>
        )}
      </div>
    </article>
  );
}