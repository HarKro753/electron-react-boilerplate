import {
  Search,
  Camera,
  Mic,
  Mail,
  Calendar,
  ChevronsLeft,
} from 'lucide-react';

export default function PatientToolbar() {
  return (
    <div className="w-full bg-white mb-4 flex flex-row items-center py-2 px-2 gap-2 pr-4">
      <div className="w-6 h-6 rounded-sm flex items-center justify-center cursor-pointer">
        <Camera className="w-5 h-5 text-gray-500" />
      </div>

      <div className="w-6 h-6 borde rounded-sm flex items-center justify-center cursor-pointer">
        <Mic className="w-5 h-5 text-gray-500" />
      </div>

      <div className="w-6 h-6 rounded-sm flex items-center justify-center cursor-pointer">
        <Mail className="w-5 h-5 text-gray-500" />
      </div>

      <div className="flex items-center gap-1 border border-gray-200 rounded px-2 py-1 h-6 flex-1">
        <Search className="w-3 h-3 text-gray-500" />
        <input
          type="text"
          placeholder="Patient suchen..."
          className="text-xs text-gray-700 bg-transparent border-none outline-none flex-1"
        />
      </div>

      <div className="flex items-center gap-1 border border-gray-200 rounded px-2 py-1 h-6">
        <Calendar className="w-3 h-3 text-gray-500" />
        <input
          type="date"
          className="text-xs text-gray-700 bg-transparent border-none outline-none"
        />
      </div>

      <div className="flex items-center gap-1 border border-gray-200 rounded px-2 py-1 h-6 w-32">
        <Search className="w-3 h-3 text-gray-500" />
        <input
          type="text"
          placeholder="Suchen..."
          className="text-xs text-gray-700 bg-transparent border-none outline-none flex-1"
        />
      </div>

      <ChevronsLeft className="w-5 h-5 text-gray-500 cursor-pointer" />
    </div>
  );
}
