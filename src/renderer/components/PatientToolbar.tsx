import {
  Search,
  Camera,
  Mic,
  Mail,
  Calendar,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

interface PatientToolbarProps {
  isChatWindowOpen: boolean;
  onToggleChatWindow: () => void;
}

export default function PatientToolbar({
  isChatWindowOpen,
  onToggleChatWindow,
}: PatientToolbarProps) {
  return (
    <div className="w-full bg-white mb-4 flex flex-row items-center py-2 px-2 gap-2 pr-2">
      <button
        type="button"
        className="w-6 h-6 rounded-sm flex items-center justify-center cursor-pointer hover:bg-gray-100"
        title="Kamera"
        aria-label="Kamera"
      >
        <Camera className="w-5 h-5 text-gray-500" />
      </button>

      <button
        type="button"
        className="w-6 h-6 rounded-sm flex items-center justify-center cursor-pointer hover:bg-gray-100"
        title="Mikrofon"
        aria-label="Mikrofon"
      >
        <Mic className="w-5 h-5 text-gray-500" />
      </button>

      <button
        type="button"
        className="w-6 h-6 rounded-sm flex items-center justify-center cursor-pointer hover:bg-gray-100"
        title="E-Mail"
        aria-label="E-Mail"
      >
        <Mail className="w-5 h-5 text-gray-500" />
      </button>

      <div
        className="flex items-center gap-1 border border-gray-200 rounded px-2 py-1 h-6 flex-1"
        title="Dokumente durchsuchen"
      >
        <input
          type="text"
          placeholder="Patientenakten, Arztbriefe, Anamese"
          className="text-xs text-gray-700 bg-transparent border-none outline-none flex-1"
          title="Dokumente durchsuchen"
        />
      </div>

      <div
        className="flex items-center gap-1 border border-gray-200 rounded px-2 py-1 h-6"
        title="Datum auswählen"
      >
        <Calendar className="w-3 h-3 text-gray-500" />
        <input
          type="date"
          className="text-xs text-gray-700 bg-transparent border-none outline-none"
          title="Datum auswählen"
        />
      </div>

      <div
        className="flex items-center gap-1 border border-gray-200 rounded px-2 py-1 h-6 w-32"
        title="Allgemeine Suche"
      >
        <Search className="w-3 h-3 text-gray-500" />
        <input
          type="text"
          placeholder="Suchen..."
          className="text-xs text-gray-700 bg-transparent border-none outline-none flex-1"
          title="Allgemeine Suche"
        />
      </div>

      <button
        type="button"
        onClick={onToggleChatWindow}
        className="w-6 h-6 rounded-sm flex items-center justify-center cursor-pointer hover:bg-gray-100"
        title={isChatWindowOpen ? 'Chat schließen' : 'Chat öffnen'}
        aria-label={isChatWindowOpen ? 'Close chat window' : 'Open chat window'}
      >
        {isChatWindowOpen ? (
          <ChevronsRight className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronsLeft className="w-5 h-5 text-gray-500" />
        )}
      </button>
    </div>
  );
}
