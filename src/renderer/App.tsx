/* eslint-disable react/jsx-no-comment-textnodes */
import './App.css';
import { useState } from 'react';
import AppBar from './AppBar';
import { getPatientRecords } from './repository/get_grouped_records';
import { getPatients } from './api/getPatients';
import { Patient } from './models/Patient';
import BesucherCard from './Widgets/BesucherCard';
import PatientInfos from './components/PatientInfos';
import PatientData from './components/PatientData';
import WindowWithHeader from './Templates/WindowWithHeader';

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
        <WindowWithHeader
          title="Besucherliste"
          className="w-[300px] h-full flex-shrink-0"
          contentClassName="flex-1 w-full bg-white rounded-sm mt-2 overflow-y-auto scrollbar-hide border-t border-r border-b"
        >
          {patients.map((patient) => (
            <BesucherCard
              key={patient.id}
              name={patient.name}
              date={patient.lastVisit.toLocaleDateString('de-DE')}
              isSelected={selectedPatient?.id === patient.id}
              onClick={() => setSelectedPatient(patient)}
            />
          ))}
        </WindowWithHeader>

        {/* Patient Infos */}
        <WindowWithHeader title="Patienteninfos">
          <PatientInfos selectedPatient={selectedPatient} />
        </WindowWithHeader>

        {/* Patient Dokumente */}
        <WindowWithHeader
          title="Patientendokumente"
          className="flex-[3]"
          contentClassName="bg-white h-full border border-gray-300 mt-2"
        >
          <PatientData groupedRecords={groupedRecords} />
        </WindowWithHeader>
      </div>
    </div>
  );
}

export default App;
