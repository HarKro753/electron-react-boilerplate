import { FiHome, FiSettings, FiUser } from 'react-icons/fi';
import AppBarItem from './AppBarItem';

export default function AppBar() {
  return (
    <div className="bg-gray-50 border flex flex-row gap-8 items-center px-8 py-2">
      <AppBarItem
        icon={<FiHome size={40} />}
        label="Home"
        onClick={() => console.log('Home clicked')}
      />
      <AppBarItem
        icon={<FiUser size={40} />}
        label="Profile"
        onClick={() => console.log('Profile clicked')}
      />
      <AppBarItem
        icon={<FiSettings size={40} />}
        label="Settings"
        onClick={() => console.log('Settings clicked')}
      />
    </div>
  );
}
