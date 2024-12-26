// UserProgress.tsx
import React, { useState, useEffect } from "react";
import EpisodesInput from "../Inputs/EpisodesInput";
import CustomInput from "../Inputs/CustomInput";
import MessageToast from "../../ui/MessageToast";
import { useAuth } from "../../../context/AuthContext"; // Import the useAuth hook
import { useQueryClient } from "@tanstack/react-query";

interface UserProgressData {
  episodesWatched: number;
  score: number;
  status: string | null;
}

interface UserProgressProps {
  totalEpisodes: number; 
  animeId: number; 
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgressData>>;
}

const UserProgress: React.FC<UserProgressProps> = ({ totalEpisodes, animeId, setUserProgress }) => {
  const { auth } = useAuth(); // Get auth from context
  const [watchedEpisodes, setWatchedEpisodes] = useState<number>(0);
  const [userScore, setUserScore] = useState<number>(0);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const queryClient = useQueryClient();

  // Function to fetch user progress
  useEffect(() => {
    const fetchUserProgress = async () => {
      if (!auth) return; // Skip fetching if user is not authenticated
  
      try {
        const response = await fetch(`/api/user/progress/${animeId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          if (response.status === 401) {
            setToastMessage("Unauthorized.");
            setToastVisible(true);
          }
          throw new Error("Error al obtener el progreso");
        }
  
        const data = await response.json();
        setWatchedEpisodes(data.episodes_watched || 0);
        setUserScore(data.score || 0);
        setUserProgress({
          episodesWatched: data.episodes_watched || 0,
          score: data.score || 0,
          status: data.status || null, // Asegúrate de establecer el status aquí
        });
      } catch (error) {
        console.error("Error al obtener el progreso del usuario:", error);
      }
    };
  
    fetchUserProgress();
  }, [animeId, auth, setUserProgress]); // Agregado setUserProgress
  

  const handleSave = async () => {
    if (!auth) return; // Skip saving if user is not authenticated

    const payload = {
      anime_id: animeId,
      episodes_watched: Number(watchedEpisodes),
      score: Number(userScore),
      status: null // Ajusta esto según tu lógica de aplicación si tienes un valor para el status
    };
    console.log("Payload a enviar:", payload);
    try {
      const response = await fetch("/api/user/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          return; // Just return if unauthorized
        }
        throw new Error(errorData.error || "Error desconocido");
      }
      setToastMessage("Cambios guardados!");
      setToastVisible(true);
      queryClient.invalidateQueries({ queryKey: ['animes'] });
      console.log("Cambios guardados!", { watchedEpisodes, userScore });
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  const handleCloseToast = () => {
    setToastVisible(false);
  };

  return (
    <div className="mb-8 p-4 bg-gray-800 rounded-lg mt-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-200">
        Your Progress
      </h2>
      <div className="flex flex-wrap gap-4">
        <EpisodesInput
          label="Episodes Watched"
          value={watchedEpisodes}
          setValue={setWatchedEpisodes}
          min={0}
          max={totalEpisodes}
          totalEpisodes={totalEpisodes}
        />
        <CustomInput
          label="Your Score"
          value={userScore}
          setValue={setUserScore}
          min={1}
          max={10}
        />
      </div>
      <button
        className="btn btn-primary bg-purple-400 hover:bg-purple-100 border-none mt-2 w-full"
        onClick={handleSave}
      >
        Save
      </button>
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

export default UserProgress;
