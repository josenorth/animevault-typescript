import React, { useEffect, useState } from 'react';
import 'daisyui/dist/full.css'; // Asegúrate de que DaisyUI está importado correctamente

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        } else {
            const timer = setTimeout(() => setIsAnimating(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(onClose, 300); // Espera el tiempo de la animación antes de cerrar
    };

    if (!isOpen && !isAnimating) return null;

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isAnimating ? 'bg-black bg-opacity-50' : 'bg-transparent'} transition-all duration-300 ease-in-out`}>
            <div
                className={`modal-box bg-neutral text-neutral-content rounded-lg shadow-lg p-6 max-w-sm mx-auto transform transition-transform duration-300 ease-in-out ${
                    isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                }`}
            >
                <h2 className="text-lg font-semibold">Confirm Logout</h2>
                <p className="mt-2">Are you sure you want to log out?</p>
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        className="btn btn-outline btn-sm text-white border-neutral-content hover:bg-neutral-content hover:text-neutral"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary btn-sm text-white bg-purple-500 hover:bg-purple-600 border-purple-500 hover:border-purple-600"
                        onClick={onConfirm}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
