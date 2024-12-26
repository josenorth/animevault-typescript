// src/components/AnimeList.tsx
import React, { useState, MouseEvent, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import AnimeImagePreview from "./AnimeImagePreview";
import { MoreHoriz } from "@mui/icons-material";
import ListModal from "../Modal/ListModal";

import '../../../css/AnimeList.css';

type Anime = {
  id: number;
  title: string;
  image: string;
  user_score: number;
  progress: number;
  format: string;
};

type Position = {
  top: number;
  height: number;
};

type AnimeListProps = {
  title: string;
  animes: Anime[];
};

const AnimeList: React.FC<AnimeListProps> = ({ title, animes }) => {
  const [hoveredAnime, setHoveredAnime] = useState<Anime | null>(null);
  const [hoverPosition, setHoverPosition] = useState<Position | null>(null);
  const [modalAnime, setModalAnime] = useState<Anime | null>(null);

  if (animes.length === 0) return null;

  const handleMouseEnter = (anime: Anime, event: MouseEvent<HTMLTableRowElement>) => {
    const rowElement = event.currentTarget.getBoundingClientRect();
    setHoveredAnime(anime);
    setHoverPosition({
      top: rowElement.top,
      height: rowElement.height,
    });
  };

  useEffect(() => {
    // Disable scroll on body when modal is open
    document.body.style.overflow = modalAnime ? 'hidden' : 'auto';
  }, [modalAnime]);

  const handleModalOpen = (anime: Anime) => {
    setModalAnime(anime);
  };

  const handleModalClose = () => {
    setModalAnime(null);
  };

  return (
    <div className="mb-8 relative">
      <h2 className="text-lg font-semibold p-4 text-gray-200">{title}</h2>

      {/* Preview de imagen */}
      {hoveredAnime && hoverPosition && (
        <AnimeImagePreview
          image={hoveredAnime.image}
          title={hoveredAnime.title}
          isVisible={hoveredAnime !== null}
          position={hoverPosition}
        />
      )}

      {/* Modal */}
      {modalAnime && (
        <ListModal anime={modalAnime} onClose={handleModalClose} />
      )}

      <Table sx={{ backgroundColor: "#1F2937", borderRadius: "10px" }}>
        <TableHead sx={{ color: "white" }}>
          <TableRow sx={{ color: "white" }}>
            <TableCell className="w-[300px]" sx={{ color: "white", fontWeight: 'bold', borderBottom: 0 }}>Title</TableCell>
            <TableCell sx={{ color: "white", fontWeight: 'bold', borderBottom: 0 }}>Score</TableCell>
            <TableCell sx={{ color: "white", fontWeight: 'bold', borderBottom: 0 }}>Progress</TableCell>
            <TableCell sx={{ color: "white", fontWeight: 'bold', borderBottom: 0 }} className="font-semibold">Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {animes.map((anime) => {
            const formattedTitle = anime.title;

            return (
              <TableRow
                key={anime.id}
                className="table-row-hover"
                onMouseEnter={(event) => handleMouseEnter(anime, event)}
                onMouseLeave={() => setHoveredAnime(null)}
              >
                <TableCell className="font-medium" sx={{ borderBottom: 0 }}>
                  <div className="flex items-center space-x-3 text-gray-200">
                    <div className="anime-image-container">
                      <img
                        src={anime.image}
                        alt={anime.title}
                        className="w-8 h-12 object-cover rounded anime-image"
                      />
                      <div className="anime-image-hover" onClick={() => handleModalOpen(anime)}>
                        <MoreHoriz style={{ color: 'white', fontSize: '24px', cursor: 'pointer' }} />
                      </div>
                    </div>
                    {/* Aplicación de una clase CSS en lugar de un estilo en línea */}
                    <Link
                      to={`/anime/${anime.id}/${formattedTitle}`}
                      className="anime-link" // Nueva clase CSS
                    >
                      {anime.title}
                    </Link>
                  </div>
                </TableCell>
                <TableCell sx={{ color: "white", borderBottom: 0 }}>
                  {Number(anime.user_score) !== 0 && anime.user_score}
                </TableCell>
                <TableCell sx={{ color: "white", borderBottom: 0 }}>{anime.progress}</TableCell>
                <TableCell sx={{ color: "white", borderBottom: 0 }}>{anime.format}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AnimeList;
