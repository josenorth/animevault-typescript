// CustomInput.tsx
import React from 'react';

interface CustomInputProps {
  label: string; // Etiqueta del input
  value: number; // Cambiar de string a number
  setValue: (value: number) => void; // Cambiar de string a number
  min: number; // Valor mínimo permitido
  max: number; // Valor máximo permitido
  totalEpisodes?: number | null; // Total de episodios opcional
}

const CustomInput: React.FC<CustomInputProps> = ({ label, value, setValue, min, max, totalEpisodes = null }) => {
  const validateValue = (numericValue: number): number => Math.max(min, Math.min(max, numericValue));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(',', '.'); // Reemplazar comas por puntos
    const numericValue = parseFloat(inputValue);

    if (!isNaN(numericValue) && inputValue && !inputValue.endsWith('.')) {
      const validValue = validateValue(numericValue);
      setValue(validValue);
    } else {
      // Permitir el input vacío o cualquier texto
      setValue(NaN); // Manejar como NaN si es un input inválido
    }
  };

  const handleBlur = () => {
    if (!value.toString().endsWith('.')) {
      const numericValue = parseFloat(value.toString());
      if (!isNaN(numericValue)) {
        setValue(validateValue(numericValue));
      }
    }
  };

  return (
    <div className="flex flex-col items-start mb-4">
      <label className="text-sm font-medium text-gray-200 mb-1">{label}</label>
      <div className="flex items-center">
        <input
          type="text" // Se mantiene como texto para permitir valores no numéricos
          value={isNaN(value) ? '' : value} // Manejar NaN para input vacío
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

export default CustomInput;
