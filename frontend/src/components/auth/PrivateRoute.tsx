// components/auth/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Asegúrate de que la ruta sea correcta

interface PrivateRouteProps {
    element: JSX.Element; // Definimos el tipo para el elemento
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const { auth, isCheckingAuth } = useAuth(); // Agregamos el estado de verificación de la autenticación

    // Si se está verificando la autenticación, mostramos la página actual
    if (isCheckingAuth) {
        return element; // Muestra el contenido de la página actual mientras verifica la autenticación
    }

    // Si la autenticación es válida, renderiza el elemento; si no, redirige a /login
    return auth ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
