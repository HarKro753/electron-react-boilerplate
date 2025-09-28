import {
  Home,
  Calendar,
  MessageCircle,
  Pill,
  ClipboardList,
  FileText,
  User,
  Settings,
  Bot,
} from 'lucide-react';
import AppBarItem from '../Widgets/AppBarItem';

export default function AppBar() {
  return (
    <div className="bg-white border-b border-gray-200 flex flex-row gap-6 items-center px-8 pt-2 pb-1 ">
      <AppBarItem
        icon={
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
            <Home size={24} color="white" />
          </div>
        }
        label="Home"
        onClick={() => {}}
      />

      <AppBarItem
        icon={
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
            <Calendar size={24} color="white" />
          </div>
        }
        label="Termin"
        onClick={() => {}}
      />

      <AppBarItem
        icon={
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
            <MessageCircle size={24} color="white" />
          </div>
        }
        label="Nachrichten"
        onClick={() => {}}
      />

      <AppBarItem
        icon={
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
            <Pill size={24} color="white" />
          </div>
        }
        label="Medikamente"
        onClick={() => {}}
      />

      <AppBarItem
        icon={
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
            <ClipboardList size={24} color="white" />
          </div>
        }
        label="Anamnese"
        onClick={() => {}}
      />

      <AppBarItem
        icon={
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <FileText size={24} color="white" />
          </div>
        }
        label="Arztbrief"
        onClick={() => {}}
      />
      <div className="flex-[1]" />

      <AppBarItem
        icon={
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
            <Bot size={24} color="white" />
          </div>
        }
        label="Sprechstundenassistent"
        onClick={() => {
          window.electron?.ipcRenderer.sendMessage(
            'open-sprechstunde-assistant',
          );
        }}
      />

      <div className="flex-[4]" />

      <AppBarItem
        icon={
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center shadow-lg">
            <User size={24} color="white" />
          </div>
        }
        label="Profile"
        onClick={() => {}}
      />

      <AppBarItem
        icon={
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center shadow-lg">
            <Settings size={24} color="white" />
          </div>
        }
        label="Settings"
        onClick={() => {}}
      />
    </div>
  );
}
