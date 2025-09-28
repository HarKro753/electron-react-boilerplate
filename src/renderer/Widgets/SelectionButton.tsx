/* eslint-disable react/no-array-index-key */
/* eslint-disable react/require-default-props */
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface SelectionButtonProps {
  selection: string;
  options: string[];
  onSelectionChange?: (option: string) => void;
  className?: string;
  disabled?: boolean;
}

export default function SelectionButton({
  selection,
  options,
  onSelectionChange,
  className = '',
  disabled = false,
}: SelectionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(selection);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    onSelectionChange?.(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex items-center gap-1 border border-gray-200 rounded px-2 py-1 h-6 bg-white ${
          disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-gray-50 cursor-pointer'
        }`}
        title={`Auswahl: ${selectedOption}`}
      >
        <span className="text-xs text-gray-700">{selectedOption}</span>
        <ChevronDown className="w-3 h-3 text-gray-500" />
      </button>

      {isOpen && !disabled && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-sm z-10 min-w-full">
          {options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleOptionSelect(option)}
              className="w-full px-2 py-1 text-xs text-gray-700 hover:bg-gray-50 text-left first:rounded-t last:rounded-b"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
