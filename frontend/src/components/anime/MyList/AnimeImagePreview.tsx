// src/components/AnimeImagePreview.tsx
import React from "react";

type Position = {
  top: number;
  height: number;
};

type AnimeImagePreviewProps = {
  image: string;
  title: string;
  isVisible: boolean;
  position: Position | null;
};

const AnimeImagePreview: React.FC<AnimeImagePreviewProps> = ({ image, title, isVisible, position }) => {
  if (!position) return null; // No mostrar si no hay posición

  const { top, height } = position;

  return (
    <div
      className={`fixed transform transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} z-50`}
      style={{
        top: top + height / 2 - 112.5, // Centrar la imagen en relación a la fila
        left: "320px", // Posicionar siempre a 20px del lado izquierdo
        width: "150px",
        height: "225px",
      }}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover rounded-lg shadow-lg"
      />
    </div>
  );
};

export default AnimeImagePreview;
