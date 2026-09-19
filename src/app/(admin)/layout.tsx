"use client"; 
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import BrandingProvider from '@/components/providers/BrandingProvider'; // 👉 1. Importamos el cerebro

const NAV_ITEMS = [
  {
    name: 'Inicio',
    href: '/dashboard',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
  },
  {
    name: 'Categorías',
    href: '/menu/categories',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
  },
  {
    name: 'Platos',
    href: '/menu/products',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
  },
  {
    name: 'Estadísticas',
    href: '/statistics', 
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
  },
  {
    name: 'Configuración',
    href: '/settings',
    linkTarget: '/settings/general', 
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
  },
  {
    name: 'Mi cuenta',
    href: '/account', 
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
  }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); 

  return (
    // 👉 2. Envolvemos toda la aplicación con el Provider
    <BrandingProvider>
      <div className="min-h-screen bg-[#f8f9fa] flex font-sans">
        
        <aside className="w-[260px] bg-white border-r border-gray-100 flex flex-col justify-between shadow-sm z-10 shrink-0">
          <div>
            <div className="h-20 flex items-center px-8">
              <span className="text-xl font-bold text-brand flex items-center gap-2"> {/* Cambiado a text-brand */}
                <span className="text-2xl">🍕</span> RestoCore
              </span>
            </div>
            
            <nav className="px-4 mt-2 space-y-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                
                return (
                  <Link 
                    key={item.href}
                    href={item.linkTarget || item.href} 
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                      isActive 
                        ? 'bg-brand text-white shadow-sm' // 👉 Cambiado a bg-brand
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900' 
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          
          <div className="p-4 mb-4">
             <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-gray-600 font-bold text-sm tracking-wide hover:bg-gray-50 transition-colors uppercase">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
               Cerrar Sesión
             </button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <header className="h-24 bg-[#f8f9fa] flex items-center justify-between px-8 shrink-0">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Bistro Gourmet</h2>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-0.5">Sucursal Principal</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">Chef Marco</p>
                <p className="text-xs text-gray-500">Administrador</p>
              </div>
              <div className="w-11 h-11 rounded-full bg-gray-200 overflow-hidden shadow-sm">
                <img src="https://ui-avatars.com/api/?name=Chef+Marco&background=c64010&color=fff&bold=true" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto px-8 pb-8">
            {children}
          </main>
        </div>
      </div>
    </BrandingProvider>
  );
}