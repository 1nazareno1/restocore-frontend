"use client";
import React, { createContext, useState, useEffect } from 'react';
import { settingsApi } from '@/lib/api'; // 👉 Importamos la API

export const RestaurantContext = createContext<any>(null);

export default function RestaurantProvider({ children }: { children: React.ReactNode }) {
  // Dejamos esto temporalmente mientras carga la API, podés poner 'Cargando...' si preferís
  const [restaurantName, setRestaurantName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
   const fetchProfile = async () => {
      const token = localStorage.getItem('resto_token');
      if (!token) return;

      try {
        const profile = await settingsApi.getProfile(token);
        if (profile) {
          if (profile.name) setRestaurantName(profile.name);
          
          // 👇 Acá sumamos profile.phone_number para que enganche el JSON del backend
          if (profile.phone_number || profile.phoneNumber || profile.phone) {
            setPhone(profile.phone_number || profile.phoneNumber || profile.phone);
          }
          
          if (profile.address) setAddress(profile.address);
        }
      } catch (error) {
        console.error("Error al cargar los datos del restaurante en el Provider:", error);
      }
    };  

    fetchProfile();
  }, []);

  return (
    <RestaurantContext.Provider value={{ 
      restaurantName, setRestaurantName, 
      phone, setPhone, 
      address, setAddress 
    }}>
      {children}
    </RestaurantContext.Provider>
  );
}