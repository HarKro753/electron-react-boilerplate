/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/require-default-props */
import { Check } from 'lucide-react';

interface CheckboxProps {
  title: string;
  isPressed: boolean;
  onPressed: (checked: boolean) => void;
  className?: string;
}

export default function Checkbox({
  title,
  isPressed,
  onPressed,
  className = '',
}: CheckboxProps) {
  const handleClick = () => {
    onPressed(!isPressed);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={handleClick}
        className={`w-4 h-4 border rounded-sm flex items-center justify-center cursor-pointer ${
          isPressed
            ? 'bg-blue-500 border-blue-500'
            : 'bg-white border-gray-300 hover:border-gray-400'
        }`}
        title={title}
        aria-label={title}
      >
        {isPressed && <Check className="w-3 h-3 text-white" />}
      </button>
      <span
        className="text-xs text-gray-700 cursor-pointer select-none"
        onClick={handleClick}
      >
        {title}
      </span>
    </div>
  );
}
