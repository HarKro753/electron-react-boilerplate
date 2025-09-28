/* eslint-disable react/jsx-no-comment-textnodes */
import './App.css';
import { useState } from 'react';
import { User, Share2, Search, X, Phone, Printer } from 'lucide-react';
import AppBar from './AppBar';
import { getPatientRecords } from './repository/get_grouped_records';
import { getPatients } from './api/getPatients';
import { Patient } from './models/Patient';
import BesucherCard from './Widgets/BesucherCard';
import PatientInfoSection from './components/PatientInfoSection';

function App() {
  const patients = getPatients();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(
    patients[0],
  );
  const groupedRecords = getPatientRecords(selectedPatient);

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
            {patients.map((patient) => (
              <BesucherCard
                key={patient.id}
                name={patient.name}
                date={patient.lastVisit.toLocaleDateString('de-DE')}
                isSelected={selectedPatient?.id === patient.id}
                onClick={() => setSelectedPatient(patient)}
              />
            ))}
          </div>
        </div>

        {/* Besucher Detail */}
        <div className="flex flex-col mt-4">
          <h3 className="ml-2 text-sm text-black font-semibold flex-shrink-0">
            Patientenkurzinfos
          </h3>
          <div className="flex-[1] h-full bg-white rounded-sm border p-2 flex flex-col mt-2">
            <div className="flex flex-row p-1">
              <div className="w-[150px] h-[150px] bg-gray-100 rounded-full" />
              <div className="flex flex-col justify-between p-2">
                <div>
                  <h1>{selectedPatient?.name || 'Kein Patient ausgewählt'}</h1>
                  {selectedPatient && (
                    <div>
                      *{selectedPatient.birthDate.toLocaleDateString('de-DE')} (
                      {new Date().getFullYear() -
                        selectedPatient.birthDate.getFullYear()}
                      J)
                    </div>
                  )}
                </div>

                <div className="flex flex-row gap-2">
                  <div className="w-8 h-8 border border-gray-300 rounded-sm flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="w-8 h-8 border border-gray-300 rounded-sm flex items-center justify-center">
                    <Share2 className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
            <textarea
              className="mt-1 mx-1 p-2 bg-gray-50 rounded-sm text-gray-400 text-xs resize-none"
              spellCheck={false}
            >
              Patienteninfo
            </textarea>
            <PatientInfoSection title="Kontaktinfos" showDivider>
              <div className="text-xs text-gray-700">
                Langehorner Chausse, 22397 Hamburg
              </div>
              <div className="text-xs text-gray-700">0176 45123123123</div>
              <div className="text-xs text-gray-700">krogharro@gmail.com</div>
            </PatientInfoSection>

            <PatientInfoSection
              title="Naechster Termin"
              showDivider
              indent={false}
            >
              <textarea
                className=" p-2 bg-white w-full border rounded-sm text-gray-400 text-xs resize-none"
                spellCheck={false}
              >
                Kein Termin vorhanden
              </textarea>
            </PatientInfoSection>

            <PatientInfoSection title="Kasse" showDivider>
              <div className="text-xs text-gray-700">
                Techniker Krankenkasse
              </div>
            </PatientInfoSection>

            <PatientInfoSection title="Hausarzt" showDivider>
              <div className="flex flex-col gap-1">
                <div className="flex flex-row items-center gap-2">
                  <span className="text-xs font-medium text-gray-600 w-16">
                    Namen
                  </span>
                  <div className="flex items-center gap-1 border border-gray-200 rounded px-2 py-1 h-6">
                    <Search className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-700">
                      Washausen, Dr.Anna
                    </span>
                    <div className="w-3 h-3 bg-gray-400 rounded-full flex items-center justify-center cursor-pointer ml-1">
                      <X className="w-2 h-2 text-white" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row">
                  <span className="text-xs font-medium text-gray-600 w-16">
                    Strasse
                  </span>
                  <span className="text-xs text-gray-700">12345 Hamburg</span>
                </div>
                <div className="flex flex-row">
                  <span className="text-xs font-medium text-gray-600 w-16">
                    PLZ, Ort
                  </span>
                  <span className="text-xs text-gray-700">067123, Altona</span>
                </div>
                <div className="flex flex-row">
                  <span className="text-xs font-medium text-gray-600 w-16">
                    Tel, Fax
                  </span>
                  <div className="flex flex-row items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-700">040 1234567</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Printer className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-700">040 7654321</span>
                    </div>
                  </div>
                </div>
              </div>
            </PatientInfoSection>

            <PatientInfoSection
              title="Besuch 21.04.2019"
              showDivider
              indent={false}
            >
              <textarea
                className="mt-1 mr-2 p-2 w-full  bg-gray-50 rounded-sm text-gray-400 text-xs resize-none"
                spellCheck={false}
              >
                Besuchinfos
              </textarea>
              <div className="ml-4">
                <div className="text-xs font-medium text-gray-600">Termin:</div>
                <div className="flex flex-row gap-2">
                  <span className="text-xs font-medium text-gray-600">
                    Status
                  </span>
                  <span className="text-xs text-gray-700">Anwesend</span>
                </div>
                <div className="flex flex-row gap-2">
                  <span className="text-xs font-medium text-gray-600">
                    Rauwatt
                  </span>
                  <span className="text-xs text-gray-700">WZ</span>
                </div>
                <div className="flex flex-row gap-2">
                  <span className="text-xs font-medium text-gray-600">
                    Behandlung
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium text-white bg-red-500 leading-none">
                    SZ
                  </span>
                </div>
              </div>
            </PatientInfoSection>
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
