"use client";
import React, { createContext, useState } from 'react';

// 👉 Acá está el famoso 'export' que Next.js no encontraba
export const RestaurantContext = createContext<any>(null);

export default function RestaurantProvider({ children }: { children: React.ReactNode }) {
  const [restaurantName, setRestaurantName] = useState('Bistro Gourmet');
  const [phone, setPhone] = useState('+54 9 221 456-7890');
  const [address, setAddress] = useState('Av. 7 y 50, La Plata, Buenos Aires');

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