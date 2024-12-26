// src/context/UserContext.tsx

import React, { createContext, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FavoriteAnime } from '../types/anime/FavoriteAnime'; // Asegúrate de tener esta interfaz

interface UserContextType {
  userData: {
    favorites: FavoriteAnime[];
  } | null;
  setFavorites: (favorites: FavoriteAnime[]) => void;
}

// Función para obtener los favoritos del usuario
async function getFavorites(): Promise<FavoriteAnime[]> {
  const response = await fetch('/api/profile'); // Ruta para obtener los favoritos
  if (!response.ok) {
    throw new Error('Error al obtener los favoritos');
  }
  const data = await response.json();
  return data.favorites; // Devuelve solo la lista de favoritos
}

// Función para actualizar los favoritos
async function updateFavorites(newFavorites: FavoriteAnime[]): Promise<void> {
  const response = await fetch('/api/profile/favorites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ favorites: newFavorites }),
  });
  if (!response.ok) {
    throw new Error('Error al actualizar los favoritos');
  }
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();

  // Use useQuery para obtener los favoritos del usuario
  const { data: favorites, error } = useQuery({
    queryKey: ['userFavorites'], // Asegúrate de que este sea un QueryKey correcto
    queryFn: getFavorites,
  });

  // Use useMutation para actualizar los favoritos
  const mutation = useMutation({
    mutationFn: updateFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userFavorites'] }); // Pasar como objeto
    },
  });

  // Función para establecer los favoritos
  const setFavorites = (newFavorites: FavoriteAnime[]) => {
    mutation.mutate(newFavorites); // Llama a la mutación para actualizar
  };

  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <UserContext.Provider value={{ userData: { favorites: favorites ?? [] }, setFavorites }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext debe ser usado dentro de un UserProvider');
  }
  return context;
};
