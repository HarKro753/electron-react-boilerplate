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
import PatientToolbar from './components/PatientToolbar';
import ChatWindow from './components/ChatWindow';

function App() {
  const patients = getPatients();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(
    patients[0],
  );
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(false);
  const groupedRecords = getPatientRecords(selectedPatient);

  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col overflow-hidden">
      <AppBar />

      <div className="flex flex-row h-full w-full overflow-hidden">
        <WindowWithHeader
          className="w-[300px] h-full flex-shrink-0"
          contentClassName="flex-1 w-full bg-white rounded-sm overflow-y-auto scrollbar-hide border-t border-r border-b"
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
        <WindowWithHeader className="mx-2 mt-1">
          <PatientInfos selectedPatient={selectedPatient} />
        </WindowWithHeader>

        {/* Patient Dokumente */}
        <WindowWithHeader className="flex-[3]" contentClassName="">
          <div className="flex flex-col">
            <PatientToolbar
              isChatWindowOpen={isChatWindowOpen}
              onToggleChatWindow={() => setIsChatWindowOpen(!isChatWindowOpen)}
            />
            <PatientData groupedRecords={groupedRecords} />
          </div>
        </WindowWithHeader>

        {isChatWindowOpen && (
          <div className="flex w-[600px] bg-white border-l">
            <ChatWindow onClose={() => setIsChatWindowOpen(false)} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
