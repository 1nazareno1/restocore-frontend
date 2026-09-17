"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function BrandingSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [brandColor, setBrandColor] = useState('#E25822');

  const handleSave = async () => {
    setIsLoading(true);
    // TODO: Manu -> Acá va el PUT/PATCH para actualizar la configuración visual (color, url de logo)
    await new Promise(resolve => setTimeout(resolve, 800)); 
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl py-6 font-sans">
      
      <div className="mb-8">
        <p className="text-[10px] font-bold text-[#c64010] uppercase tracking-wider mb-1">Panel de Administración</p>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Configuración</h1>
        <p className="text-gray-500 mt-1">Administrá la información de tu restaurante, identidad visual y código QR público.</p>
      </div>

      {/* Navegación por Pestañas */}
      <div className="flex border-b border-gray-100 mb-8">
        <Link 
          href="/settings/general" 
          className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          Datos del restaurante
        </Link>
        <Link 
          href="/settings/branding" 
          className="px-6 py-4 text-sm font-bold text-[#c64010] border-b-2 border-[#c64010] flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
          Branding
        </Link>
        <Link 
          href="/settings/qr" 
          className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
          Código QR
        </Link>
      </div>

      {/* Contenedor del Formulario */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] p-8">
        
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900">Branding</h2>
          <p className="text-sm text-gray-500 mt-1">Personalizá el logo y el color de acento principal que verán tus clientes en el menú digital.</p>
        </div>

        <div className="space-y-8 max-w-2xl">
          
          {/* Subida de Logo */}
          <div>
            <label className="block text-[12px] font-bold text-gray-700 mb-3">Logo del restaurante</label>
            <div className="w-full border-2 border-dashed border-gray-200 rounded-2xl p-6 flex items-center gap-6 bg-gray-50/50 hover:bg-gray-50 transition-colors">
              <div className="w-24 h-24 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm shrink-0">
                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold text-xs hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  Subir imagen
                </button>
                <p className="text-[11px] text-gray-500 font-medium">Formatos recomendados: PNG, JPG o SVG. Tamaño máximo: 2 MB (proporción 1:1 cuadrada).</p>
              </div>
            </div>
          </div>

          {/* Selector de Color */}
          <div>
            <label className="block text-[12px] font-bold text-gray-700 mb-2">Color principal</label>
            <div className="flex items-center gap-4">
              
              {/* Color Picker Nativo (Oculto visualmente pero clickeable) */}
              <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-gray-200 shadow-sm shrink-0 cursor-pointer">
                <input 
                  type="color" 
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="absolute -inset-2 w-16 h-16 cursor-pointer"
                />
              </div>

              {/* Input Hexadecimal */}
              <div className="relative max-w-[200px]">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">#</span>
                <input 
                  type="text" 
                  value={brandColor.replace('#', '')}
                  onChange={(e) => setBrandColor(`#${e.target.value}`)}
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c64010]/20 focus:border-[#c64010] text-gray-900 font-medium uppercase"
                />
              </div>

              {/* Círculo decorativo */}
              <div 
                className="w-8 h-8 rounded-full border border-black/10 shadow-sm"
                style={{ backgroundColor: brandColor }}
              />
            </div>
            <p className="text-[11px] text-gray-500 font-medium mt-3">Este color definirá los botones principales, badges y acentos en tu menú digital.</p>
          </div>

        </div>

        <div className="flex justify-end mt-10 pt-6 border-t border-gray-50">
          <button 
            onClick={handleSave}
            disabled={isLoading}
            className="bg-[#c64010] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#a8360d] transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2"
          >
            {isLoading ? (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : null}
            Guardar branding
          </button>
        </div>

      </div>
    </div>
  );
}