import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DropdownAvatar from './DropdownAvatar';
import Logo from './Logo.svg'; // Importa el SVG como URL
import { useAuth } from '../../context/AuthContext'; // Asegúrate de que la ruta sea correcta
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../css/nav.css';

const Header: React.FC = () => {
  const { auth } = useAuth(); // Obtener el objeto de autenticación del contexto
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // Estado para el menú móvil
  const location = useLocation(); // Obtener la ubicación actual

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Función para aplicar clase activa
  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? 'text-purple-400 font-bold' // Estilo para la página activa
      : 'text-white hover:text-purple-400 transition-colors'; // Estilo normal
  };

  return (
    <header className="bg-gray-800 py-4">
      <div className="custom-container mx-auto flex justify-between items-center">
        {/* Logo con Link a la ruta raíz */}
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Logo" className="w-12 h-12 text-purple-400" />
        </Link>

        {/* Menú principal */}
        <nav className="hidden md:flex justify-center items-center w-full">
          <ul className="flex space-x-4 ml-auto font-semibold">
            <li>
              <Link to="/home" className={getLinkClass('/home')}>Home</Link>
            </li>
            {auth && auth.username && ( // Verifica si el usuario está autenticado y tiene un nombre de usuario
              <li>
                <Link to={`/user/${auth.username}/`} className={getLinkClass(`/user/${auth.username}/`)}>Profile</Link>
              </li>
            )}
            <li>
              <Link to="/search/anime" className={getLinkClass('/search/anime')}>Explore</Link>
            </li>
            {auth && auth.username && ( // Verifica si el usuario está autenticado y tiene un nombre de usuario
              <li>
                <Link to={`/user/${auth.username}/mylist`} className={getLinkClass(`/user/${auth.username}/mylist`)}>My List</Link>
              </li>
            )}
            <li>
              <Link to="/aboutus" className={getLinkClass('/aboutus')}>About Us</Link>
            </li>
          </ul>

          {/* Avatar o login/signup */}
          {auth ? (
            <div className="ml-auto"> {/* Separa el avatar a la derecha */}
              <DropdownAvatar />
            </div>
          ) : (
            <div className="ml-auto flex space-x-4 font-semibold"> {/* Separa login/signup a la derecha */}
              <Link to="/login" className="text-white hover:text-purple-400 transition-colors py-2">Login</Link>
              <Link to="/register" className="text-white transition-all bg-purple-600 px-4 py-2 rounded transform hover:scale-105 hover:shadow-[0px_0px_20px_rgba(168,85,247,0.7)] hover:shadow-purple-500">Sign Up</Link>
            </div>
          )}
        </nav>

        {/* Botón de menú hamburguesa para móviles */}
        <button 
          className={`btn btn-ghost md:hidden transition-transform duration-300 ${isMenuOpen ? 'rotate-45' : 'rotate-0'}`} 
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <FontAwesomeIcon icon={faTimes} className="text-white" /> // Icono de "X"
          ) : (
            <FontAwesomeIcon icon={faBars} className="text-white" /> // Icono de hamburguesa
          )}
        </button>
      </div>

      {/* Menú desplegable para móviles */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center space-y-2 mt-2">
            <Link to="/home" className={getLinkClass('/home')}>Home</Link>
            {auth && auth.username && ( // Verifica si el usuario está autenticado y tiene un nombre de usuario
              <Link to={`/user/${auth.username}/`} className={getLinkClass(`/user/${auth.username}/`)}>Profile</Link>
            )}
            <Link to="/search/anime" className={getLinkClass('/search/anime')}>Explore</Link>
            {auth && auth.username && ( // Verifica si el usuario está autenticado y tiene un nombre de usuario
              <Link to={`/user/${auth.username}/mylist`} className={getLinkClass(`/user/${auth.username}/mylist`)}>My List</Link>
            )}
            <Link to="/aboutus" className={getLinkClass('/aboutus')}>About Us</Link>
            {auth ? (
              <DropdownAvatar />
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-purple-400 transition-colors">Login</Link>
                <Link to="/register" className="text-white transition-all bg-purple-600 px-4 py-2 rounded transform hover:scale-105 hover:shadow-[0px_0px_20px_rgba(168,85,247,0.7)] hover:shadow-purple-500">Sign Up</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
