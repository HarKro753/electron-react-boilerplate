import React from 'react';

interface AppBarItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export default function AppBarItem({ icon, label, onClick }: AppBarItemProps) {
  return (
    <div className="flex flex-col">
      <button
        type="button"
        className="hover:bg-gray-200 flex items-center justify-center rounded cursor-pointer transition-colors border-none"
        onClick={onClick}
        title={label}
        aria-label={label}
      >
        {icon}
      </button>
      {label && (
        <span className="text-xs text-center font-semibold">{label}</span>
      )}
    </div>
  );
}
