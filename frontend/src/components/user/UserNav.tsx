import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Overview', path: '' },
  { name: 'Favorites', path: 'favorites' },
  { name: 'Statistics', path: 'stats' },
  { name: 'Anime List', path: 'mylist' },
  { name: 'Manga List', path: 'mangalist' },
];

interface ProfileNavigationProps {
  username: string; // Definir el tipo de la propiedad username
}

const ProfileNavigation: React.FC<ProfileNavigationProps> = ({ username }) => {
  const location = useLocation();

  return (
    <nav className="bg-gray-800 text-white w-full"> {/* Mantener w-full */}
      <div className="max-w-4xl mx-auto"> {/* Mantener el contenedor centrado */}
        <ul className="flex justify-center space-x-4 overflow-x-auto"> {/* Cambiado a justify-center */}
          {navItems.map((item) => {
            const isActive = location.pathname === `/user/${username}/${item.path}`;
            return (
              <li key={item.name}>
                <Link
                  to={`/user/${username}/${item.path}`}
                  className={`block py-4 px-2 text-sm font-medium border-b-2 ${
                    isActive
                      ? 'border-purple-400 text-purple-400'
                      : 'border-transparent hover:border-gray-300 hover:text-gray-300'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default ProfileNavigation;
