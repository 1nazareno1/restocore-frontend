"use client";
import React from 'react';
import Link from 'next/link';

export default function QRSettingsPage() {
  return (
    <div className="max-w-4xl py-6 font-sans">
      
      <div className="mb-8">
        <p className="text-[10px] font-bold text-brand uppercase tracking-wider mb-1">Panel de Administración</p>
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
          className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
          Branding
        </Link>
        <Link 
          href="/settings/qr" 
          className="px-6 py-4 text-sm font-bold text-brand border-b-2 border-brand flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
          Código QR
        </Link>
      </div>

      {/* Contenedor Principal */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] p-8">
        
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Código QR</h2>
          <p className="text-sm text-gray-500 mt-1">Colocá este código en tus mesas, barras o mostrador para que tus comensales accedan al menú al instante.</p>
        </div>

        <div className="flex flex-col items-center justify-center mt-12 mb-8">
          
          {/* Tarjeta del QR */}
          <div className="p-6 border border-gray-100 rounded-[32px] shadow-[0_8px_30px_-5px_rgba(0,0,0,0.05)] bg-white relative">
            {/* Mockup SVG del código QR (Idéntico al diseño) */}
            <svg className="w-48 h-48 text-[#1a1a1a]" viewBox="0 0 120 120" fill="currentColor">
              {/* Top Left Marker */}
              <rect x="10" y="10" width="30" height="30" rx="8" fill="none" stroke="currentColor" strokeWidth="7" />
              <rect x="18" y="18" width="14" height="14" rx="4" />
              
              {/* Top Right Marker */}
              <rect x="80" y="10" width="30" height="30" rx="8" fill="none" stroke="currentColor" strokeWidth="7" />
              <rect x="88" y="18" width="14" height="14" rx="4" />
              
              {/* Bottom Left Marker */}
              <rect x="10" y="80" width="30" height="30" rx="8" fill="none" stroke="currentColor" strokeWidth="7" />
              <rect x="18" y="88" width="14" height="14" rx="4" />
              
              {/* Center Orange Logo Accent */}
              <rect x="52" y="52" width="16" height="16" rx="6" fill="#c64010" />
              <circle cx="60" cy="60" r="3" fill="white" />

              {/* Random QR Blocks (Simulando datos) */}
              <rect x="50" y="10" width="8" height="8" rx="2" />
              <rect x="62" y="10" width="8" height="8" rx="2" />
              <rect x="50" y="22" width="20" height="8" rx="2" />
              <rect x="50" y="34" width="8" height="8" rx="2" />
              
              <rect x="10" y="50" width="8" height="8" rx="2" />
              <rect x="22" y="50" width="20" height="8" rx="2" />
              <rect x="10" y="62" width="8" height="8" rx="2" />
              <rect x="34" y="62" width="8" height="8" rx="2" />

              <rect x="80" y="50" width="8" height="8" rx="2" />
              <rect x="92" y="50" width="8" height="18" rx="2" />
              <rect x="104" y="60" width="8" height="8" rx="2" />
              <rect x="80" y="72" width="16" height="8" rx="2" />

              <rect x="50" y="80" width="20" height="8" rx="2" />
              <rect x="50" y="92" width="8" height="8" rx="2" />
              <rect x="62" y="92" width="8" height="18" rx="2" />
              
              <rect x="80" y="86" width="8" height="8" rx="2" />
              <rect x="92" y="92" width="18" height="8" rx="2" />
              <rect x="80" y="100" width="8" height="8" rx="2" />
            </svg>
          </div>

          <p className="mt-8 text-sm font-mono text-gray-400 tracking-wide">
            restocore.app/menu/bistro-gourmet
          </p>

          <div className="flex items-center gap-4 mt-8">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Descargar imagen
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              Imprimir QR
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}