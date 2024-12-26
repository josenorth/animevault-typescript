import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface MessageToastProps {
  message: string; // Mensaje que se mostrará en el toast
  type?: ToastType; // Tipo de toast
  onClose?: () => void; // Función opcional que se llamará al cerrar el toast
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: AlertCircle,
};

const bgColors = {
  success: 'bg-[#C084FC]',
  error: 'bg-red-500',
  info: 'bg-blue-500',
};

const MessageToast: React.FC<MessageToastProps> = ({ message, type = 'info', onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isEntering, setIsEntering] = useState(true);
  const Icon = icons[type];

  useEffect(() => {
    setIsVisible(true);

    const enterTimer = setTimeout(() => {
      setIsEntering(false);
    }, 50);

    const leaveTimer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, 300);
    }, 3000);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(leaveTimer);
    };
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 pointer-events-none flex items-start justify-center z-50">
      <div
        className={`mt-4 flex items-center p-4 rounded-lg text-white shadow-lg transition-all duration-300 ease-in-out ${
          bgColors[type]
        } ${isLeaving ? 'opacity-0 -translate-y-full' : isEntering ? 'opacity-0 translate-y-[-100%]' : 'opacity-100 translate-y-0'}`}
        role="alert"
      >
        <Icon className="w-6 h-6 mr-2" />
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

export default MessageToast;
// https://mui.com/material-ui/react-alert/ para alertas