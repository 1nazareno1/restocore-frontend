"use client";
import React, { createContext, useState, useEffect } from 'react';

export const BrandingContext = createContext<any>(null);

export default function BrandingProvider({ children }: { children: React.ReactNode }) {
  const [brandColor, setBrandColor] = useState('#c64010');
  const [brandLight, setBrandLight] = useState('#fff2ec'); 

  
  useEffect(() => {
    document.documentElement.style.setProperty('--brand-color', brandColor);
    document.documentElement.style.setProperty('--brand-light', brandLight);
  }, [brandColor, brandLight]);

  return (
    <BrandingContext.Provider value={{ brandColor, setBrandColor, brandLight, setBrandLight }}>
      {/* Ya no necesitamos el div con estilos raros, devolvemos a los hijos limpios */}
      {children}
    </BrandingContext.Provider>
  );
}