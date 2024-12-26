import React, { useState, useEffect, ChangeEvent } from "react";
import { Camera, Upload } from "lucide-react";
import "../../../css/settings.css";
import MessageToast from "../../ui/MessageToast";
import { useAuth } from '../../../context/AuthContext';

interface Toast {
  message: string;
  type: "success" | "error";
}

const ProfileSettings: React.FC = () => {
  const [name, setName] = useState<string>("John Doe");
  const [email, setEmail] = useState<string>("john.doe@example.com");
  const [bio, setBio] = useState<string>(
    "Soy un desarrollador de software apasionado por crear aplicaciones fáciles de usar."
  );
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [bannerUrl, setBannerUrl] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [toast, setToast] = useState<Toast | null>(null);
  const { /*auth,*/ updateAvatar, updateBanner } = useAuth(); // Asegúrate de tener updateBanner en tu contexto

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth") || "{}");
    if (storedAuth.avatar_url) setAvatarUrl(storedAuth.avatar_url);
    if (storedAuth.banner_url) setBannerUrl(storedAuth.banner_url);
    if (storedAuth.username) setUsername(storedAuth.username);
  }, []); 

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const uploadSuccessful = await uploadFile(file, "avatar");
      if (uploadSuccessful) {
        const newAvatarUrl = `${uploadSuccessful}?t=${new Date().getTime()}`;
        setAvatarUrl(newAvatarUrl);
        updateAvatar(newAvatarUrl);
        const authData = JSON.parse(localStorage.getItem("auth") || "{}");
        authData.avatar_url = newAvatarUrl;
        localStorage.setItem("auth", JSON.stringify(authData));
        setToast({ message: "Avatar updated successfully!", type: "success" });
      } else {
        setToast({ message: "Error updating avatar!", type: "error" });
      }
    }
  };

  const handleBannerChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const uploadSuccessful = await uploadFile(file, "banner");
      if (uploadSuccessful) {
        const newBannerUrl = `${uploadSuccessful}?t=${new Date().getTime()}`;
        setBannerUrl(newBannerUrl);
        updateBanner(newBannerUrl);
        const authData = JSON.parse(localStorage.getItem("auth") || "{}");
        authData.banner_url = newBannerUrl;
        localStorage.setItem("auth", JSON.stringify(authData));
        setToast({ message: "Banner updated successfully!", type: "success" });
      } else {
        setToast({ message: "Error updating banner!", type: "error" });
      }
    }
  };

  const uploadFile = async (file: File, type: string): Promise<string | false> => {
    const formData = new FormData();
    formData.append(type, file);

    try {
      const response = await fetch(`/client/upload/${type}`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        return data.avatar_url || data.banner_url;
      } else {
        console.error("Error al subir el archivo:", data.error);
        return false;
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      return false;
    }
  };

  return (
    <div className="space-y-6 bg-gray-800 p-6 rounded-lg">
      <div className="fixed top-0 left-0 right-0 pointer-events-none flex items-start justify-center z-50">
        {toast && (
          <MessageToast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
      <div className="banner-container relative">
        <div
          className="w-full h-48 rounded-lg"
          style={{
            backgroundImage: `url(${bannerUrl})`,
            backgroundPosition: "50%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <label
            htmlFor="banner-upload"
            className="absolute bottom-2 right-2 bg-white p-2 rounded-full cursor-pointer"
          >
            <Upload className="w-5 h-5 text-gray-600" />
            <span className="sr-only">Upload banner image</span>
          </label>
          <input
            type="file"
            id="banner-upload"
            accept="image/*"
            className="hidden"
            onChange={handleBannerChange}
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <div
            className="avatar"
            style={{
              backgroundImage: `url(${avatarUrl})`,
              backgroundPosition: "50%",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              borderRadius: "4px",
              height: "100px",
              width: "100px",
            }}
          >
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer"
            >
              <Camera className="w-4 h-4 text-gray-600" />
              <span className="sr-only">Upload avatar image</span>
            </label>
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">{username}</h3>
        </div>
      </div>

      <div className="space-y-4 text-white">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 bg-[#111827] block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 bg-[#111827] block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
          />
        </div>
        <div>
          <label htmlFor="bio" className="block text-sm font-medium">
            About
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-1 block bg-[#111827] w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
          ></textarea>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
