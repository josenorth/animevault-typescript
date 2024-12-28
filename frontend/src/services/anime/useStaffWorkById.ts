import { useQuery } from '@tanstack/react-query';
import { StaffWork } from '@/types/staff/StaffWork';

const API_URL = '/api/v1/staff/';

const fetchAnimeStaffWork = async (id: number): Promise<StaffWork[]> => {
    const response = await fetch(`${API_URL}${id}/works`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: StaffWork[] = await response.json();
    return data;
};

export const useAnimeStaffWork = (id: number) => {
    return useQuery(['animeStaffWork', id], () => fetchAnimeStaffWork(id), {
        staleTime: 1000 * 60 * 5, // 5 minutos
        cacheTime: 1000 * 60 * 10, // 10 minutos
        refetchOnWindowFocus: false,
    });
};