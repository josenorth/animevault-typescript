import React, { useEffect, useState } from 'react';
import { User, Settings, LogOut } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom'; 
import Modal from './Modal'; 
import { useAuth } from '../../context/AuthContext'; // Asegúrate de la ruta correcta

const DropdownAvatar: React.FC = () => {
    const { auth, logout } = useAuth(); // Obtener auth del contexto
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false); // Estado para manejar si es móvil o no
    const navigate = useNavigate();

    // Detectar si el dispositivo es móvil
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        setIsMobile(mediaQuery.matches);

        const handleResize = (event: MediaQueryListEvent) => {
            setIsMobile(event.matches);
        };

        mediaQuery.addEventListener('change', handleResize);
        return () => {
            mediaQuery.removeEventListener('change', handleResize);
        };
    }, []);

    const handleLogoutClick = () => {
        setIsModalOpen(true);
    };

    const toggleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation(); // Evita que el clic se propague a otros elementos
        setIsDropdownOpen(!isDropdownOpen); // Alterna el estado del dropdown
    };

    const confirmLogout = async () => {
        try {
            const response = await fetch('/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Incluye cookies en la solicitud
            });

            if (response.ok) {
                logout(); // Llama al método logout del contexto
                setIsModalOpen(false);
                navigate('/'); // Redirigir a la página principal
            } else {
                console.error('Error al cerrar sesión', response.statusText);
            }
        } catch (error) {
            console.error('Error al realizar la solicitud de logout:', error);
        }
    };

    // Cierra el dropdown si se hace clic fuera de él (para móviles)
    useEffect(() => {
        const closeDropdown = () => {
            if (isDropdownOpen && isMobile) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('click', closeDropdown);
        return () => {
            document.removeEventListener('click', closeDropdown);
        };
    }, [isDropdownOpen, isMobile]);

    // Cierra el dropdown cuando se hace clic en un enlace
    const handleLinkClick = () => {
        setIsDropdownOpen(false);
    };

    // Manejar el evento de mouseleave para cerrar el dropdown
    const handleMouseLeave = () => {
        if (!isMobile) {
            setIsDropdownOpen(false); // Cierra el dropdown si no es móvil
        }
    };

    return (
        <div
            className={`dropdown ${!isMobile ? 'dropdown-hover' : ''} dropdown-end`}
            onClick={isMobile ? toggleDropdown : undefined} // Solo usa click en móviles
        >
            {auth?.avatar_url && ( // Verificar si auth y avatar_url existen
                <div
                    tabIndex={0}
                    role="button"
                    className="avatar"
                    onClick={isMobile ? toggleDropdown : undefined} // Abrir el menú en móviles con clic
                >
                    <div className="w-12 overflow-hidden">
                        <img src={auth.avatar_url} alt="Avatar" className="object-cover w-full h-full" />
                    </div>
                </div>
            )}

            {(isDropdownOpen || !isMobile) && ( // Muestra el dropdown en móviles si está abierto o siempre en escritorio
                <ul
                    tabIndex={0} 
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-white"
                    onClick={(e) => e.stopPropagation()} // Evitar que se cierre el menú al hacer clic dentro de él
                    onMouseLeave={handleMouseLeave} // Cierra el dropdown cuando el mouse sale del menú
                >
                    {auth && (
                        <>
                            <li>
                                <Link 
                                    to={`/user/${auth.username}/`} 
                                    className="flex items-center no-bg-on-click"
                                    onClick={handleLinkClick} // Cerrar el dropdown al hacer clic en un enlace
                                >
                                    <User size={16} className="mr-2 text-purple-400" />
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/settings" 
                                    className="flex items-center no-bg-on-click"
                                    onClick={handleLinkClick} // Cerrar el dropdown al hacer clic en un enlace
                                >
                                    <Settings size={16} className="mr-2 text-purple-400" />
                                    Settings
                                </Link>
                            </li>
                        </>
                    )}
                    <li>
                        <button 
                            className="flex items-center no-bg-on-click"
                            onClick={() => {
                                handleLogoutClick();
                                setIsDropdownOpen(false); // Cerrar el dropdown al hacer clic en Logout
                            }}
                        >
                            <LogOut size={16} className="mr-2 text-purple-400" />
                            Log out
                        </button>
                    </li>
                </ul>
            )}

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onConfirm={confirmLogout} 
            />
        </div>
    );
};

export default DropdownAvatar;
