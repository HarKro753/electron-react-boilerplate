import { Patient } from '../models/Patient';

const mockPatientsData = [
  {
    id: 1,
    name: 'Anna Mueller',
    birthDate: new Date('1980-12-12'),
    lastVisit: new Date('2024-03-15'),
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
  },
  {
    id: 2,
    name: 'Max Mustermann',
    birthDate: new Date('1975-05-20'),
    lastVisit: new Date('2024-03-10'),
    Diagnosen: [
      {
        datum: new Date('2024-03-10'),
        diagnose: 'I10',
        beschreibung: 'Hypertonie',
        arzt: 'Dr. Weber',
      },
      {
        datum: new Date('2024-01-15'),
        diagnose: 'E11.9',
        beschreibung: 'Diabetes mellitus Typ 2',
        arzt: 'Dr. Weber',
      },
    ],
    Befunde: [
      {
        Datum: new Date('2024-03-08'),
        Typ: 2,
      },
      {
        Datum: new Date('2024-01-10'),
        Typ: 0,
      },
    ],
    Medikationen: [
      {
        startDatum: new Date('2024-03-10'),
        medikament: 'Ramipril',
        dosierung: '5mg täglich',
        arzt: 'Dr. Weber',
      },
      {
        startDatum: new Date('2024-01-15'),
        medikament: 'Metformin',
        dosierung: '1000mg 2x täglich',
        arzt: 'Dr. Weber',
      },
    ],
    Impfungen: [
      {
        datum: new Date('2024-02-01'),
        impfung: 'COVID-19',
        hersteller: 'Moderna',
      },
      {
        datum: new Date('2023-10-15'),
        impfung: 'Influenza',
        hersteller: 'GSK',
      },
    ],
  },
  {
    id: 3,
    name: 'Petra Schmidt',
    birthDate: new Date('1992-08-03'),
    lastVisit: new Date('2024-02-25'),
    Diagnosen: [
      {
        datum: new Date('2024-02-25'),
        diagnose: 'J06.9',
        beschreibung: 'Akute Infektion der oberen Atemwege',
        arzt: 'Dr. Klein',
      },
    ],
    Befunde: [
      {
        Datum: new Date('2024-02-23'),
        Typ: 1,
      },
    ],
    Medikationen: [
      {
        startDatum: new Date('2024-02-25'),
        medikament: 'Amoxicillin',
        dosierung: '750mg 3x täglich',
        arzt: 'Dr. Klein',
      },
    ],
    Impfungen: [
      {
        datum: new Date('2023-12-15'),
        impfung: 'COVID-19',
        hersteller: 'BioNTech',
      },
      {
        datum: new Date('2023-11-10'),
        impfung: 'Influenza',
        hersteller: 'Sanofi',
      },
    ],
  },
];

export function getPatients(): Patient[] {
  return mockPatientsData;
}
