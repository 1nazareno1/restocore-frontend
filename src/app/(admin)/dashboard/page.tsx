export default function DashboardPage() {
	return (
		<div className="max-w-5xl mx-auto py-6 space-y-8 font-sans">
			<div>
				<h1 className="text-3xl font-bold text-gray-900 tracking-tight">¡Bienvenido de nuevo, Chef Marco!</h1>
				<p className="text-gray-500 mt-1">Esto es lo que está pasando hoy en Bistro Gourmet.</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
				<div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
					<div className="flex justify-between items-start">
						<h3 className="text-3xl font-bold text-gray-900">12,450</h3>
						<div className="w-10 h-10 rounded-xl bg-orange-50/80 flex items-center justify-center text-brand">
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
						</div>
					</div>
					<div className="mt-4">
						<p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-tight">Visitas Totales<br />(Mensuales)</p>
						<p className="text-sm font-semibold text-emerald-600 mt-2 flex items-center gap-1">
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
							+14% vs el mes pasado
						</p>
					</div>
				</div>

				<div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
					<div className="flex justify-between items-start">
						<h3 className="text-3xl font-bold text-gray-900">342</h3>
						<div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
						</div>
					</div>
					<div className="mt-4">
						<p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-tight">Visitas de Hoy<br />&nbsp;</p>
						<p className="text-sm font-semibold text-rose-500 mt-2 flex items-center gap-1">
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
							-2% vs ayer
						</p>
					</div>
				</div>

				<div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] flex items-center justify-between overflow-hidden relative group">
					<div className="z-10 relative">
						<p className="text-[10px] font-bold text-brand uppercase tracking-wider">Más Visto</p>
						<h3 className="text-lg font-bold text-gray-900 leading-tight mt-1">Truffle<br />Risotto</h3>
						<p className="text-xs font-bold text-gray-500 mt-3 flex items-center gap-1.5">
							<svg className="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
							1,204 vistas
						</p>
					</div>
					<div className="absolute right-0 top-0 bottom-0 w-28">
						<div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
						<img src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=200&q=80" alt="Truffle Risotto" className="w-full h-full object-cover rounded-l-[2rem] shadow-inner" />
					</div>
				</div>

				<div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
					<div className="flex justify-between items-start">
						<h3 className="text-3xl font-bold text-gray-900">48 <span className="text-gray-300 font-medium">/</span> <span className="text-2xl text-gray-500">6</span></h3>
						<div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
						</div>
					</div>
					<div className="mt-4">
						<p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-tight">Platos / Categorías<br />&nbsp;</p>
						<p className="text-sm font-medium text-gray-500 mt-2">Artículos activos en menú</p>
					</div>
				</div>
			</div>

			<div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)]">
				<h3 className="text-lg font-bold text-gray-900">Visitas por día</h3>
				<p className="text-sm text-gray-500 mb-6">Últimos 30 días</p>
				<div className="h-[280px] w-full bg-gray-50/50 rounded-xl flex flex-col items-center justify-center border border-dashed border-gray-200">
					<svg className="w-10 h-10 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
					<p className="text-gray-400 font-medium">Acá irá el gráfico de Recharts</p>
				</div>
			</div>
		</div>
	);
}