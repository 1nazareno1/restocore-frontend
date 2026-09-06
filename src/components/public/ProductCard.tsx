import React from 'react';

// Definimos qué datos necesita recibir la tarjeta para funcionar
interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  imageUrl?: string | null;
  featured?: boolean;
}

export default function ProductCard({ name, description, price, imageUrl, featured }: ProductCardProps) {
  return (
    <article className="flex bg-white p-3 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-50 gap-4">
      {/* Info del Plato */}
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <div className="flex items-start gap-2">
            <h3 className="font-bold text-gray-900 leading-tight">{name}</h3>
            {featured && (
              <span className="bg-blue-50 text-blue-600 text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase mt-0.5">
                Popular
              </span>
            )}
          </div>
          <p className="mt-1.5 text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>
        <p className="mt-3 font-bold text-[#c64010]">£{price.toFixed(2)}</p>
      </div>

      {/* Imagen o Placeholder */}
      <div className="w-[100px] h-[100px] flex-shrink-0 rounded-xl overflow-hidden bg-orange-50 border border-orange-100/50 flex items-center justify-center">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-200">
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
            <path d="M7 2v20"/>
            <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
          </svg>
        )}
      </div>
    </article>
  );
}