"use client";
import React, { createContext, useState, useEffect } from 'react';
import { settingsApi } from '@/lib/api'; // 👉 Importamos la API

export const BrandingContext = createContext<any>(null);

export default function BrandingProvider({ children }: { children: React.ReactNode }) {
  const [brandColor, setBrandColor] = useState('#c64010');
  const [brandLight, setBrandLight] = useState('#fff2ec'); 

  // 👉 Buscamos los colores reales al inicializar la app
  useEffect(() => {
    const fetchBranding = async () => {
      const token = localStorage.getItem('resto_token');
      if (!token) return;

      try {
        const profile = await settingsApi.getProfile(token);
        if (profile) {
          if (profile.brandColor) {
            setBrandColor(profile.brandColor);
          }
          if (profile.brandLight) {
            setBrandLight(profile.brandLight);
          } else if (profile.brandColor) {
            setBrandLight(`${profile.brandColor}15`);
          }
        }
      } catch (error) {
        console.error("Error al cargar el branding en el Provider:", error);
      }
    };

    fetchBranding();
  }, []);
  
  // Este useEffect es el que ya tenías para aplicar el CSS
  useEffect(() => {
    document.documentElement.style.setProperty('--brand-color', brandColor);
    document.documentElement.style.setProperty('--brand-light', brandLight);
  }, [brandColor, brandLight]);

  return (
    <BrandingContext.Provider value={{ brandColor, setBrandColor, brandLight, setBrandLight }}>
      {children}
    </BrandingContext.Provider>
  );
}