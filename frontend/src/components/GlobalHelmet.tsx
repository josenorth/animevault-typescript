// src/components/GlobalHelmet.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

const GlobalHelmet: React.FC<{ title?: string }> = ({ title }) => {
    return (
        <Helmet>
            {title && <title>{title}</title>}
            <meta name="description" content="Descripción global de tu aplicación" />
            <meta name="keywords" content="palabras, clave, separadas, por, comas" />
            <meta name="author" content="José Sanchez / Mark Tec S.A.S" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" href="/src/components/ui/Logo.svg" type="image/x-icon" />

            {/* Open Graph Meta Tags */}
            <meta property="og:title" content="Título de tu aplicación" />
            <meta property="og:description" content="Descripción para redes sociales" />
            <meta property="og:image" content="URL de la imagen para compartir" />
            <meta property="og:url" content="URL de tu aplicación" />
            <meta property="og:type" content="website" />

            {/* Twitter Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Título de tu aplicación" />
            <meta name="twitter:description" content="Descripción para Twitter" />
            <meta name="twitter:image" content="URL de la imagen para Twitter" />

            {/* Otras etiquetas meta que podrías necesitar */}
            <meta name="robots" content="index, follow" />
            <meta name="theme-color" content="#ffffff" />
            <link rel="canonical" href="URL canónica de tu aplicación" />
            {/* Agrega otros metadatos que desees */}
            
        </Helmet>
    );
};

export default GlobalHelmet;
