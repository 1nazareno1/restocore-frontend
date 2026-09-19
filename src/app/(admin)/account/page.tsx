"use client";
import React, { useState, useEffect } from 'react';

export default function AccountPage() {
  // Estado para simular la carga de datos del usuario
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      
      // TODO: Manu -> Acá va la consulta a Supabase Auth (ej: supabase.auth.getUser())
      // Simulamos que tarda un poquito en traer los datos
      await new Promise(resolve => setTimeout(resolve, 800)); 
      
      // Seteamos los datos de prueba
      setUserData({
        name: 'Administrador del Restaurante',
        role: 'Propietario / Admin',
        email: 'admin@restaurant.com',
        plan: 'Básico',
        initials: 'AD'
      });
      
      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    // TODO: Manu -> Acá va la función para desloguear (ej: supabase.auth.signOut())
    // Después del signOut, deberías redirigir al login: router.push('/login')
    console.log("Cerrando sesión...");
  };

  return (
    <div className="max-w-4xl py-6 font-sans">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Mi cuenta</h1>
        <p className="text-gray-500 mt-1">Administrá los datos básicos de tu usuario y la seguridad de acceso.</p>
      </div>

      {isLoading ? (
        // Pantalla de carga con la misma identidad visual del resto del panel
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center min-h-[400px] text-gray-400">
          <svg className="w-8 h-8 animate-spin text-brand mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="font-medium animate-pulse">Cargando perfil...</p>
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* TARJETA 1: Datos de la cuenta */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] p-8">
            
            {/* Cabecera de la tarjeta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                <h2 className="text-lg font-bold text-gray-900">Datos de la cuenta</h2>
              </div>
              <div className="bg-orange-50/80 text-brand border border-brand/20 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 w-fit">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                Plan Actual: {userData?.plan}
              </div>
            </div>

            {/* Info del Perfil */}
            <div className="flex items-center gap-5 mb-8">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xl border border-gray-200 shadow-sm shrink-0">
                {userData?.initials}
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg">{userData?.name}</p>
                <p className="text-sm text-gray-500 font-medium">Rol asignado: <span className="text-gray-700">{userData?.role}</span></p>
              </div>
            </div>

            {/* Input de Email Deshabilitado */}
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <input 
                  type="email" 
                  value={userData?.email}
                  disabled
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 font-medium focus:outline-none cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-gray-400 font-medium mt-2">
                El correo está vinculado a la cuenta del restaurante y no puede modificarse desde aquí.
              </p>
            </div>

          </div>

          {/* TARJETA 2: Seguridad y Acceso */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] p-8">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              <h2 className="text-lg font-bold text-gray-900">Seguridad y Acceso</h2>
            </div>
            
            <p className="text-sm text-gray-600 font-medium mb-6">Gestioná el acceso a tu cuenta</p>
            
            <button 
              onClick={handleLogout}
              className="bg-[#da292e] text-white px-5 py-2.5 rounded-xl font-bold text-sm tracking-wide hover:bg-[#b92024] transition-colors shadow-sm flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              Cerrar sesión
            </button>
          </div>

        </div>
      )}
    </div>
  );
}