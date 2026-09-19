"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  
  // Estados del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Función de Login preparada para el backend
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página recargue
    setIsLoading(true);

    // TODO: Manu -> Acá va la llamada a Supabase Auth: supabase.auth.signInWithPassword(...)
    // Simulamos la espera a la base de datos
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsLoading(false);
    
    // Una vez que Manu confirma que el usuario es válido, lo mandamos al panel
    router.push('/dashboard'); 
  };

  return (
    // Contenedor que ocupa toda la pantalla con fondo gris clarito
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center p-4 font-sans">
      
      {/* Contenedor central del Login */}
      <div className="w-full max-w-md flex flex-col items-center">
        
        {/* Logo y Encabezado */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-3xl border border-gray-100">
            🍕
          </div>
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Iniciar sesión</h1>
          <p className="text-gray-500 mt-2 text-[15px]">Accedé al panel administrativo de tu restaurante.</p>
        </div>

        {/* Tarjeta Blanca del Formulario */}
        <div className="w-full bg-white rounded-[24px] shadow-[0_8px_30px_-5px_rgba(0,0,0,0.05)] border border-gray-100 p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Input Correo */}
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand text-gray-900 font-medium placeholder:text-gray-400 transition-all"
                />
              </div>
            </div>

            {/* Input Contraseña */}
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                Contraseña
              </label>
              <div className="relative">
                {/* Candadito */}
                <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand text-gray-900 font-medium placeholder:text-gray-400 tracking-wider transition-all"
                />
                
                {/* Ojito para mostrar/ocultar contraseña */}
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Botón Principal */}
            <button 
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full bg-brand text-white py-3.5 rounded-xl font-bold text-[15px] hover:bg-[#a8360d] transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              ) : (
                'Iniciar sesión'
              )}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}