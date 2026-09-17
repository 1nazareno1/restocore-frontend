"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function GeneralSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Bistro Gourmet',
    phone: '+54 9 221 456-7890',
    address: 'Av. 7 y 50, La Plata, Buenos Aires'
  });

  const handleSave = async () => {
    setIsLoading(true);
    // TODO: Manu -> Acá va el PUT/PATCH para actualizar los datos básicos del restaurante en la BD
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
          className="px-6 py-4 text-sm font-bold text-[#c64010] border-b-2 border-[#c64010] flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          Datos del restaurante
        </Link>
        <Link 
          href="/settings/branding" 
          className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2"
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
          <h2 className="text-xl font-bold text-gray-900">Datos del restaurante</h2>
          <p className="text-sm text-gray-500 mt-1">Información básica que se muestra a los comensales en la carta virtual.</p>
        </div>

        <div className="space-y-6 max-w-2xl">
          <div>
            <label className="block text-[12px] font-bold text-gray-700 mb-2">Nombre del restaurante <span className="text-[#c64010]">*</span></label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c64010]/20 focus:border-[#c64010] text-gray-900 font-medium" 
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-gray-700 mb-2">Teléfono/WhatsApp <span className="text-[#c64010]">*</span></label>
            <input 
              type="text" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c64010]/20 focus:border-[#c64010] text-gray-900 font-medium" 
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-gray-700 mb-2">Dirección <span className="text-[#c64010]">*</span></label>
            <input 
              type="text" 
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c64010]/20 focus:border-[#c64010] text-gray-900 font-medium" 
            />
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
            Guardar cambios
          </button>
        </div>

      </div>
    </div>
  );
}