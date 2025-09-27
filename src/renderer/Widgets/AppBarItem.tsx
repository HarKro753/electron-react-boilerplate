import React from 'react';

interface AppBarItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export default function AppBarItem({ icon, label, onClick }: AppBarItemProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        className="flex items-center justify-center rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 border-none bg-transparent p-0"
        onClick={onClick}
        title={label}
        aria-label={label}
      >
        {icon}
      </button>
      {label && (
        <span className="text-xs text-center font-medium text-gray-700 max-w-16 leading-tight">
          {label}
        </span>
      )}
    </div>
  );
}
