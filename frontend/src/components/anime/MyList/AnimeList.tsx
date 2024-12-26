// src/components/Component.tsx
import { useState } from "react";
// import Sidebar from "./Sidebar.tsx";
import AnimeList from "./List.tsx";
import UserHeader from "../../user/UserHeader";
import { useAuth } from '../../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';

type Anime = {
  id: number;
  title: string;
  status: 'WATCHING' | 'COMPLETED' | 'PAUSED' | 'PLANNING';
  image: string;
  user_score: number;
  progress: number;
  format: string;
};

const fetchAnimes = async (status: string): Promise<Anime[]> => {
  const response = await fetch(`/api/user/${status.toUpperCase()}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export default function Component() {
  const { auth } = useAuth();
  const [selectedList, /*setSelectedList*/] = useState<string>("All");
  // const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const userData = auth && auth.username && auth.avatar_url && auth.banner_url
    ? {
        username: auth.username,
        avatar_url: auth.avatar_url,
        banner_url: auth.banner_url,
      }
    : null;
  const { data: animes = [], error, isLoading } = useQuery<Anime[], Error>({
    queryKey: ['animes', selectedList],
    queryFn: () => fetchAnimes(selectedList === "All" ? 'ALL' : selectedList),
    staleTime: 1000 * 60 * 60, // cache for 1 hour
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching animes: {error.message}</div>;

  const categorizedAnimes = {
    watching: animes.filter(anime => anime.status === 'WATCHING'),
    completed: animes.filter(anime => anime.status === 'COMPLETED'),
    paused: animes.filter(anime => anime.status === 'PAUSED'),
    planning: animes.filter(anime => anime.status === 'PLANNING'),
  };

  return (
    <div className="max-w-4xl mx-auto flex bg-gray-900 text-gray-100 py-8">
      
      <div className="flex-1 rounded-lg overflow-hidden">
        <UserHeader userData={userData} loading={isLoading} />

        {/* <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <Button variant="outlined" onClick={() => setViewMode("list")}>
              <LayoutList className="h-4 w-4" />
            </Button>
            <Button variant="outlined" onClick={() => setViewMode("grid")}>
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button variant="outlined" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div> */}
        
        {(selectedList === "All" || selectedList === "Watching") && (
          <AnimeList title="Watching" animes={categorizedAnimes.watching} />
        )}
        {(selectedList === "All" || selectedList === "Completed") && (
          <AnimeList title="Completed" animes={categorizedAnimes.completed} />
        )}
        {(selectedList === "All" || selectedList === "Paused") && (
          <AnimeList title="Paused" animes={categorizedAnimes.paused} />
        )}
        {(selectedList === "All" || selectedList === "Planning") && (
          <AnimeList title="Planning" animes={categorizedAnimes.planning} />
        )}
      </div>
    </div>
  );
}
