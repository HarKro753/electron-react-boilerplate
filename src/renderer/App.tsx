import './App.css';
import AppBar from './AppBar';
import { getAllRecords as getGroupedRecords } from './repository/get_grouped_records';
import BesucherCard from './Widgets/BesucherCard';

function App() {
  const groupedRecords = getGroupedRecords();

  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col overflow-hidden">
      <AppBar />
      <div className="flex flex-row h-full w-full gap-4 overflow-hidden">
        <div className="w-[300px] h-full flex-shrink-0 flex flex-col overflow-hidden">
          <h3 className="ml-2 mt-4 text-sm text-black font-semibold flex-shrink-0">
            Besucherliste
          </h3>

          {/* Besucher Liste */}
          <div className="flex-1 w-full bg-white rounded-sm mt-2 overflow-y-auto scrollbar-hide border-t border-r border-b">
            <BesucherCard name="Bernd" date="12.03.2006" />
            <BesucherCard name="Bruno" date="21.06.2021" />
            <BesucherCard name="Harro" date="19.05.2016" />
            <BesucherCard name="Lasse" date="12.03.2006" />
            <BesucherCard name="Emil" date="12.03.2006" />
            <BesucherCard name="Lorenz" date="12.03.2006" />
          </div>
        </div>

        {/* Besucher Detail */}
        <div className="flex flex-col mt-4">
          <h3 className="ml-2 text-sm text-black font-semibold flex-shrink-0">
            Patientenkurzinfos
          </h3>
          <div className="flex-[1] h-full bg-white rounded-sm border p-2 flex flex-col mt-2">
            Besuch
            <button
              type="button"
              className="border border-gray-200 w-[120px] rounded-md text-sm"
            >
              Besuch anlegen
            </button>
            <div className="h-[1px] bg-gray-200 my-8 mx-2" />
            <div className="flex flex-row p-1">
              <div className="w-[150px] h-[150px] bg-gray-100" />
              <div className="flex flex-col justify-between p-2">
                <div>
                  <h1>Anna Mueller</h1>
                  <div>*12.12.1980 (44J)</div>
                </div>

                <div className="flex flex-row gap-2">
                  <div className="w-8 h-8 border border-gray-300 rounded-sm" />
                  <div className="w-8 h-8 border border-gray-300 rounded-sm" />
                </div>
              </div>
            </div>
            <textarea
              className="mt-1 mx-1 p-2 bg-gray-50 rounded-sm text-gray-400 text-sm resize-none"
              readOnly
            >
              Patienteninfo
            </textarea>
          </div>
        </div>

        {/* Patient Data */}
        <div className="flex-[3] h-full mt-4">
          <h3 className="ml-2 text-sm text-black font-semibold flex-shrink-0">
            Patientendokumente
          </h3>
          <div className="bg-white h-full border border-gray-300 mt-2">
            <div className="overflow-y-auto">
              <div>
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-gray-100 border-b border-gray-200 text-xs font-medium text-gray-700">
                  <div className="col-span-2">Datum</div>
                  <div className="col-span-1">Typ</div>
                  <div className="col-span-9">Eintrag</div>
                </div>

                {/* Table Rows - Grouped by Date */}
                <div>
                  {Object.entries(groupedRecords).map(
                    ([dateKey, records], groupIndex) => (
                      <div key={dateKey}>
                        {records.map((record, recordIndex) => (
                          <div
                            key={`${record.typ}-${record.datum.getTime()}-${record.eintrag.slice(0, 20)}`}
                            className={`grid grid-cols-12 gap-2 px-3 py-2 text-xs hover:bg-gray-50 ${
                              groupIndex > 0 && recordIndex === 0
                                ? 'border-t border-gray-200'
                                : ''
                            }`}
                          >
                            <div className="col-span-2 text-gray-900 font-mono">
                              {recordIndex === 0 ? dateKey : ''}
                            </div>
                            <div className="col-span-1 text-gray-700 font-medium">
                              {record.typ}
                            </div>
                            <div className="col-span-9 text-gray-900">
                              {record.eintrag}
                            </div>
                          </div>
                        ))}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
