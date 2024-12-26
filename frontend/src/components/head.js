import React, { useEffect } from 'react';

const Head = ({ title, description, keywords, cssFiles = [], jsFiles = [] }) => {
  useEffect(() => {
    // Actualiza el título de la página
    document.title = title || 'Mi Proyecto';
    
    // Actualiza la meta descripción
    const metaDescription = document.querySelector('meta[name="description"]');
    const metaKeywords = document.querySelector('meta[name="keywords"]');

    if (metaDescription) {
      metaDescription.setAttribute('content', description || 'Descripción por defecto');
    } else {
      const newMetaDesc = document.createElement('meta');
      newMetaDesc.name = 'description';
      newMetaDesc.content = description || 'Descripción por defecto';
      document.head.appendChild(newMetaDesc);
    }

    // Actualiza las meta keywords
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords || 'palabras clave por defecto');
    } else {
      const newMetaKeywords = document.createElement('meta');
      newMetaKeywords.name = 'keywords';
      newMetaKeywords.content = keywords || 'palabras clave por defecto';
      document.head.appendChild(newMetaKeywords);
    }

    // Añadir archivos CSS dinámicamente
    cssFiles.forEach(file => {
      const linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.href = file;
      document.head.appendChild(linkElement);

      // Limpieza cuando el componente se desmonta
      return () => {
        document.head.removeChild(linkElement);
      };
    });

    // Añadir archivos JS dinámicamente
    jsFiles.forEach(file => {
      const scriptElement = document.createElement('script');
      scriptElement.src = file;
      scriptElement.async = true;
      document.head.appendChild(scriptElement);

      // Limpieza cuando el componente se desmonta
      return () => {
        document.head.removeChild(scriptElement);
      };
    });

  }, [title, description, keywords, cssFiles, jsFiles]);

  return null;
};

export default Head;
