import { X } from 'lucide-react';

interface ChatWindowProps {
  onClose: () => void;
}

export default function ChatWindow({ onClose }: ChatWindowProps) {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full bg-white mb-4 flex flex-row items-center justify-between py-2 px-2 gap-2">
        <div className="text-sm font-medium text-gray-700">Chat</div>
        <button
          type="button"
          onClick={onClose}
          className="w-6 h-6 rounded-sm flex items-center justify-center cursor-pointer hover:bg-gray-100"
          aria-label="Close chat window"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      
      <div className="flex-1 px-2 pb-2">
        <div className="text-gray-500 text-sm">Chat functionality will be implemented here...</div>
      </div>
    </div>
  );
}