"use client";
import React, { useState, useEffect } from 'react';

export default function StatisticsPage() {
  const [visitsRange, setVisitsRange] = useState<'hoy' | '7d' | '30d'>('hoy');
  const [chartRange, setChartRange] = useState<'7d' | '30d'>('7d');
  
  //  ESTADOS PARA GUARDAR LOS DATOS DEL BACKEND
  const [isLoading, setIsLoading] = useState(true);
  const [totalVisits, setTotalVisits] = useState(0);
  const [topDishes, setTopDishes] = useState<any[]>([]);

  // LA FUNCIÓN QUE SE COMUNICA CON EL BACKEND (Por ahora simulada)
  const fetchStatistics = async () => {
    setIsLoading(true);
    
    // acá tenés que borrar este setTimeout y poner tu llamada a Supabase.
    // Vas a usar los estados 'visitsRange' y 'chartRange' para saber qué filtrar en la BD.
    
    // Simulamos que tarda 1 segundo en traer los datos de internet
    setTimeout(() => {
      // Datos de mentira dependiendo del filtro elegido
      if (visitsRange === 'hoy') {
        setTotalVisits(342);
        setTopDishes([
          { id: 1, name: 'Hamburguesa Doble Smash', views: 45 },
          { id: 2, name: 'Limonada de Menta', views: 30 },
        ]);
      } else if (visitsRange === '7d') {
        setTotalVisits(1284);
        setTopDishes([
          { id: 1, name: 'Hamburguesa Doble Smash', views: 342 },
          { id: 2, name: 'Papas Trufadas', views: 289 },
          { id: 3, name: 'Cheesecake de Frutos Rojos', views: 156 },
        ]);
      } else {
        setTotalVisits(5430);
        setTopDishes([
          { id: 1, name: 'Papas Trufadas', views: 1200 },
          { id: 2, name: 'Hamburguesa Doble Smash', views: 980 },
          { id: 3, name: 'Ensalada César', views: 400 },
        ]);
      }
      setIsLoading(false);
    }, 800);
  };

  // Se ejecuta al cargar la página Y cada vez que cambien los filtros
  useEffect(() => {
    fetchStatistics();
  }, [visitsRange, chartRange]); 
  return (
    <div className="max-w-6xl py-6 font-sans">
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Estadísticas</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Total de Visitas */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] flex flex-col justify-between h-[340px]">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Total de visitas</h2>
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-[#c64010]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
            </div>

            <div className="flex bg-gray-50 p-1 rounded-xl w-fit border border-gray-100">
              <button onClick={() => setVisitsRange('hoy')} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${visitsRange === 'hoy' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Hoy</button>
              <button onClick={() => setVisitsRange('7d')} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${visitsRange === '7d' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>7 días</button>
              <button onClick={() => setVisitsRange('30d')} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${visitsRange === '30d' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>30 días</button>
            </div>
          </div>

          <div>
            {/* Si está cargando mostramos un texto gris, sino el número */}
            {isLoading ? (
              <p className="text-[40px] font-bold text-gray-300 animate-pulse">Cargando...</p>
            ) : (
              <p className="text-[64px] leading-none font-bold text-gray-900 tracking-tighter">
                {totalVisits.toLocaleString('es-AR')}
              </p>
            )}
            <p className="text-gray-500 font-medium mt-2">
              {visitsRange === 'hoy' ? 'Hoy' : visitsRange === '7d' ? 'Últimos 7 días' : 'Últimos 30 días'}
            </p>
          </div>
        </div>

        {/* Gráfico de Visitas */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] lg:col-span-2 h-[340px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-900">Visitas por día</h2>
            <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
              <button onClick={() => setChartRange('7d')} className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${chartRange === '7d' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>7 días</button>
              <button onClick={() => setChartRange('30d')} className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${chartRange === '30d' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>30 días</button>
            </div>
          </div>

          <div className="flex-1 relative w-full mt-2">
            <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-gray-400 font-medium h-full">
              <span>400</span><span>300</span><span>200</span><span>100</span><span>0</span>
            </div>
            <div className="absolute left-8 right-0 top-1 bottom-6">
              <div className="absolute inset-0 flex flex-col justify-between">
                {[...Array(5)].map((_, i) => <div key={i} className="w-full border-b border-gray-100"></div>)}
              </div>
              <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="gradientOrange" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#c64010" stopOpacity="0.2" /><stop offset="100%" stopColor="#c64010" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,80 L16,50 L32,55 L50,30 L66,15 L82,30 L100,5 L100,100 L0,100 Z" fill="url(#gradientOrange)" />
                <path d="M0,80 L16,50 L32,55 L50,30 L66,15 L82,30 L100,5" fill="none" stroke="#c64010" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="16" cy="50" r="2.5" fill="white" stroke="#c64010" strokeWidth="1.5" />
                <circle cx="32" cy="55" r="2.5" fill="white" stroke="#c64010" strokeWidth="1.5" />
                <circle cx="50" cy="30" r="2.5" fill="white" stroke="#c64010" strokeWidth="1.5" />
                <circle cx="66" cy="15" r="2.5" fill="white" stroke="#c64010" strokeWidth="1.5" />
                <circle cx="82" cy="30" r="2.5" fill="white" stroke="#c64010" strokeWidth="1.5" />
                <circle cx="100" cy="5" r="2.5" fill="white" stroke="#c64010" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="absolute left-8 right-0 -bottom-2 flex justify-between text-[10px] text-gray-400 font-medium">
              <span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span><span>Sáb</span><span>Dom</span>
            </div>
          </div>
        </div>

      </div>

      {/* Platos Más Vistos */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] min-h-[300px]">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Platos más vistos</h2>
        
        {isLoading ? (
           <div className="space-y-4 animate-pulse">
             {[...Array(3)].map((_, i) => (
               <div key={i} className="h-5 bg-gray-100 rounded-md w-3/4"></div>
             ))}
           </div>
        ) : (
          <ul className="space-y-4">
            {topDishes.map((dish, index) => (
              <li key={dish.id} className="text-gray-700 font-medium text-[15px] flex items-center">
                <span className="w-5 text-gray-400">{index + 1}.</span> 
                <span>{dish.name}</span>
                <span className="mx-2 text-gray-300">—</span>
                <span className="text-gray-500">{dish.views} vistas</span>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}