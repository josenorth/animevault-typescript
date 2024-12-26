import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useQuery } from '@tanstack/react-query';
import UserHeader from './UserHeader';
import UserStats from './components/UserStats';
import FavoriteAnimeList from './components/FavoriteAnimeList';
import RecentActivity from './components/RecentActivity';
import CurrentlyWatching from './components/CurrentlyWatching';
import { useAuth } from '../../context/AuthContext';
import { Helmet } from 'react-helmet-async';

interface UserData {
  username: string;
  avatar_url: string;
  banner_url: string;
}

interface AnimeStatus {
  episodes_watched: number;
  id: number;
  status: string;
  title_romaji: string;
  image_url: string;
  total_episodes: number | null;
}

interface Favorite {
  average_score: number | null;
  id: number;
  image_url: string;
  title_romaji: string;
}

interface RecentActivityItem {
  id: number;
  action: string;
  created_at: string;
  episodes_watched?: number;
  image_url: string;
  title_romaji: string;
}

interface ProfileData {
  anime_currently_watching: AnimeStatus[];
  favorites: Favorite[];
  recent_activity: RecentActivityItem[];
  total_favorites: number;
  total_watched: number;
}

const UserProfile: React.FC = () => {
  const { auth } = useAuth();
  const { username: authUsername = '', avatar_url: authAvatar = '', banner_url: authBanner = '' } = auth || {};
  const { username: urlUsername } = useParams<{ username: string }>();
  const navigate = useNavigate();

  // Hook de React Query para obtener datos del usuario
  const { data: userData, isLoading: loadingUserData, isError: userError } = useQuery<UserData>(
    ['userData', urlUsername],
    async () => {
      if (authUsername === urlUsername) {
        return { username: authUsername, avatar_url: authAvatar, banner_url: authBanner };
      }
      const response = await fetch(`/auth/users/${urlUsername}`);
      if (!response.ok) throw new Error('Usuario no encontrado');
      return response.json();
    },
    {
      onError: () => navigate('/404'),
      staleTime: 1000 * 60 * 5, // Cache por 5 minutos
    }
  );

  // Hook de React Query para obtener datos del perfil
  const { data: profileData, isLoading: loadingProfileData, isError: profileError } = useQuery<ProfileData>(
    ['profileData', urlUsername],
    async () => {
      const response = await fetch(`/api/profile`);
      if (!response.ok) throw new Error('Perfil no encontrado');
      return response.json();
    },
    {
      enabled: !!userData, // Solo ejecuta este query si ya se obtuvo `userData`
      onError: () => navigate('/404'),
      staleTime: 1000 * 60 * 5,
    }
  );

  const currentlyWatchingAnimes = useMemo(() => (
    profileData?.anime_currently_watching
      ?.filter(anime => anime.status === 'WATCHING')
      .map(anime => ({
        id: anime.id,
        title: anime.title_romaji,
        episode: anime.episodes_watched,
        totalEpisodes: anime.total_episodes ?? 0,
        imageUrl: anime.image_url,
      })) || []
  ), [profileData]);

  if (loadingUserData || loadingProfileData) {
    return (
      <SkeletonTheme baseColor="#1F2937" highlightColor="rgba(192, 132, 252, 0.2)">
        <div className="custom-container bg-[#111827] py-8">
          <Skeleton height={200} />
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Skeleton count={5} height={120} />
            </div>
            <div className="space-y-6">
              <Skeleton height={180} />
              <Skeleton height={180} />
            </div>
          </div>
        </div>
      </SkeletonTheme>
    );
  }

  if (userError || profileError) return null;

  return (
    <div className="custom-container bg-[#111827] py-8">
      <Helmet>
        <title>Profile - AnimeVault</title>
      </Helmet>
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <UserHeader userData={userData || { username: '', avatar_url: '', banner_url: '' }} loading={!userData} />
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <section>
              <h2 className="text-2xl text-[#C084FC] font-semibold mb-2">About Me</h2>
              <p className="text-[#C084FC]">
                Passionate anime fan with a love for shonen and slice of life genres. Always looking for new series to watch and discuss!
              </p>
            </section>
            {profileData && <FavoriteAnimeList favorites={profileData.favorites} />}
            {profileData ? (
              <RecentActivity activities={profileData.recent_activity} loading={false} />
            ) : (
              <RecentActivity activities={[]} loading={true} />
            )}
          </div>
          <div className="space-y-6">
            {profileData && <UserStats totalFavorites={profileData.total_favorites} totalWatched={profileData.total_watched} />}
            {profileData ? (
              <CurrentlyWatching animes={currentlyWatchingAnimes} loading={false} />
            ) : (
              <CurrentlyWatching animes={[]} loading={true} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
