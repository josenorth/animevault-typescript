import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import { CameraAlt as CameraIcon } from '@mui/icons-material';
import MessageToast from '../../ui/MessageToast';
import { useAuth } from '../../../context/AuthContext';

interface UserAvatarBannerProps {
  avatarSrc: string;
  bannerSrc: string;
  handleAvatarUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  handleBannerUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}

const UserAvatarBanner: React.FC<UserAvatarBannerProps> = ({
  avatarSrc,
  bannerSrc,
  handleAvatarUpload,
  handleBannerUpload,
}) => {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative">
      {/* Banner */}
      <img
        src={bannerSrc}
        alt="User banner"
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <input
        type="file"
        ref={bannerInputRef}
        onChange={handleBannerUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />
      <Tooltip title="Cambiar banner">
        <IconButton
          onClick={() => bannerInputRef.current?.click()}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
          }}
        >
          <CameraIcon />
        </IconButton>
      </Tooltip>

      {/* Avatar */}
      <div className="absolute bottom-0 left-4 transform translate-y-1/2 flex items-center space-x-4">
        <div className="relative">
          <Avatar
            alt="User Avatar"
            src={avatarSrc}
            sx={{ width: 96, height: 96, border: '4px solid #fff' }}
          />
          <input
            type="file"
            ref={avatarInputRef}
            onChange={handleAvatarUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <Tooltip title="Cambiar avatar">
            <IconButton
              onClick={() => avatarInputRef.current?.click()}
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
              }}
            >
              <CameraIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

const ProfileSettings: React.FC = () => {
    const [avatarUrl, setAvatarUrl] = useState<string>(localStorage.getItem('avatarUrl') || '/placeholder.svg');
    const [bannerUrl, setBannerUrl] = useState<string>(localStorage.getItem('bannerUrl') || '/placeholder-banner.svg');
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const { updateAvatar, updateBanner } = useAuth();
  
    useEffect(() => {
      const storedAvatar = localStorage.getItem('avatarUrl');
      const storedBanner = localStorage.getItem('bannerUrl');
      if (storedAvatar) setAvatarUrl(storedAvatar);
      if (storedBanner) setBannerUrl(storedBanner);
    }, []);
  
    const handleAvatarUpload = async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const uploadSuccessful = await uploadFile(file, 'avatar');
        if (uploadSuccessful) {
          const newAvatarUrl = `${uploadSuccessful}?t=${new Date().getTime()}`;
          setAvatarUrl(newAvatarUrl);
          localStorage.setItem('avatarUrl', newAvatarUrl);
          updateAvatar(newAvatarUrl);
          setToast({ message: '¡Avatar actualizado con éxito!', type: 'success' });
        } else {
          setToast({ message: 'Error al actualizar el avatar', type: 'error' });
        }
      }
    };
  
    const handleBannerUpload = async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const uploadSuccessful = await uploadFile(file, 'banner');
        if (uploadSuccessful) {
          const newBannerUrl = `${uploadSuccessful}?t=${new Date().getTime()}`;
          setBannerUrl(newBannerUrl);
          localStorage.setItem('bannerUrl', newBannerUrl);
          updateBanner(newBannerUrl);
          setToast({ message: '¡Banner actualizado con éxito!', type: 'success' });
        } else {
          setToast({ message: 'Error al actualizar el banner', type: 'error' });
        }
      }
    };

  const uploadFile = async (file: File, type: string): Promise<string | false> => {
    const formData = new FormData();
    formData.append(type, file);

    try {
      const response = await fetch(`/client/upload/${type}`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        return type === 'avatar' ? data.avatar_url : data.banner_url;
      } else {
        console.error('Error al subir el archivo:', data.error);
        return false;
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      return false;
    }
  };

  return (
    <div>
      <UserAvatarBanner
        avatarSrc={avatarUrl}
        bannerSrc={bannerUrl}
        handleAvatarUpload={handleAvatarUpload}
        handleBannerUpload={handleBannerUpload}
      />
      {toast && <MessageToast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default ProfileSettings;
