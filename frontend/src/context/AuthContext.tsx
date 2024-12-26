// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Define el tipo para la información de autenticación
interface Auth {
    user_id?: string; // Opcional
    username?: string; // Ahora es opcional
    avatar_url?: string;
    banner_url?: string;
}

// Define el tipo del contexto
interface AuthContextType {
    auth: Auth | null;
    setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
    isCheckingAuth: boolean;
    updateAvatar: (newAvatarUrl: string) => void;
    updateBanner: (newBannerUrl: string) => void;
    logout: () => void;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook para usar el contexto
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

// Componente del proveedor de autenticación
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState<Auth | null>(() => {
        const savedAuth = localStorage.getItem('auth');
        return savedAuth ? JSON.parse(savedAuth) : null;
    });
    const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true); // Estado de verificación de autenticación

    const updateAvatar = (newAvatarUrl: string) => {
        // Actualiza el avatar en el estado global y en localStorage
        const updatedAuth = { ...auth, avatar_url: newAvatarUrl };
        setAuth(updatedAuth);
        localStorage.setItem('auth', JSON.stringify(updatedAuth));
    };

    const updateBanner = (newBannerUrl: string) => {
        // Actualiza el banner en el estado global y en localStorage
        const updatedAuth = { ...auth, banner_url: newBannerUrl };
        setAuth(updatedAuth);
        localStorage.setItem('auth', JSON.stringify(updatedAuth));
    };

    const logout = () => {
        setAuth(null); // Actualiza el estado para indicar que no hay usuario autenticado
        localStorage.removeItem('auth'); // Elimina el auth del localStorage
    };

    const checkAuth = async () => {
        setIsCheckingAuth(true); // Empezamos a verificar la autenticación
        try {
            const response = await fetch('/auth/check_auth', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Error al verificar autenticación');
            }

            const { flask_session_exists, jwt_token_exists } = await response.json();

            if (flask_session_exists) {
                // Si la sesión de Flask existe, obtenemos la información del perfil
                await fetchUserProfile();
            } else {
                // Si la sesión de Flask no existe
                setAuth(null);
                localStorage.removeItem('auth');

                // Si el JWT existe, regeneramos la sesión de Flask
                if (jwt_token_exists) {
                    await regenerateFlaskSession();
                }
            }
        } catch (error) {
            console.error('Error en la verificación de autenticación:', error);
            setAuth(null);
            localStorage.removeItem('auth');
        } finally {
            setIsCheckingAuth(false); // Terminamos de verificar la autenticación
        }
    };

    const fetchUserProfile = async () => {
        try {
            const userInfoResponse = await fetch('/auth/profile', {
                method: 'GET',
                credentials: 'include',
            });

            if (!userInfoResponse.ok) {
                throw new Error('Error al obtener información del perfil');
            }

            const userInfo = await userInfoResponse.json();

            // Actualiza el contexto con la información del usuario, incluyendo el avatar y el banner
            const newAuth: Auth = {
                user_id: userInfo.user_id, // Asegúrate de que el user_id se envíe desde el servidor
                username: userInfo.username,
                avatar_url: userInfo.avatar_url,
                banner_url: userInfo.banner_url,
            };

            setAuth(newAuth);
            localStorage.setItem('auth', JSON.stringify(newAuth)); // Actualiza localStorage
        } catch (error) {
            console.error('Error al obtener el perfil:', error);
        }
    };

    const regenerateFlaskSession = async () => {
        try {
            const response = await fetch('/auth/regenerate_session', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Error al regenerar la sesión de Flask');
            }

            // Verifica nuevamente la autenticación después de regenerar la sesión
            await checkAuth();
        } catch (error) {
            console.error('Error al intentar regenerar la sesión de Flask:', error);
        }
    };

    useEffect(() => {
        checkAuth(); // Verifica la autenticación al montar el componente

        const handleStorageChange = () => {
            const savedAuth = localStorage.getItem('auth');
            setAuth(savedAuth ? JSON.parse(savedAuth) : null);
        };

        window.addEventListener('storage', handleStorageChange);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth, isCheckingAuth, updateAvatar, updateBanner, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
