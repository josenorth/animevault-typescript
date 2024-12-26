// EpisodesInput.tsx
import React from 'react';

interface EpisodesInputProps {
  label: string;
  value: number; // Cambiado a number
  setValue: (value: number) => void; // Cambiado a number
  min: number; // Valor mínimo
  max: number; // Valor máximo
  totalEpisodes?: number | null; // Total de episodios, puede ser opcional
}

const EpisodesInput: React.FC<EpisodesInputProps> = ({ label, value, setValue, min, max, totalEpisodes }) => {
  const validateValue = (numericValue: number): number => Math.max(min, Math.min(max, numericValue));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = parseInt(inputValue, 10);

    if (!isNaN(numericValue)) {
      const validValue = validateValue(numericValue);
      setValue(validValue);
    } else if (inputValue === '') {
      setValue(0); // Podrías cambiarlo a un valor por defecto, ya que value ahora es number
    }
  };

  const handleBlur = () => {
    const numericValue = value; // Aquí ya no necesitas hacer parseo
    setValue(validateValue(numericValue));
  };

  return (
    <div className="flex flex-col items-start mb-4">
      <label className="text-sm font-medium text-gray-200 mb-1">{label}</label>
      <div className="flex items-center">
        <input
          type="text" // Cambia el tipo a "number" para que el input maneje números
          value={value} // Asegúrate de que no cause un error
          onChange={handleInputChange}
          onBlur={handleBlur}
          className="w-16 text-center py-1 bg-[#111827] text-white rounded-l"
        />
        {totalEpisodes !== null && (
          <span className="ml-2 text-sm text-gray-200">/ {totalEpisodes}</span>
        )}
      </div>
    </div>
  );
};

export default EpisodesInput;
