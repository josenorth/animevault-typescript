import React, { useEffect } from 'react';
import { Modal, Box, Button, TextField, IconButton } from '@mui/material';
import { Heart, ChevronUp, ChevronDown } from 'lucide-react';
import CloseIcon from '@mui/icons-material/Close';

interface Anime {
  status?: string;
  user_score?: number;
  progress?: number;
  start_date?: string;
  end_date?: string;
  total_rewatches?: number;
  notes?: string;
  is_favorite?: number;
  image?: string;
  title: string;
}

interface ListModalProps {
  anime: Anime;
  onClose: () => void;
}

const ListModal: React.FC<ListModalProps> = ({ anime, onClose }) => {
  // Function to format the date to 'YYYY-MM-DD'
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return ''; // Return empty if date is null
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Returns 'YYYY-MM-DD'
  };

  // Initialize state with formatted data from anime
  const [status, setStatus] = React.useState(anime.status || 'WATCHING');
  const [score, setScore] = React.useState(anime.user_score ?? 0);
  const [episode, setEpisode] = React.useState(anime.progress || 0);
  const [startDate, setStartDate] = React.useState(formatDate(anime.start_date));
  const [finishDate, setFinishDate] = React.useState(formatDate(anime.end_date));
  const [rewatches, setRewatches] = React.useState(anime.total_rewatches || 0);
  const [notes, setNotes] = React.useState(anime.notes || '');
  const [isFavorite, setIsFavorite] = React.useState(anime.is_favorite === 1);

  // Update status when anime prop changes
  useEffect(() => {
    setStatus(anime.status || 'WATCHING');
    setScore(Number(anime.user_score) || 0);
    setEpisode(anime.progress || 0);
    setStartDate(formatDate(anime.start_date));
    setFinishDate(formatDate(anime.end_date));
    setRewatches(anime.total_rewatches || 0);
    setNotes(anime.notes || '');
    setIsFavorite(anime.is_favorite === 1);
  }, [anime]);
  useEffect(() => {
    // Disable scroll on modal open
    document.body.style.overflow = 'hidden';

    return () => {
      // Re-enable scroll on modal close
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleModalClose = () => {
    onClose();
    document.body.style.overflow = 'auto'; // Ensure scroll is enabled when modal closes
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Modal
      open={!!anime}
      onClose={handleModalClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',        
        backdropFilter: 'blur(4px)', // Desenfoque del fondo
      }}
    >
    <Box
      sx={{
        backgroundColor: '#111827',
        color: 'white',
        p: 4,
        borderRadius: 2,
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflowY: 'auto', // Permite desplazamiento en caso de que el contenido sea demasiado largo
        '&:focus': {
          outline: 'none', // Evita el borde por defecto del navegador
          borderColor: 'transparent', // Cambia el color del borde cuando el contenedor es enfocado (lo hace invisible)
        },
      }}
      tabIndex={0} // Hace que el Box sea "enfocable"
    >
        {/* Botón de cerrar */}
        <IconButton
          aria-label="close"
          onClick={handleModalClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'white',
          }}
        >
          <CloseIcon />
        </IconButton>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={anime.image}
              alt={anime.title}
              className="w-16 h-24 object-cover rounded"
            />
            <h2 className="text-xl font-bold">{anime.title}</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Heart
              className={`cursor-pointer ${isFavorite ? 'text-purple-500 fill-purple-500 hover:text-gray-500 hover:fill-gray-500' : 'text-gray-500 fill-gray-500'} hover:text-purple-500 hover:fill-purple-500`}
              onClick={handleToggleFavorite}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ backgroundColor: '#3f51b5' }}
            >
              Save
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-gray-800 rounded p-2"
            >
              <option value="WATCHING">Watching</option>
              <option value="COMPLETED">Completed</option>
              <option value="PLANNING">Plan to Watch</option>
              <option value="PAUSED">Paused</option>
              <option value="DROPPED">Dropped</option>
            </select>
          </div>

          {/* Score */}

          <div>
          <label className="block text-sm font-medium mb-1">Score</label>
          <div className="flex items-center">
            <TextField
              type="number"
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              sx={{ input: { color: 'white', backgroundColor: 'rgb(31, 41, 55)' } }}
            />
            <div className="ml-2">
              <ChevronUp className="cursor-pointer" onClick={() => setScore(Math.min(score + 1, 10))} />
              <ChevronDown className="cursor-pointer" onClick={() => setScore(Math.max(score - 1, 0))} />
            </div>
          </div>
        </div>



          {/* Episode Progress */}
          <div>
            <label className="block text-sm font-medium mb-1">Episode Progress</label>
            <div className="flex items-center">
              <TextField
                type="number"
                value={episode}
                onChange={(e) => setEpisode(Number(e.target.value))}
                sx={{ input: { color: 'white', backgroundColor: 'rgb(31, 41, 55)' } }}
              />
              <div className="ml-2">
                <ChevronUp
                  className="cursor-pointer"
                  onClick={() => setEpisode(episode + 1)}
                />
                <ChevronDown
                  className="cursor-pointer"
                  onClick={() => setEpisode(Math.max(episode - 1, 0))}
                />
              </div>
            </div>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <TextField
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              sx={{ input: { color: 'white', backgroundColor: 'rgb(31, 41, 55)' } }}
            />
          </div>

          {/* Finish Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Finish Date</label>
            <TextField
              type="date"
              value={finishDate}
              onChange={(e) => setFinishDate(e.target.value)}
              sx={{ input: { color: 'white', backgroundColor: 'rgb(31, 41, 55)' } }}
            />
          </div>

          {/* Total Rewatches */}
          <div>
            <label className="block text-sm font-medium mb-1">Total Rewatches</label>
            <div className="flex items-center">
              <TextField
                type="number"
                value={rewatches}
                onChange={(e) => setRewatches(Number(e.target.value))}
                sx={{ input: { color: 'white', backgroundColor: 'rgb(31, 41, 55)' } }}
              />
              <div className="ml-2">
                <ChevronUp
                  className="cursor-pointer"
                  onClick={() => setRewatches(rewatches + 1)}
                />
                <ChevronDown
                  className="cursor-pointer"
                  onClick={() => setRewatches(Math.max(rewatches - 1, 0))}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-6">
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-gray-800 rounded p-2 h-24"
          ></textarea>
        </div>

        {/* Delete Button */}
        <div className="mt-6 flex justify-end">
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Delete
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ListModal;
