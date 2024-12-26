import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Activity {
  id: number;
  action: string;
  title_romaji: string;
  created_at: string;
  image_url: string;
  episodes_watched?: number; // Hacer opcional para manejar otras acciones
}

interface RecentActivityProps {
  activities: Activity[];
  loading: boolean; // Agregar prop loading
}
const generateUniqueId = () => {
  return window.crypto.randomUUID();
};

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
};

const getActivityMessage = (activity: Activity) => {
  switch (activity.action) {
    case 'COMPLETED':
      return 'Completed';
    case 'PLANNED_TO_WATCH':
      return 'Plans to watch';
    case 'WATCHED_EPISODES':
      return activity.episodes_watched && activity.episodes_watched > 0
        ? `Watched episode ${activity.episodes_watched} of`
        : ''; // Asegúrate de mostrar solo si hay episodios vistos
    case 'PAUSED':
      return 'Paused';
    case 'DROPPED':
      return 'Dropped';
    default:
      return '';
  }
};

const RecentActivity: React.FC<RecentActivityProps> = ({ activities, loading }) => {
    return (
      <SkeletonTheme baseColor="#1F2937" highlightColor="rgba(192, 132, 252, 0.2)">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#C084FC]">Recent Activity</h2>
          <div className="space-y-4">
            {loading ? (
              <>
                {[...Array(3)].map((_, index) => (
                  <Skeleton key={index} height={60} />
                ))}
              </>
            ) : activities.length === 0 ? (
              <p className="text-gray-500">No recent activity available.</p>
            ) : (
              activities.map((activity) => {
                const uniqueKey = activity.id || generateUniqueId();
                return (
                  <div key={uniqueKey} className="flex items-start space-x-3 bg-[#111827] p-3 rounded-lg">
                    <img
                      src={activity.image_url || '/path-to-placeholder.jpg'}
                      alt={`Cover for ${activity.title_romaji}`}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="text-sm text-white">
                        {getActivityMessage(activity)}{' '}
                        <span className="text-[#C084FC]">{activity.title_romaji}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(activity.created_at)}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </SkeletonTheme>
    );
  };
  
  export default RecentActivity;