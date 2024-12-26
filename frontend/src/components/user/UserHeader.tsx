import React from 'react';
import { CalendarDays } from 'lucide-react';
import ProfileNavigation from './UserNav';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Definición de la interfaz para userData
interface UserData {
  username: string;
  avatar_url: string;
  banner_url: string;
}

interface UserHeaderProps {
  userData: UserData | null; // userData puede ser null si aún se está cargando
  loading: boolean;
}

const UserHeader: React.FC<UserHeaderProps> = ({ userData, loading }) => {
  return (
    <SkeletonTheme baseColor="#1F2937" highlightColor="rgba(192, 132, 252, 0.2)">
      <div>
        <div className="relative h-48 bg-[#111827]">
          {loading ? (
            <Skeleton height={192} /> // Altura del banner
          ) : (
            <img
              src={userData?.banner_url}
              className="absolute inset-0 w-full h-full object-cover"
              alt="User banner"
            />
          )}
          <div className="absolute bottom-0 left-0 w-full ml-6 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex items-end space-x-4">
              <div className="avatar">
                <div className="w-24 rounded">
                  {loading ? (
                    <Skeleton circle={true} height={96} width={96} />
                  ) : (
                    <img src={userData?.avatar_url} alt="User avatar" />
                  )}
                </div>
              </div>
              <div>
                {loading ? (
                  <Skeleton width={200} height={30} /> // Para el nombre de usuario
                ) : (
                  <h1 className="text-3xl font-bold text-white">
                    {userData?.username}
                  </h1>
                )}
                {loading ? (
                  <Skeleton width={150} height={20} /> // Para la fecha de unión
                ) : (
                  <p className="text-sm text-gray-300 mt-2 mb-4">
                    Joined <CalendarDays className="inline-block w-4 h-4 mr-1" /> 2 years ago
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ProfileNavigation */}
        <div className="flex justify-center">
          <ProfileNavigation username={userData?.username || ''} /> {/* Asegúrate de manejar el caso donde userData puede ser null */}
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default UserHeader;
