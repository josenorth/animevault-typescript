import { useState, useEffect } from "react";
import {
  HeartIcon,
  PlayIcon,
  PauseIcon,
  ClockIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import "../../../css/AnimeDetails.css";
import { useAuth } from "../../../context/AuthContext";
import MessageToast from "../../ui/MessageToast";

interface UserProgress {
  episodesWatched: number; // Ejemplo de tipo, ajusta según tu estructura
  score: number; // Ejemplo de tipo, ajusta según tu estructura
  status: string | null; // El estado puede ser null
}

interface AnimeActionsProps {
  animeId: string | number; // Permitir tanto string como number
  userProgress: UserProgress; // Progreso del usuario
}

const ActionButton: React.FC<{
  icon: React.ElementType; // Tipo del ícono
  text: string; // Texto del botón
  onClick: () => void; // Función al hacer clic
  active: boolean; // Estado activo
}> = ({ icon: Icon, text, onClick, active }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center px-4 py-2 rounded-full ${
      active
        ? "bg-indigo-600 text-white hover:bg-indigo-700"
        : "bg-[#C084FC] text-gray-800 hover:bg-gray-300"
    } transition-colors duration-200`}
  >
    <Icon className="w-5 h-5 mr-2" />
    <span>{text}</span>
  </button>
);

const AnimeActions: React.FC<AnimeActionsProps> = ({ animeId, userProgress }) => {
  const { auth } = useAuth();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [currentStatus, setCurrentStatus] = useState<string | null>(userProgress?.status || null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  useEffect(() => {
    const fetchAnimeStatus = async () => {
      if (!auth) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/user/anime/${animeId}/status`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok) {
          setIsFavorite(data.is_favorite === 1);
          setCurrentStatus(data.status);
        } else {
          setError(data.message || "Error al cargar estado del anime");
        }
      } catch (err) {
        // Aquí puedes registrar el error o usarlo para establecer un mensaje más específico.
        console.error("Error al procesar la solicitud:", err); // Registrar el error en la consola
        setError("Error al procesar la solicitud."); // Mensaje genérico
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeStatus();
  }, [animeId, auth]);

  const handleFavorite = async () => {
    if (!auth) {
      setToastMessage("Unauthorized.");
      setToastVisible(true);
      return;
    }

    const action = isFavorite ? "remove" : "add";

    try {
      setLoading(true);
      const response = await fetch("/api/user/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          anime_id: animeId,
          action: action,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsFavorite(!isFavorite);
        setToastMessage(isFavorite ? "Removido de favoritos." : "Añadido a favoritos.");
        setToastVisible(true);
      } else {
        setError(data.error);
      }
    } catch (err) {
      // Aquí puedes registrar el error o usarlo para establecer un mensaje más específico.
      console.error("Error al procesar la solicitud:", err); // Registrar el error en la consola
      setError("Error al procesar la solicitud."); // Mensaje genérico
    } finally {
      setLoading(false);
    }
  };

  const handleSetStatus = async (status: string) => {
    if (!auth) {
      setToastMessage("Unauthorized.");
      setToastVisible(true);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/user/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          anime_id: animeId,
          status: status,
          episodes_watched: userProgress.episodesWatched,
          score: userProgress.score,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCurrentStatus(status);
        setToastMessage("Estado actualizado.");
        setToastVisible(true);
      } else {
        setError(data.error);
      }
    } catch (err) {
      // Aquí puedes registrar el error o usarlo para establecer un mensaje más específico.
      console.error("Error al procesar la solicitud:", err); // Registrar el error en la consola
      setError("Error al procesar la solicitud."); // Mensaje genérico
    } finally {
      setLoading(false);
    }
  };

  const handleCloseToast = () => {
    setToastVisible(false);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <ActionButton
        icon={isFavorite ? HeartSolidIcon : HeartIcon}
        text={isFavorite ? "Favorited" : "Favorite"}
        onClick={handleFavorite}
        active={isFavorite}
      />
      {/* <ActionButton
        icon={PlusIcon}
        text="Add to List"
        onClick={() => handleSetStatus('PLANNING')}
        active={currentStatus === 'PLANNING'}
      /> */}
      <ActionButton
        icon={PlayIcon}
        text="Set as Watching"
        onClick={() => handleSetStatus("WATCHING")}
        active={currentStatus === "WATCHING"}
      />
      <ActionButton
        icon={PauseIcon}
        text="Set as Paused"
        onClick={() => handleSetStatus("PAUSED")}
        active={currentStatus === "PAUSED"}
      />
      <ActionButton
        icon={ClockIcon}
        text="Set as Planning"
        onClick={() => handleSetStatus("PLANNING")}
        active={currentStatus === "PLANNING"}
      />
      <ActionButton
        icon={CheckIcon}
        text="Set as Completed"
        onClick={() => handleSetStatus("COMPLETED")}
        active={currentStatus === "COMPLETED"}
      />
      {loading && <p className="text-gray-400">Procesando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {toastVisible && (
        <MessageToast
          message={toastMessage}
          type="info"
          onClose={handleCloseToast}
        />
      )}
    </div>
  );
};

export default AnimeActions;
