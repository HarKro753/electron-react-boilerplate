import './App.css';
import AppBar from './AppBar';
import { BesucherCard } from './BesucherCard';

function App() {
  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col overflow-hidden">
      <AppBar />
      <div className="flex flex-row h-full w-full gap-4 overflow-hidden">
        <div className="flex-[1] h-full flex-shrink-0 flex flex-col overflow-hidden">
          <h3 className="ml-2 mt-4 text-sm text-black font-semibold flex-shrink-0">
            Besucherliste
          </h3>
          <div className="flex-1 w-full bg-white rounded-sm mt-4 overflow-y-auto scrollbar-hide border-t border-r border-b">
            <BesucherCard name={'Bernd'} date={'12.03.2006'}></BesucherCard>
            <BesucherCard name={'Bruno'} date={'21.06.2021'}></BesucherCard>
            <BesucherCard name={'Harro'} date={'19.05.2016'}></BesucherCard>
            <BesucherCard name={'Lasse'} date={'12.03.2006'}></BesucherCard>
            <BesucherCard name={'Emil'} date={'12.03.2006'}></BesucherCard>
            <BesucherCard name={'Lorenz'} date={'12.03.2006'}></BesucherCard>
          </div>
        </div>
        <div className="flex-[4] h-full bg-yellow-500"></div>
        <div className="flex-[2] h-full bg-blue-500"></div>
      </div>
    </div>
  );
}

export default App;
