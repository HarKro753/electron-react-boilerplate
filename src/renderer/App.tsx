import './App.css';
import AppBar from './AppBar';
import BesucherCard from './BesucherCard';

function App() {
  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col overflow-hidden">
      <AppBar />
      <div className="flex flex-row h-full w-full gap-4 overflow-hidden">
        <div className="w-[300px] h-full flex-shrink-0 flex flex-col overflow-hidden">
          <h3 className="ml-2 mt-4 text-sm text-black font-semibold flex-shrink-0">
            Besucherliste
          </h3>
          <div className="flex-1 w-full bg-white rounded-sm mt-2 overflow-y-auto scrollbar-hide border-t border-r border-b">
            <BesucherCard name="Bernd" date="12.03.2006" />
            <BesucherCard name="Bruno" date="21.06.2021" />
            <BesucherCard name="Harro" date="19.05.2016" />
            <BesucherCard name="Lasse" date="12.03.2006" />
            <BesucherCard name="Emil" date="12.03.2006" />
            <BesucherCard name="Lorenz" date="12.03.2006" />
          </div>
        </div>
        <div className="flex-[1] h-full bg-white rounded-sm border mt-4" />
        <div className="flex-[3] h-full bg-blue-500" />
      </div>
    </div>
  );
}

export default App;
