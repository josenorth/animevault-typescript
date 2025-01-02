import { useQuery } from '@tanstack/react-query'
import { Staff } from '@/types/staff/Staff'

const API_URL = '/api/v1/staff/'

// Ajustar el fetch para que devuelva la estructura esperada
const fetchAnimeStaff = async (id: number): Promise<Staff> => {
    const response = await fetch(`${API_URL}${id}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data: Staff = await response.json() // Aquí cambiamos Details[] a Details
    return data
  }
  
  // Hook que utiliza la estructura de Character[]
  export const useAnimeStaff = (id: number) => {
    return useQuery( {
      queryKey: ['anime-staff', id],
      queryFn: () => fetchAnimeStaff(id),
      staleTime: 1000 * 60 * 5, // 5 minutos
      gcTime: 1000 * 60 * 10, // 10 minutos
      refetchOnWindowFocus: false,
    })
  }
  