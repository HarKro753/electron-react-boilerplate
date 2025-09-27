import './App.css';
import { useState } from 'react';
import AppBar from './AppBar';
import BesucherCard from './Widgets/BesucherCard';

function PatientData() {
  const [selectedPatient] = useState<string | null>('Anna Mueller');

  // Mock EPA data structure
  const mockEpaData = {
    Patient: {
      Name: 'Anna Mueller',
    },
    Diagnosen: [
      {
        datum: new Date('2024-03-15'),
        diagnose: 'M54.5',
        beschreibung: 'Rückenschmerzen',
        arzt: 'Dr. Schmidt',
      },
      {
        datum: new Date('2024-02-20'),
        diagnose: 'K59.0',
        beschreibung: 'Obstipation',
        arzt: 'Dr. Mueller',
      },
    ],
    Befunde: [
      {
        Datum: new Date('2024-03-10'),
        Typ: 0,
      },
      {
        Datum: new Date('2024-02-15'),
        Typ: 1,
      },
    ],
    Medikationen: [
      {
        startDatum: new Date('2024-03-15'),
        medikament: 'Ibuprofen',
        dosierung: '400mg 2x täglich',
        arzt: 'Dr. Schmidt',
      },
      {
        startDatum: new Date('2024-02-20'),
        medikament: 'Lactulose',
        dosierung: '15ml täglich',
        arzt: 'Dr. Mueller',
      },
    ],
    Impfungen: [
      {
        datum: new Date('2024-01-15'),
        impfung: 'COVID-19',
        hersteller: 'BioNTech',
      },
      {
        datum: new Date('2023-11-20'),
        impfung: 'Influenza',
        hersteller: 'Sanofi',
      },
    ],
  };

  if (!selectedPatient) {
    return (
      <div className="bg-white h-full border border-gray-300">
        <div className="p-6 h-full flex items-center justify-center">
          <p className="text-gray-500">Bitte wählen Sie einen Patienten aus</p>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const formatBefundType = (type: number) => {
    return type === 0 ? 'Laborwerte' : 'Röntgenbild';
  };

  const allRecords = [
    ...mockEpaData.Diagnosen.map((d) => ({
      datum: d.datum,
      typ: 'ANA',
      eintrag: `${d.diagnose} - ${d.beschreibung} (${d.arzt})`,
    })),
    ...mockEpaData.Befunde.map((b) => ({
      datum: b.Datum,
      typ: 'BEF',
      eintrag: formatBefundType(b.Typ),
    })),
    ...mockEpaData.Medikationen.map((m) => ({
      datum: m.startDatum,
      typ: 'MED',
      eintrag: `${m.medikament} - ${m.dosierung} (${m.arzt})`,
    })),
    ...mockEpaData.Impfungen.map((i) => ({
      datum: i.datum,
      typ: 'IMP',
      eintrag: `${i.impfung} - ${i.hersteller}`,
    })),
  ].sort((a, b) => b.datum.getTime() - a.datum.getTime()); // Sort by date, newest first

  const groupedRecords = allRecords.reduce(
    (groups, record) => {
      const dateKey = formatDate(record.datum);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(record);
      return groups;
    },
    {} as Record<string, typeof allRecords>,
  );

  return (
    <div className="bg-white h-full border border-gray-300 mt-2">
      <div className="overflow-y-auto">
        {allRecords.length > 0 ? (
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
        ) : (
          <div className="px-3 py-8 text-center">
            <p className="text-sm text-gray-500">
              Keine medizinischen Daten vorhanden
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
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
          <PatientData />
        </div>
      </div>
    </div>
  );
}

export default App;
