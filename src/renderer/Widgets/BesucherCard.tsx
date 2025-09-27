interface BesucherCardProps {
  name: string;
  date: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function BesucherCard({ name, date, isSelected = false, onClick }: BesucherCardProps) {
  const first2Letters = name.slice(0, 2).toUpperCase();

  return (
    <div 
      className={`border-b flex flex-row p-2 hover:bg-gray-200 cursor-pointer ${isSelected ? 'bg-blue-100' : ''}`}
      onClick={onClick}
    >
      <div className="bg-gray-300 rounded-full w-16 h-16 justify-center items-center flex text-2xl font-semibold text-white">
        {first2Letters}
      </div>
      <div className="flex flex-1 flex-col px-2 py-1 justify-between">
        <h2>{name}</h2>
        <div className="flex flex-row justify-between items-center">
          <h3>{date}</h3>
          <div className="h-3 w-3 bg-red-500 rounded-full" />
        </div>
      </div>
    </div>
  );
}
