import React from 'react';
import { Eye, Heart, MessageCircle } from 'lucide-react';

// Define la interfaz para las props
interface UserStatsProps {
  totalFavorites: number; // Total de favoritos
  totalWatched: number; // Total de animes vistos
}

const UserStats: React.FC<UserStatsProps> = ({ totalFavorites, totalWatched }) => (
  <section className="bg-[#111827] p-4 rounded-lg">
    <h2 className="text-xl text-[#C084FC] font-semibold mb-4">Stats</h2>
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-[#C084FC] flex items-center">
          <Eye className="w-4 h-4 mr-2" /> Anime Watched
        </span>
        <span className="font-semibold text-[#C084FC]">{totalWatched}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-[#C084FC] flex items-center">
          <Heart className="w-4 h-4 mr-2" /> Favorites
        </span>
        <span className="font-semibold text-[#C084FC]">{totalFavorites}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-[#C084FC] flex items-center">
          <MessageCircle className="w-4 h-4 mr-2" /> Reviews
        </span>
        <span className="font-semibold text-[#C084FC]">89</span>
      </div>
    </div>
  </section>
);

export default UserStats;
