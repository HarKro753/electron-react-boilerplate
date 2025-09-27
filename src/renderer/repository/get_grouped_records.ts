import { Patient } from '../models/Patient';

interface PatientRecord {
  datum: Date;
  typ: string;
  eintrag: string;
}

function formatBefundType(type: number): string {
  return type === 0 ? 'Laborwerte' : 'Röntgenbild';
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

export function getPatientRecords(patient: Patient | null): Record<string, PatientRecord[]> {
  if (!patient) {
    return {};
  }

  const allRecords = [
    ...patient.Diagnosen.map((d) => ({
      datum: d.datum,
      typ: 'ANA',
      eintrag: `${d.diagnose} - ${d.beschreibung} (${d.arzt})`,
    })),
    ...patient.Befunde.map((b) => ({
      datum: b.Datum,
      typ: 'BEF',
      eintrag: formatBefundType(b.Typ),
    })),
    ...patient.Medikationen.map((m) => ({
      datum: m.startDatum,
      typ: 'MED',
      eintrag: `${m.medikament} - ${m.dosierung} (${m.arzt})`,
    })),
    ...patient.Impfungen.map((i) => ({
      datum: i.datum,
      typ: 'IMP',
      eintrag: `${i.impfung} - ${i.hersteller}`,
    })),
  ].sort((a, b) => b.datum.getTime() - a.datum.getTime());

  const groupedRecords = allRecords.reduce(
    (groups, record) => {
      const dateKey = formatDate(record.datum);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(record);
      return groups;
    },
    {} as Record<string, PatientRecord[]>,
  );

  return groupedRecords;
}

export function getAllRecords(): Record<string, PatientRecord[]> {
  return {};
}
