import React from 'react';

interface BesucherCardProps {
  name: string;
  date: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function BesucherCard({
  name,
  date,
  isSelected,
  onClick,
}: BesucherCardProps) {
  const first2Letters = name.slice(0, 2).toUpperCase();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`border-b flex flex-row p-2 cursor-pointer ${isSelected ? 'bg-gray-200' : 'hover:bg-gray-100'} `}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="bg-gray-300 rounded-full w-12 h-12 justify-center items-center flex text-lg font-semibold text-white">
        {first2Letters}
      </div>
      <div className="flex flex-1 flex-col px-2 py-1 justify-between text-sm">
        <div>{name}</div>
        <div className="flex flex-row justify-between items-center">
          <div>{date}</div>
          <div className="h-3 w-3 bg-red-500 rounded-full" />
        </div>
      </div>
    </div>
  );
}
